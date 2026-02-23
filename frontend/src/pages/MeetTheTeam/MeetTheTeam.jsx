import React from 'react';
import MeetTheTeamCard from '../../components/MeetTheTeamCard/MeetTheTeamCard';
import Navbar from '../../components/Navbar/Navbar';
import Mark from '../../assets/Mark.png';
import Jason from '../../assets/Jason.png';
import Prahbmeet from '../../assets/Prahbmeet.png';
import Bani from '../../assets/Bani.png';
import Adley from '../../assets/Adley.png';
import Hamza from '../../assets/Hamza.png';
import './MeetTheTeam.scss';

const teamMembers = [
  {
    name: 'Mark Joseph Alconcel',
    role: 'Computer Science Student',
    image: Mark,
    description: 'Worked on the team website, ',
    color: '#F6F3E7',
  },
  {
    name: 'Jason Tran',
    role: 'Electrical Engineering Student',
    image: Jason,
    description: 'Worked on.',
    color: '#F6F3E7',
  },
  {
    name: 'Prahbmeet Singh',
    role: 'Pyschology Student',
    image: Prahbmeet,
    description: 'Crafting beautiful, accessible, and responsive user interfaces.',
    color: '#F6F3E7',
  },
  {
    name: 'Bani Galhorta',
    role: 'IT Student',
    image: Bani,
    description: 'Crafting beautiful, accessible, and responsive user interfaces.',
    color: '#F6F3E7',
  },
    {
    name: 'Adley Kabui',
    role: 'Mechanical Engineering Student',
    image: Adley,
    description: 'Crafting beautiful, accessible, and responsive user interfaces.',
    color: '#F6F3E7',
  },
  {
    name: 'Hamza Shallah',
    role: 'Business Student',
    image: Hamza,
    description: 'Crafting beautiful, accessible, and responsive user interfaces.',
    color: '#F6F3E7',
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
