import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/DraftInput.css';
import { API_URL } from '../config/config';

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
      message_type: messageType.trim() ? messageType : 'Cold email',
      past_messages: pastMessages.trim() ? pastMessages : 'No past messages',
      goal: goal,
      user_input: userInput.trim() ? userInput : 'None',
    };

    try {
      const response = await fetch(`${API_URL}/optimize`, {
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

  const ScoreDetails = ({ message, scoreDetails }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="score-details">
      <div>
        <strong>Message:</strong>
        <div className="score-message">{message}</div>
        <button
          onClick={() => setOpen(!open)}
          className="score-btn"
        >
          Final Score: {scoreDetails.value.toFixed(2)} {open ? '▲' : '▼'}
        </button>
        {open && (
          <div className="score-breakdown">
            <div>Score: {scoreDetails.final_score.toFixed(3)}</div>
            <div>Polarity: {scoreDetails.polarity.toFixed(3)}</div>
            <div>Subjectivity: {scoreDetails.subjectivity.toFixed(3)}</div>
            <div>Visits: {scoreDetails.visits}</div>
          </div>
        )}
      </div>
      <hr className="score-divider" />
    </div>
  );
};

const renderOutput = (output: any) => {
  if (!output || !output.suggestions) return null;

  return (
    <div>
      {output.suggestions.map((s: any, i: number) => (
        <ScoreDetails key={i} message={s.message} scoreDetails={s} />
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
            placeholder="Cold email, direct message, email thread, etc."
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
            placeholder="What is your goal for this message or conversation?"
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
        {loading ? (
          <>
            <LoadingSpinner size="sm" text="" />
            <span>Generating... (This may take 1-2 minutes)</span>
          </>
        ) : (
          'Generate'
        )}
      </button>

      {error && <p className="draft-error">Error: {error}</p>}

      {output && (
        <div className="draft-output">
          <div className="draft-output-title">Convopilot's Suggested Messages:</div>
          {renderOutput(output)}
        </div>
      )}
    </div>
  );
}
