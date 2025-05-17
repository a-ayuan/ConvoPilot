import { useQuery } from '@tanstack/react-query';
import { evaluateDraft } from '../api/client';
import { useDraftStore } from '../store/appStore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { draft, goal } = useDraftStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['simulate', draft, goal],
    queryFn: () => evaluateDraft(draft, goal),
    enabled: !!draft && !!goal
  });

  if (!draft || !goal) return <p>Please fill draft and goal first.</p>;
  if (isLoading) return <p>Running simulation…</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      <h2>Simulation Results</h2>
      <p>Best score: {data.score.toFixed(2)}</p>
      <h3>Visits vs Score</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.stats}>
          <XAxis dataKey="visit" />
          <YAxis />
          <Tooltip />
          <Line dataKey="score" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <h3>Suggested reply</h3>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{data.bestMessage}</pre>
    </>
  );
}
