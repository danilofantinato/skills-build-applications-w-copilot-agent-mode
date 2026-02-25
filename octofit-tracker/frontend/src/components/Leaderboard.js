import { useEffect, useMemo, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const codespaceEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? codespaceEndpoint
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Leaderboard fetched data:', payload);
        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : [];
        setEntries(normalized);
      } catch (error) {
        console.error('Leaderboard fetch error:', error);
      }
    };

    loadLeaderboard();
  }, [endpoint]);

  const filteredEntries = useMemo(
    () => entries.filter((entry) =>
      [entry.user_email, String(entry.score ?? '')]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())),
    [entries, search],
  );

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Leaderboard</h2>
          <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
            Open API
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              placeholder="Search leaderboard"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-grid">
            <button className="btn btn-primary" type="button" onClick={() => setSearch('')}>
              Clear Filter
            </button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>User Email</th>
                <th>Score</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <tr key={entry.id || entry._id || index}>
                  <td>{entry.user_email || '-'}</td>
                  <td>{entry.score ?? '-'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setSelectedEntry(entry)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEntry && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Leaderboard Entry</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedEntry(null)} aria-label="Close" />
                </div>
                <div className="modal-body"><pre className="mb-0">{JSON.stringify(selectedEntry, null, 2)}</pre></div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedEntry(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}
    </section>
  );
}

export default Leaderboard;
