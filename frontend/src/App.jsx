import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthScreen from './pages/AuthScreen/AuthScreen';
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import SecondHarvest from './components/SecondHarvest/SecondHarvest';
import AboutUs from './pages/AboutUs/AboutUs';
import MeetTheTeam from './pages/MeetTheTeam/MeetTheTeam';
import Events from './pages/Events/Events';
import Calendar from './pages/Calendar/Calendar';
import Footer from './components/Footer/Footer';

const AppLayout = () => {
  const location = useLocation()
  const hideFooter = location.pathname === '/' || location.pathname === '/auth'

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/secondharvest" element={<SecondHarvest />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/meettheteam" element={<MeetTheTeam />} />
        <Route path="/events" element={<Events />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App;