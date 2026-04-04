import { TopPath } from '../types';

interface Props {
  data: TopPath[];
}

export const SlowestEndpointsTable = ({ data }: Props) => {
  const sorted = [...data].sort((a, b) => b.avg_duration_ms - a.avg_duration_ms).slice(0, 10);

  return (
    <div>
      <h5 className="mb-3">Slowest Endpoints (Top 10)</h5>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Path</th>
            <th>Avg Duration (ms)</th>
            <th>Request Count</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((endpoint, index) => (
            <tr key={index}>
              <td><code>{endpoint.path}</code></td>
              <td className={endpoint.avg_duration_ms > 1000 ? 'text-danger fw-bold' : ''}>
                {endpoint.avg_duration_ms.toFixed(2)}
              </td>
              <td>{endpoint.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};