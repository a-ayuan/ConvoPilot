import { useState } from 'react';
import '../styles/DraftInput.css';

interface SimulateRequestBody {
  user_context: string;
  message_type: string;
  past_messages: string;
  goal: string;
  user_input: string;
}

export default function DraftInput() {
  const [userContext, setUserContext] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');
  const [pastMessages, setPastMessages] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');

  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSimulate = async () => {
    setError('');
    setOutput(null);

    // Validation for required fields
    if (!userContext.trim() || !goal.trim()) {
      setError('User Context and Goal are required fields.');
      return;
    }

    setLoading(true);

    const payload: SimulateRequestBody = {
      user_context: userContext,
      message_type: messageType.trim() ? messageType : 'None',
      past_messages: pastMessages.trim() ? pastMessages : 'None',
      goal: goal,
      user_input: userInput.trim() ? userInput : 'None',
    };

    try {
      const response = await fetch('http://localhost:8080/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error: ${errorText}`);
      }

      const text = await response.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { message: text };
      }
      setOutput(parsed);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper to render output nicely
  const renderOutput = () => {
    if (!output) return null;
    if (typeof output === 'string') {
      return <pre>{output}</pre>;
    }
    // If output is an object, display keys/values
    return (
      <div>
        {Object.entries(output).map(([key, value]) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <strong>{key}:</strong>
            <div style={{ marginLeft: 10, whiteSpace: 'pre-wrap' }}>
              {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="draft-container">
      <h2 className="draft-title">Draft your outreach message</h2>

      <div className="draft-form">
        <label className="draft-label">
          User Context: <span style={{ color: '#ff4d4f' }}>*</span>
          <textarea
            className="draft-textarea"
            value={userContext}
            onChange={(e) => setUserContext(e.target.value)}
            rows={3}
            placeholder="Describe the user context..."
            required
          />
        </label>

        <label className="draft-label">
          Message Type:
          <input
            type="text"
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            className="draft-input message-type"
            placeholder="email, direct message, etc."
          />
        </label>

        <label className="draft-label">
          Past Messages:
          <textarea
            className="draft-textarea past-messages"
            value={pastMessages}
            onChange={(e) => setPastMessages(e.target.value)}
            rows={8}
            placeholder="Paste any relevant past messages here..."
          />
        </label>

        <label className="draft-label">
          Goal: <span style={{ color: '#ff4d4f' }}>*</span>
          <textarea
            className="draft-textarea"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={2}
            placeholder="What is your goal for this message?"
            required
          />
        </label>

        <label className="draft-label">
          User Input:
          <textarea
            className="draft-textarea user-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={5}
            placeholder="Write your draft message here..."
          />
        </label>
      </div>

      <button
        onClick={handleSimulate}
        className="draft-btn"
        disabled={loading}
      >
        {loading ? 'Simulating...' : 'Simulate'}
      </button>

      {error && <p className="draft-error">Error: {error}</p>}

      {output && (
        <div className="draft-output">
          <div className="draft-output-title">Convopilot's Suggested Message:</div>
          {renderOutput()}
        </div>
      )}
    </div>
  );
}
