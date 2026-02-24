import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthScreen from './pages/AuthScreen/AuthScreen';
import Home from './pages/Home/Home';
import SecondHarvest from './components/SecondHarvest/SecondHarvest';
import AboutUs from './pages/AboutUs/AboutUs';
import MeetTheTeam from './pages/MeetTheTeam/MeetTheTeam';
import Events from './pages/Events/Events';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/secondharvest" element={<SecondHarvest />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/meettheteam" element={<MeetTheTeam />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;