import { useEffect, useMemo, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const codespaceEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? codespaceEndpoint
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts endpoint:', endpoint);

    const loadWorkouts = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Workouts fetched data:', payload);
        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : [];
        setWorkouts(normalized);
      } catch (error) {
        console.error('Workouts fetch error:', error);
      }
    };

    loadWorkouts();
  }, [endpoint]);

  const filteredWorkouts = useMemo(
    () => workouts.filter((workout) =>
      [workout.name, workout.difficulty, workout.description]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())),
    [workouts, search],
  );

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Workouts</h2>
          <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
            Open API
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              placeholder="Search workouts"
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
                <th>Difficulty</th>
                <th>Description</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.map((workout, index) => (
                <tr key={workout.id || workout._id || index}>
                  <td>{workout.name || '-'}</td>
                  <td>{workout.difficulty || '-'}</td>
                  <td>{workout.description || '-'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setSelectedWorkout(workout)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedWorkout && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Workout Details</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedWorkout(null)} aria-label="Close" />
                </div>
                <div className="modal-body"><pre className="mb-0">{JSON.stringify(selectedWorkout, null, 2)}</pre></div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedWorkout(null)}>Close</button>
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

export default Workouts;
