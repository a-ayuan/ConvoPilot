import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useDraftStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

export default function DraftInput() {
  const [text, setText] = useState('');
  const setDraft = useDraftStore(s => s.setDraft);
  const navigate = useNavigate();

  const handleSimulate = () => {
    setDraft(text);
    navigate('/dashboard');
  };

  return (
    <>
      <h2>Draft your outreach message</h2>
      <Editor
        height="60vh"
        language="markdown"
        theme="vs-dark"
        value={text}
        onChange={v => setText(v ?? '')}
      />
      <button onClick={handleSimulate} className="btn primary">
        Simulate
      </button>
    </>
  );
}
