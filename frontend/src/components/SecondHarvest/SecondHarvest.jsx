/* eslint-disable no-irregular-whitespace */
import React from 'react'
import './SecondHarvest.scss';
import Navbar from '../../components/Navbar/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SecondHarvest1 from '../../assets/secondharvest1.jpeg';
import SecondHarvest2 from '../../assets/secondharvest2.jpg';
import SecondHarvest3 from '../../assets/secondharvest3.jpg';
import SecondHarvest4 from '../../assets/secondharvest4.jpeg';

const SecondHarvest = () => {
  return (
    <div className="second-harvest-container">
      <Navbar />
        <h1>Second Harvest</h1>
         <h2>A Company Fighting Food Waste and Hunger</h2>
          <p>
           Second Harvest is Canada’s largest food rescue organization, founded in 1985 with a mission to reduce food waste and fight hunger. Their work centers on rescuing surplus edible food from grocery stores, farms, and food suppliers that would otherwise be thrown away. By redistributing this food to charities and community organizations across every province and territory, they ensure that people experiencing food insecurity have access to nutritious meals. Their vision, “No Waste. No Hunger,” guides all of their initiatives, from food rescue to education and advocacy.
          </p>
          <p>
            Visiting Second Harvest or learning about their operations highlights the scale and coordination required to redirect food from landfills to tables. The organization works with an extensive network of partners to collect, sort, and deliver millions of pounds of food every year. Volunteers and staff carefully inspect, package, and track the rescued food to ensure it reaches those in need safely. Beyond redistribution, Second Harvest conducts research and produces reports to shed light on the impacts of food waste, helping shape policies and practices across Canada.
          </p>
          <p>
            Seeing their impact in action brings the issue of food insecurity into sharp focus. Food waste is not just an environmental problem, nor is hunger only a statistic. It is a daily reality for thousands of Canadians. Second Harvest demonstrates how community engagement, careful logistics, and advocacy work hand in hand to address these challenges. Volunteers gain firsthand experience of the urgency and scale of food rescue, understanding how their efforts directly benefit vulnerable populations while contributing to systemic change.
          </p>
          <p>
            This approach inspired us to consider how awareness could be paired with action. By combining educational workshops, hands-on involvement, and skill building opportunities, we can empower youth to understand food insecurity while contributing meaningfully to solutions. Second Harvest’s model shows that addressing complex issues like hunger requires collaboration, dedication, and creativity, motivating initiatives that equip the next generation with both empathy and practical skills to create lasting impact.
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
    img: SecondHarvest1,
    title: 'Community',
  },
  {
    img: SecondHarvest2,
    title: 'Team Building',
  },
  {
    img: SecondHarvest3,
    title: 'Origin',
  },
    {
    img: SecondHarvest4,
    title: 'Volunteering',
  },

];

export default SecondHarvest