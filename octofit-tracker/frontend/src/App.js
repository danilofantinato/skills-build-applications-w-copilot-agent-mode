import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell">
      <div className="container py-4">
        <div className="card shadow-sm mb-4">
          <div className="card-body py-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src="/octofitapp-small.png"
                alt="OctoFit logo"
                className="app-logo"
              />
              <h1 className="h2 mb-0 app-title">OctoFit Tracker</h1>
            </div>
            <a
              className="btn btn-outline-primary app-docs-link"
              href="https://react.dev"
              target="_blank"
              rel="noreferrer"
            >
              React Docs
            </a>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg bg-white border rounded shadow-sm mb-4 px-3">
          <ul className="navbar-nav flex-wrap gap-2">
            <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/teams">Teams</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/activities">Activities</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/workouts">Workouts</NavLink></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
