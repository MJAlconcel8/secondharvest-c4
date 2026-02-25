import React from 'react'
import { NavLink } from 'react-router-dom'
import youthLogo from '../../assets/YouthEnlightened.svg'
import secondHarvestLogo from '../../assets/second-harvest-logo.png'
import forestBackground from '../../assets/forest-background.jpeg'
import './Landing.scss'

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__hero">
        <img
          className="landing__bg"
          src={forestBackground}
          alt="Forest background"
        />
        <div className="landing__overlay" />
        <div className="landing__content">
          <div className="landing__brand">
            <img className="landing__logo" src={youthLogo} alt="YouthEnlightened logo" />
            <p className="landing__slogan">Build a Thriving World.</p>
          </div>
          <h1>Growing environmental leaders who act on food insecurity.</h1>
          <p>
            YouthEnlightened is a community-driven hub for youth-led events, education, and
            advocacy. Inspired by Second Harvest Canada, we turn environmental care into action.
          </p>
          <div className="landing__cta">
            <NavLink to="/auth?mode=register" className="landing__btn landing__btn--primary">
              Join the community
            </NavLink>
            <NavLink to="/auth" className="landing__btn landing__btn--ghost">
              Log in
            </NavLink>
          </div>
          <div className="landing__partner">
            <span>Inspired by</span>
            <img
              className="landing__partner-logo"
              src={secondHarvestLogo}
              alt="Second Harvest Canada logo"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
