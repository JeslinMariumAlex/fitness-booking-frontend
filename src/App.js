import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FitnessClasses from "./components/FitnessClasses";
import ViewBookings from "./components/ViewBookings";
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">Fitness Studio</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Classes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/bookings" className="nav-link">My Bookings</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div className="container mt-4 mb-5 flex-grow-1">

          <Routes>
            <Route path="/" element={<FitnessClasses />} />
            <Route path="/bookings" element={<ViewBookings />} />
          </Routes>
        </div>

        {/* Footer directly here */}
        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <div className="container">
            <small>&copy; {new Date().getFullYear()} Fitness Studio. All rights reserved.</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
