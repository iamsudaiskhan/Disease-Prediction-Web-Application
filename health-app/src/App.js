// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppNavbar from './Navbar';
import AppFooter from './Footer';
import Home from './Home';
import SymptomSelector from './SymptomSelector';
import History from './History';
import Login from './Login';
import Signup from './Signup';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') ? true : false);

  // Watch for login state changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('user') ? true : false);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <AppNavbar isLoggedIn={isLoggedIn} />

        <main className="container mt-4 mb-5 flex-grow-1">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/predict" element={isLoggedIn ? <SymptomSelector /> : <Navigate to="/login" />} />
            <Route path="/history" element={isLoggedIn ? <History /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
