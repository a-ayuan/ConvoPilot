import { useState } from 'react';
import Editor from '@monaco-editor/react';

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

  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSimulate = async () => {
    setLoading(true);
    setError('');
    setOutput('');

    const payload: SimulateRequestBody = {
      user_context: userContext,
      message_type: messageType,
      past_messages: pastMessages,
      goal: goal,
      user_input: userInput,
    };

    try {
      const response = await fetch('http://localhost:8080/simulate', {
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

      const result = await response.text();
      setOutput(result);
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

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Draft your outreach message</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          User Context:
          <input
            type="text"
            value={userContext}
            onChange={(e) => setUserContext(e.target.value)}
            className="input"
          />
        </label>

        <label>
          Message Type:
          <input
            type="text"
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            className="input"
          />
        </label>

        <label>
          Past Messages:
          <textarea
            value={pastMessages}
            onChange={(e) => setPastMessages(e.target.value)}
            className="input"
            rows={3}
          />
        </label>

        <label>
          Goal:
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="input"
          />
        </label>

        <label>
          User Input:
          <Editor
            height="200px"
            language="markdown"
            theme="vs-dark"
            value={userInput}
            onChange={(v) => setUserInput(v ?? '')}
          />
        </label>
      </div>

      <button onClick={handleSimulate} className="btn primary" disabled={loading} style={{ marginTop: '20px' }}>
        {loading ? 'Simulating...' : 'Simulate'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {output && (
        <div style={{ marginTop: '20px', background: '#1e1e1e', color: 'white', padding: '15px', borderRadius: '8px' }}>
          <h3>AI Suggested Message:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
