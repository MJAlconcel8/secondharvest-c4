import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <h1>Welcome to Second Harvest!</h1>
      <p>This is the home page. You are logged in.</p>
    </div>
  );
};

export default Home;
