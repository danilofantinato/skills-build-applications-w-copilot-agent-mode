import { useEffect, useMemo, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const codespaceEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? codespaceEndpoint
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users endpoint:', endpoint);

    const loadUsers = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Users fetched data:', payload);
        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : [];
        setUsers(normalized);
      } catch (error) {
        console.error('Users fetch error:', error);
      }
    };

    loadUsers();
  }, [endpoint]);

  const filteredUsers = useMemo(
    () => users.filter((user) =>
      [user.name, user.email, user.team]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())),
    [users, search],
  );

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Users</h2>
          <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
            Open API
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              placeholder="Search users"
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
                <th>Email</th>
                <th>Team</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id || user._id || index}>
                  <td>{user.name || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.team || '-'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setSelectedUser(user)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Details</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedUser(null)} aria-label="Close" />
                </div>
                <div className="modal-body"><pre className="mb-0">{JSON.stringify(selectedUser, null, 2)}</pre></div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Close</button>
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

export default Users;
