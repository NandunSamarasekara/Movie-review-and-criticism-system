import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MovieDetail from './components/MovieDetail';
import UserProfile from './components/UserProfile';
import AllMovies from './components/AllMovies';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link className="navbar-brand" to="/">Movie Explorer</Link>
              <div className="navbar-nav">
                <Link className="nav-link" to="/">Home</Link>
                {userId ? (
                    <>
                      <Link className="nav-link" to="/profile">Profile</Link>
                      <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                      <Link className="nav-link" to="/login">Login</Link>
                      <Link className="nav-link" to="/register">Register</Link>
                    </>
                )}
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/all-movies" element={<AllMovies />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;