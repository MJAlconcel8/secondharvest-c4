import React from 'react';
import './EventCard.scss';

const EventCard = ({ eventName, eventImage, description, color }) => {
  return (
    <div
      className="event-card"
      style={{ borderColor: color || '#7BB661' }}
    >
      <div className="event-card-image-container">
        <img className="event-card-image" src={eventImage} alt={eventName} />
      </div>
      <div className="event-card-content">
        <h3 className="event-card-name">{eventName}</h3>
        <p className="event-card-description">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;