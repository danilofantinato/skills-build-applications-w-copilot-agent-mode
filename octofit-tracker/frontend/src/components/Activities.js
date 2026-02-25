import { useEffect, useMemo, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);

  const codespaceEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? codespaceEndpoint
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities endpoint:', endpoint);

    const loadActivities = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Activities fetched data:', payload);
        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : [];
        setActivities(normalized);
      } catch (error) {
        console.error('Activities fetch error:', error);
      }
    };

    loadActivities();
  }, [endpoint]);

  const filteredActivities = useMemo(
    () => activities.filter((activity) =>
      [activity.activity, activity.user_email, String(activity.duration || '')]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())),
    [activities, search],
  );

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Activities</h2>
          <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
            Open API
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              placeholder="Search activities"
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
                <th>Activity</th>
                <th>User Email</th>
                <th>Duration (min)</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity, index) => (
                <tr key={activity.id || activity._id || index}>
                  <td>{activity.activity || '-'}</td>
                  <td>{activity.user_email || '-'}</td>
                  <td>{activity.duration ?? '-'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setSelectedActivity(activity)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedActivity && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Activity Details</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedActivity(null)} aria-label="Close" />
                </div>
                <div className="modal-body"><pre className="mb-0">{JSON.stringify(selectedActivity, null, 2)}</pre></div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedActivity(null)}>Close</button>
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

export default Activities;
