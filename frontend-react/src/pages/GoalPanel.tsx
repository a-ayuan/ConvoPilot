import { useState } from 'react';
import { useDraftStore } from '../store/appStore';

export default function GoalPanel() {
  const [goal, setLocal] = useState('');
  const setGoal = useDraftStore(s => s.setGoal);

  return (
    <>
      <h2>Define your goal</h2>
      <textarea
        rows={6}
        value={goal}
        onChange={e => setLocal(e.target.value)}
        onBlur={() => setGoal(goal)}
        style={{ width: '100%' }}
      />
    </>
  );
}
