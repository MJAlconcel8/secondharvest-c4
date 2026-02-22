import React from 'react';
import MeetTheTeamCard from '../../components/MeetTheTeamCard/MeetTheTeamCard';
import Navbar from '../../components/Navbar/Navbar';
import './MeetTheTeam.scss';

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Project Lead',
    image: '/src/assets/alex.jpg',
    description: 'Guiding the team to success and ensuring our mission stays on track.',
    color: '#FF8A80',
  },
  {
    name: 'Sam Lee',
    role: 'Backend Developer',
    image: '/src/assets/sam.jpg',
    description: 'Building robust APIs and keeping our data secure and efficient.',
    color: '#FF8A80',
  },
  {
    name: 'Jamie Rivera',
    role: 'Frontend Developer',
    image: '/src/assets/jamie.jpg',
    description: 'Crafting beautiful, accessible, and responsive user interfaces.',
    color: '#FF8A80',
  },
  {
    name: 'Jamie Rivera',
    role: 'Frontend Developer',
    image: '/src/assets/jamie.jpg',
    description: 'Crafting beautiful, accessible, and responsive user interfaces.',
    color: '#FF8A80',
  },
    {
    name: 'Jamie Rivera',
    role: 'Frontend Developer',
    image: '/src/assets/jamie.jpg',
    description: 'Crafting beautiful, accessible, and responsive user interfaces.',
    color: '#FF8A80',
  },
  {
    name: 'Jamie Rivera',
    role: 'Frontend Developer',
    image: '/src/assets/jamie.jpg',
    description: 'Crafting beautiful, accessible, and responsive user interfaces.',
    color: '#FF8A80',
  },
  // Add more team members as needed
];

const MeetTheTeam = () => {
  return (
    <div className="meet-the-team-page">
      <Navbar />
      <h1 className="meet-the-team-title">Meet The Team</h1>
      <div className="meet-the-team-cards">
        {teamMembers.map((member, idx) => (
          <MeetTheTeamCard key={idx} {...member} />
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
