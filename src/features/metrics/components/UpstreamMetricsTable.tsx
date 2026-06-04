interface Props {
  data: Record<string, unknown>;
}

const renderValue = (value: unknown): string => {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

export const UpstreamMetricsTable = ({ data }: Props) => {
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return <p className="text-muted">No upstream metrics data.</p>;
  }

  return (
    <div>
      <h5 className="mb-3">Upstream Metrics</h5>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td>{renderValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
