import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
    const [userContext, setUserContext] = useState('');
    const [messageType, setMessageType] = useState('');
    const [pastMessages, setPastMessages] = useState('');
    const [goal, setGoal] = useState('');
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await axios.post('/simulate', {
                user_context: userContext,
                message_type: messageType,
                past_messages: pastMessages,
                goal: goal,
                user_input: userInput,
            });
            setResponse(result.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponse('Error: ' + (error.response?.data || error.message));
            } else if (error instanceof Error) {
                setResponse('Error: ' + error.message);
            } else {
                setResponse('An unknown error occurred.');
            }
        }
    };

    return (
        <div className="App">
            <h1>Message Simulator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="User Context"
                    value={userContext}
                    onChange={(e) => setUserContext(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Message Type"
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Past Messages"
                    value={pastMessages}
                    onChange={(e) => setPastMessages(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="User Input"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button type="submit">Simulate</button>
            </form>
            {response && <div className="response">{response}</div>}
        </div>
    );
};

export default App;