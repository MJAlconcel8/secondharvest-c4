import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import EventCard from '../../components/EventCard/EventCard'
import './Events.scss'

const Events = () => {
  const events = [
    {
      id: 1,
      eventName: 'Food Drive',
      eventImage: 'https://images.unsplash.com/photo-1532996122724-8f3c2cd83c5d?w=500&h=500&fit=crop',
      description: 'Join us for our annual food drive to help feed families in need. Volunteers welcome!',
      color: '#7BB661'
    },
    {
      id: 2,
      eventName: 'Community Harvest',
      eventImage: 'https://images.unsplash.com/photo-1488521787991-3e169b3f44b5?w=500&h=500&fit=crop',
      description: 'Help us harvest fresh produce from our community garden and distribute to local families.',
      color: '#5A9D4D'
    },
    {
      id: 3,
      eventName: 'Cooking Workshop',
      eventImage: 'https://images.unsplash.com/photo-1556195332-39a4ee5f1b59?w=500&h=500&fit=crop',
      description: 'Learn healthy cooking techniques with our expert chefs. Free for all community members.',
      color: '#7BB661'
    },
    {
      id: 4,
      eventName: 'Donation Drive',
      eventImage: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=500&fit=crop',
      description: 'Bring non-perishable items, clothing, and household goods to support our mission.',
      color: '#5A9D4D'
    },
    {
      id: 5,
      eventName: 'Volunteer Day',
      eventImage: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=500&fit=crop',
      description: 'Together we can make a difference. Sign up to volunteer at our distribution center.',
      color: '#7BB661'
    },
    {
      id: 6,
      eventName: 'Kids Nutrition Program',
      eventImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop',
      description: 'Fun and educational program teaching children about healthy eating habits.',
      color: '#5A9D4D'
    }
  ]

  const handleAddEvent = () => {
    
  }

  return (
    <div className="events-container">
      <Navbar />
      <h1 className="events-title">Upcoming Events</h1>
      <div className="events-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventName={event.eventName}
            eventImage={event.eventImage}
            description={event.description}
            color={event.color}
          />
        ))}
      </div>
      <button className="add-event-button" onClick={handleAddEvent}>+</button>
    </div>
  )
}

export default Events