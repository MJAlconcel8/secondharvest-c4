
import React, { useState } from 'react';
import './Navbar.scss';
import { NavLink, } from 'react-router-dom';
import logo from '../../assets/YouthEnlightened.svg';
import logoutIcon from '../../assets/logout.png';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleClose = () => setNavOpen(false);
  const handleToggle = () => setNavOpen((open) => !open);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img src={logo} alt="Second Harvest Logo" className="navbar__logo" />
        <div className="navbar__brand"></div>
      </div>
      {/* Hamburger menu toggle for mobile */}
      <div className="navbar__mobile-toggle">
        {/* Hamburger icon: simple SVG */}
        <button
          className="navbar__toggle-icon"
          aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={handleToggle}
        >
          {navOpen ? (
            // Close icon (X)
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18" stroke="#244a2f" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 18L18 6" stroke="#244a2f" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            // Hamburger icon
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="16" height="2" rx="1" fill="#244a2f" />
              <rect x="4" y="11" width="16" height="2" rx="1" fill="#244a2f" />
              <rect x="4" y="16" width="16" height="2" rx="1" fill="#244a2f" />
            </svg>
          )}
        </button>
      </div>
      <div className={`navbar__center ${navOpen ? 'navbar__center--open' : ''}`}> 
        <NavLink to="/home" end className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`} onClick={handleClose}>Home</NavLink>
        <NavLink to="/secondharvest" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`} onClick={handleClose}>Second Harvest</NavLink>
        <NavLink to="/aboutus" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`} onClick={handleClose}>About Us</NavLink>
        <NavLink to="/meettheteam" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`} onClick={handleClose}>Meet the Team</NavLink>
        <NavLink to="/events" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`} onClick={handleClose}>Events</NavLink>
        <NavLink to="/calendar" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`} onClick={handleClose}>Calendar</NavLink>
      </div>
      <div className="navbar__right">
        <NavLink to="/" className="navbar__logout" onClick={handleClose} title="Log Out">
          <img src={logoutIcon} alt="Log Out" className="navbar__logout-icon" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;