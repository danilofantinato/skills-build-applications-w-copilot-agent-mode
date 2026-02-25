import { useEffect, useMemo, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);

  const codespaceEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? codespaceEndpoint
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams endpoint:', endpoint);

    const loadTeams = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Teams fetched data:', payload);
        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : [];
        setTeams(normalized);
      } catch (error) {
        console.error('Teams fetch error:', error);
      }
    };

    loadTeams();
  }, [endpoint]);

  const filteredTeams = useMemo(
    () => teams.filter((team) =>
      [team.name, Array.isArray(team.members) ? team.members.join(' ') : '']
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())),
    [teams, search],
  );

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Teams</h2>
          <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
            Open API
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              placeholder="Search teams"
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
                <th>Name</th>
                <th>Members</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team, index) => (
                <tr key={team.id || team._id || index}>
                  <td>{team.name || '-'}</td>
                  <td>{Array.isArray(team.members) ? team.members.join(', ') : '-'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setSelectedTeam(team)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTeam && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Team Details</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedTeam(null)} aria-label="Close" />
                </div>
                <div className="modal-body"><pre className="mb-0">{JSON.stringify(selectedTeam, null, 2)}</pre></div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedTeam(null)}>Close</button>
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

export default Teams;
