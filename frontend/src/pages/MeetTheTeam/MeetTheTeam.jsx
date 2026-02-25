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
  description: 'Led full-stack development by building the backend server, designing the team website, and integrating APIs to deliver a seamless and scalable platform.',
  color: '#F6F3E7',
},
{
  name: 'Jason Tran',
  role: 'Electrical Engineering Student',
  image: Jason,
  description: 'Developed the technical framework and system architecture, supported prototyping, and contributed to technical documentation and solution feasibility.',
  color: '#F6F3E7',
},
{
  name: 'Prahbmeet Singh',
  role: 'Psychology Student',
  image: Prahbmeet,
  description: 'Applied user-centered research to ensure the solution addresses real community needs, focusing on accessibility, behavioral impact, and engagement strategies.',
  color: '#F6F3E7',
},
{
  name: 'Bani Galhorta',
  role: 'IT Student',
  image: Bani,
  description: 'Supported technical implementation, optimized system performance, and assisted in deployment, testing, and infrastructure management.',
  color: '#F6F3E7',
},
{
  name: 'Adley Kabui',
  role: 'Mechanical Engineering Student',
  image: Adley,
  description: 'Contributed to product design strategy, structured problem-solving, and operational planning to ensure the solution is practical and sustainable.',
  color: '#F6F3E7',
},
{
  name: 'Hamza Shallah',
  role: 'Business Student',
  image: Hamza,
  description: 'Led market research, partnership outreach, and business strategy development to ensure financial feasibility and long-term community impact.',
  color: '#F6F3E7',
},
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
