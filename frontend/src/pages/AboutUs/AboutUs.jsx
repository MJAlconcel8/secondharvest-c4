import React from 'react';
import './AboutUs.scss';
import Navbar from '../../components/Navbar/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import GroupPhoto from '../../assets/group-photo.jpg';
import TeamBuilding from '../../assets/teambuilding.jpg';
import WhereItBegan from '../../assets/WhereItBegan.jpg';
import Volunteering from '../../assets/volunteering.jpg';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Navbar />
        <h1>About Us</h1>
         <h2>Our Story</h2>
          <p>
            Our story begins with C4 at York University, a space where we are challenged to build projects that go beyond the classroom and create meaningful impact in the community. It was through C4 workshops and discussions that we were first introduced to the depth and urgency of food insecurity in Canada. What began as research quickly became personal when we visited YouthEnlightened's warehouse.
          </p>
          <p>
            During our site visit, we witnessed firsthand how surplus food is rescued and redistributed to community organizations serving individuals experiencing food insecurity. After learning about the staggering amount of edible food wasted across the country, we stepped into the warehouse to take part in the process ourselves, sorting industrial bins of carrots and potatoes, carefully weighing five pound bags, and preparing them for distribution. What seemed simple at first revealed the scale, coordination, and labour required to keep food from going to waste.
          </p>
          <p>
            That experience shifted our perspective. Food insecurity was no longer just a statistic or a fundraising goal, it became tangible. We saw how much of the work relies on community members and volunteers, and how urgent and time sensitive food rescue truly is. The workshops and site visit inspired us to think beyond traditional fundraising and consider how engagement could be experiential, collaborative, and skill building.
          </p>
          <p>
            That is how Youth Enlightened was formed. We wanted to empower high school students not only to understand food insecurity, but to take meaningful action. By combining awareness with hands on involvement and life skills such as coding, finance, and graphic design, we aim to create a generation of informed and capable changemakers who can advocate for food security while developing skills that will serve them far beyond this project.
          </p>
      
      <div className="gallery-section">
        <h2>Highlights As a Team</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}
        >
          {itemData.map((item) => (
            <SwiperSlide key={item.img} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={`${item.img}?w=800&h=500&fit=crop&auto=format`}
                alt={item.title}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', padding: '10px', borderRadius: '8px', margin: '0 20px' }}>
                <h3 style={{ margin: '0' }}>{item.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

const itemData = [
  {
    img: GroupPhoto,
    title: 'Community',
  },
  {
    img: TeamBuilding,
    title: 'Team Building',
  },
  {
    img: WhereItBegan,
    title: 'Origin',
  },
    {
    img: Volunteering,
    title: 'Volunteering',
  },

];

export default AboutUs