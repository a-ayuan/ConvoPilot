import React, { useState } from 'react';
import axios from 'axios';
import './MessageSimulator.css';

const MessageSimulator: React.FC = () => {
    const [userContext, setUserContext] = useState('');
    const [messageType, setMessageType] = useState('');
    const [pastMessages, setPastMessages] = useState('');
    const [goal, setGoal] = useState('');
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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
            setResponse('Error: ' + error.message);
        }
    };

    return (
        <div className="message-simulator-container">
            <h1>Message Simulator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Context:</label>
                    <input type="text" value={userContext} onChange={(e) => setUserContext(e.target.value)} />
                </div>
                <div>
                    <label>Message Type:</label>
                    <input type="text" value={messageType} onChange={(e) => setMessageType(e.target.value)} />
                </div>
                <div>
                    <label>Past Messages:</label>
                    <textarea value={pastMessages} onChange={(e) => setPastMessages(e.target.value)} />
                </div>
                <div>
                    <label>Goal:</label>
                    <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} />
                </div>
                <div>
                    <label>User Input:</label>
                    <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                </div>
                <button type="submit">Simulate</button>
            </form>
            {response && (
                <div className="response">
                    <h2>Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default MessageSimulator;