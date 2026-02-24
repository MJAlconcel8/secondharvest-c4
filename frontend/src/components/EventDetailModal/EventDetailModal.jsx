import React from 'react'
import './EventDetailModal.scss'

const formatEventDate = (value) => {
  if (!value) {
    return ''
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

const EventDetailModal = ({ event, onClose, onEdit, onDelete }) => {
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${event.eventName}"?`)) {
      onDelete(event.id)
    }
  }

  return (
    <div className="event-detail-modal" onClick={handleModalClick}>
      <div className="event-detail-header">
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="event-detail-image">
        <img src={event.eventImage} alt={event.eventName} />
      </div>

      <div className="event-detail-content">
        <h2 className="event-detail-name">{event.eventName}</h2>
        
        {(event.eventType || event.hostName || event.eventDate) && (
          <div className="event-detail-meta">
            {event.eventType && (
              <span className="event-type-badge">{event.eventType}</span>
            )}
            {event.hostName && (
              <span className="event-detail-info">Hosted by {event.hostName}</span>
            )}
            {event.eventDate && (
              <span className="event-detail-info">{formatEventDate(event.eventDate)}</span>
            )}
          </div>
        )}

        <div className="event-detail-description">
          <h3>About this event</h3>
          <p>{event.description}</p>
        </div>

        <div className="event-detail-actions">
          <button className="btn btn-secondary" onClick={() => onEdit(event)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailModal
