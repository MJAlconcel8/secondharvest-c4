import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import EventCard from '../../components/EventCard/EventCard'
import { eventService } from '../../services/eventService'
import heroImage from '../../assets/SecondHarvest1.jpeg'
import fallbackEventImage from '../../assets/volunteering.jpg'
import './Home.scss'

const Home = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const data = await eventService.getEvents()
        setEvents(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Error fetching events:', err)
        setError('Unable to load events right now.')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const now = useMemo(() => new Date(), [])
  const monthLabel = now.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  const eventsThisMonth = useMemo(() => {
    const month = now.getMonth()
    const year = now.getFullYear()
    return events
      .filter((event) => {
        const parsed = new Date(event.eventDate)
        if (Number.isNaN(parsed.getTime())) {
          return false
        }
        return parsed.getMonth() === month && parsed.getFullYear() === year
      })
      .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
      .slice(0, 6)
  }, [events, now])

  const awarenessLinks = [
    {
      title: 'Understand food insecurity in the US',
      description: 'USDA data, definitions, and annual reports.',
      url: 'https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-u-s/'
    },
    {
      title: 'Feeding America research & resources',
      description: 'National stats, map the meal gap, and toolkits.',
      url: 'https://www.feedingamerica.org/research'
    },
    {
      title: 'World Food Programme: hunger updates',
      description: 'Global hunger facts and advocacy stories.',
      url: 'https://www.wfp.org/stories'
    }
  ]

  const spreadLinks = [
    {
      title: 'Share Our Strength action center',
      description: 'Ways to advocate and share policy updates.',
      url: 'https://www.nokidhungry.org/action-center'
    },
    {
      title: 'Hunger Free America take action',
      description: 'Community campaigns and awareness guides.',
      url: 'https://www.hungerfreeamerica.org/take-action'
    },
    {
      title: 'WhyHunger partner toolkit',
      description: 'Templates to spark community conversations.',
      url: 'https://whyhunger.org/take-action/'
    }
  ]

  return (
    <div className="home-page">
      <Navbar />
      <main className="home-main">
        <section className="home-hero">
          <div className="hero-content">
            <span className="hero-eyebrow">Central Hub</span>
            <h1>Welcome to YouthEnlightened</h1>
            <p className="hero-lead">
              A warm, focused space to find events, plan your time, and grow awareness about
              food insecurity together. Inspired by Second Harvest Canada, our group is
              committed to turning awareness into action. Build a Thriving World.
            </p>
            <div className="hero-actions">
              <NavLink to="/events" className="hero-btn hero-btn--primary">
                Browse events
              </NavLink>
              <NavLink to="/calendar" className="hero-btn hero-btn--ghost">
                View calendar
              </NavLink>
            </div>
            <div className="hero-metrics">
              <div className="metric-card">
                <span className="metric-title">This month</span>
                <span className="metric-value">{eventsThisMonth.length} events</span>
              </div>
              <div className="metric-card">
                <span className="metric-title">Volunteer first</span>
                <span className="metric-value">Serve locally</span>
              </div>
              <div className="metric-card">
                <span className="metric-title">Share knowledge</span>
                <span className="metric-value">Build awareness</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img src={heroImage} alt="Volunteers preparing meals" />
            <div className="hero-badge">
              <span>Neighbors helping neighbors</span>
              <strong>Every week</strong>
            </div>
          </div>
        </section>

        <section className="home-section hub">
          <header className="section-header">
            <h2>Your hub for everything</h2>
            <p>Jump right into the places you visit most.</p>
          </header>
          <div className="hub-grid">
            <NavLink to="/events" className="hub-card">
              <h3>Events</h3>
              <p>Sign up, RSVP, and see what is happening next.</p>
              <span className="hub-link">Explore events</span>
            </NavLink>
            <NavLink to="/calendar" className="hub-card">
              <h3>Calendar</h3>
              <p>Plan your month and sync volunteer hours.</p>
              <span className="hub-link">Open calendar</span>
            </NavLink>
            <NavLink to="/aboutus" className="hub-card">
              <h3>About us</h3>
              <p>Learn how YouthEnlightened supports local families.</p>
              <span className="hub-link">Our mission</span>
            </NavLink>
            <NavLink to="/meettheteam" className="hub-card">
              <h3>Meet the team</h3>
              <p>Put faces to the people organizing every event.</p>
              <span className="hub-link">Say hello</span>
            </NavLink>
          </div>
        </section>

        <section className="home-section events">
          <header className="section-header">
            <div>
              <h2>Events this month</h2>
              <p>Highlights for {monthLabel}.</p>
            </div>
            <button className="section-cta" type="button" onClick={() => navigate('/events')}>
              See all events
            </button>
          </header>
          {loading && <p className="status-text">Loading events...</p>}
          {!loading && error && <p className="status-text status-text--error">{error}</p>}
          {!loading && !error && eventsThisMonth.length === 0 && (
            <div className="empty-state">
              <p>No events are scheduled for this month yet.</p>
              <button className="section-cta" type="button" onClick={() => navigate('/events')}>
                Create or browse events
              </button>
            </div>
          )}
          {!loading && !error && eventsThisMonth.length > 0 && (
            <div className="home-events-grid">
              {eventsThisMonth.map((event) => (
                <EventCard
                  key={event.id}
                  eventName={event.eventName}
                  eventType={event.eventType}
                  description={event.description}
                  hostName={event.hostName}
                  eventDate={event.eventDate}
                  eventImage={event.eventImage || fallbackEventImage}
                  onClick={() => navigate('/events')}
                />
              ))}
            </div>
          )}
        </section>

        <section className="home-section learn">
          <header className="section-header">
            <h2>Learn and share awareness</h2>
            <p>Keep learning, then spread the word with your community.</p>
          </header>
          <div className="link-grid">
            <div className="link-column">
              <h3>Learn about food insecurity</h3>
              <ul>
                {awarenessLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      <span>{link.title}</span>
                      <em>{link.description}</em>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="link-column">
              <h3>Spread awareness</h3>
              <ul>
                {spreadLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      <span>{link.title}</span>
                      <em>{link.description}</em>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
