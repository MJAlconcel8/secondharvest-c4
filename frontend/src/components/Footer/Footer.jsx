import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <h3>YouthEnlightened</h3>
          <p>Build a Thriving World.</p>
        </div>
        <div className="footer__links">
          <Link to="/home">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/aboutus">About Us</Link>
        </div>
      </div>
      <div className="footer__meta">{year} YouthEnlightened. All rights reserved.</div>
    </footer>
  )
}

export default Footer
