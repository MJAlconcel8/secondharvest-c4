import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthScreen from './pages/AuthScreen/AuthScreen';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;