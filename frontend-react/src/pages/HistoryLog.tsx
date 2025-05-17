import { useQuery } from '@tanstack/react-query';
import { fetchHistory } from '../api/client';

export default function HistoryLog() {
  const { data, isLoading } = useQuery({ queryKey: ['history'], queryFn: fetchHistory });

  if (isLoading) return <p>Loading…</p>;

  return (
    <>
      <h2>Past simulations</h2>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>
            {new Date(item.createdAt).toLocaleString()} – score {item.score.toFixed(2)}
          </li>
        ))}
      </ul>
    </>
  );
}
