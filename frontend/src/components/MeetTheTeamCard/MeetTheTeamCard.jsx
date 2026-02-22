import React from 'react';
import './MeetTheTeamCard.scss';

const MeetTheTeamCard = ({ name, role, image, description, color }) => {
  return (
    <div
      className="meet-team-card"
      whileHover={{ scale: 1.05 }}
      style={{ background: color || '#FF8A80' }}
    >
      <div className="team-card-header">
        <div className="team-card-info">
          <h3 className="team-member-name">{name}</h3>
          <h4 className="team-member-role">{role}</h4>
        </div>
        <img className="team-member-img" src={image} alt={name} />
      </div>
      <div className="team-member-description">{description}</div>
    </div>
  );
};

export default MeetTheTeamCard;
