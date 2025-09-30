import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHistory } from '../api/client';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/HistoryLog.css';

function ScoreDetails({ message, scoreDetails }: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="history-score-details">
      <div>
        <strong>Message:</strong>
        <div className="history-message">{message}</div>
        <button
          onClick={() => setOpen(!open)}
          className="history-score-btn"
        >
          Final Score: {scoreDetails.value?.toFixed(2) ?? '-'} ▼
        </button>
        {open && (
          <div className="history-score-breakdown">
            <div>Score: {scoreDetails.final_score?.toFixed(3) ?? '-'}</div>
            <div>Polarity: {scoreDetails.polarity?.toFixed(3) ?? '-'}</div>
            <div>Subjectivity: {scoreDetails.subjectivity?.toFixed(3) ?? '-'}</div>
            <div>Visits: {scoreDetails.visits ?? '-'}</div>
          </div>
        )}
      </div>
      <hr className="history-divider" />
    </div>
  );
}

function ConversationBlock({ conversation }: any) {
  return (
    <div className="history-convo-block">
      <div className="history-meta">
        <span>
          <b>Date:</b> {conversation.createdAt ? new Date(conversation.createdAt).toLocaleString() : 'Unknown'}
        </span>
        <span>
          <b>Goal:</b> {conversation.goal}
        </span>
        <span>
          <b>User Context:</b> {conversation.userContext}
        </span>
        <span>
          <b>Message Type:</b> {conversation.messageType}
        </span>
        <span>
          <b>Past Messages:</b> {conversation.pastMessages}
        </span>
        <span>
          <b>User Input:</b> {conversation.userInput}
        </span>
      </div>
      <div className="history-suggestions">
        {conversation.messages && conversation.messages.length > 0 ? (
          conversation.messages.map((msg: any, i: number) => (
            <ScoreDetails key={i} message={msg.optimizedMessage} scoreDetails={msg.scoreDetails} />
          ))
        ) : (
          <div className="history-no-suggestions">No suggestions found.</div>
        )}
      </div>
    </div>
  );
}

export default function HistoryLog() {
  const { data, isLoading, error } = useQuery({ queryKey: ['history'], queryFn: fetchHistory });

  if (isLoading) return (
    <div className="history-container">
      <h2 className="history-title">Past simulations</h2>
      <LoadingSpinner size="lg" text="Loading your conversation history..." />
    </div>
  );
  
  if (error) return (
    <div className="history-container">
      <h2 className="history-title">Past simulations</h2>
      <div className="history-error">Error loading history. Please try again later.</div>
    </div>
  );

  return (
    <div className="history-container">
      <h2 className="history-title">Past simulations</h2>
      {data && data.length > 0 ? (
        data.map((conversation: any) => (
          <ConversationBlock key={conversation.id} conversation={conversation} />
        ))
      ) : (
        <div className="history-no-suggestions">No conversation history found. Start by creating your first message draft!</div>
      )}
    </div>
  );
}
