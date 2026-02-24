import React from 'react'
import './EventCard.scss'

const formatEventType = (value) => {
  if (!value) {
    return ''
  }
  return value.replace(/(^|\s|-)\S/g, (match) => match.toUpperCase())
}

const formatEventDate = (value) => {
  if (!value) {
    return ''
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const EventCard = ({
  eventName,
  eventImage,
  eventType,
  description,
  hostName,
  eventDate,
  color,
  onClick
}) => {
  return (
    <div
      className="event-card"
      style={{ borderColor: color || '#7BB661' }}
      onClick={onClick}
    >
      <div className="event-card-image-container">
        <img className="event-card-image" src={eventImage} alt={eventName} />
      </div>
      <div className="event-card-content">
        <h3 className="event-card-name">{eventName}</h3>
        {eventType && <span className="event-card-type">{formatEventType(eventType)}</span>}
        {(hostName || eventDate) && (
          <div className="event-card-meta">
            {hostName && (
              <span className="event-card-meta-item">
                Hosted by <strong>{hostName}</strong>
              </span>
            )}
            {eventDate && (
              <span className="event-card-meta-item">
                {formatEventDate(eventDate)}
              </span>
            )}
          </div>
        )}
        <p className="event-card-description">{description}</p>
      </div>
    </div>
  )
}

export default EventCard