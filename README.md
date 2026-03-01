# YouthEnlightened – Second Harvest

This project was developed as part of York University's Cross-Campus Capstone Classroom (C4) course. Our team was inspired by the work of [Second Harvest Canada](https://secondharvest.ca/), a leading organization fighting food waste and hunger. Their community-driven approach motivated us to create **YouthEnlightened**: a platform empowering youth to organize, discover, and participate in events that address food insecurity and promote environmental stewardship.

## Purpose

YouthEnlightened is a web application designed to:
- Connect youth with local events focused on food security, volunteering, and advocacy.
- Provide a central hub for event discovery, calendar planning, and awareness-building resources.
- Encourage youth leadership and skill development through hands-on community engagement.

## Inspiration

Our project draws inspiration from Second Harvest Canada, whose innovative food rescue and redistribution model demonstrates the power of community action. By combining education, logistics, and advocacy, Second Harvest has shown how youth can play a vital role in tackling food insecurity.

## Technical Overview

### Backend

- **Stack:** Node.js, Express, PostgreSQL
- **Authentication:** JWT-based, with secure password hashing (bcryptjs)
- **API:** RESTful endpoints for user registration, login, and event CRUD operations

#### Running the Backend

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Configure environment variables:**  
   Copy `.env.example` to `.env` and set your database and JWT secrets.
3. **Set up the database:**  
   Use the schema in [`backend/models/database.sql`](backend/models/database.sql) to create the required tables in PostgreSQL.
4. **Start the server:**
   ```sh
   node index.js
   ```
   The backend runs on `http://localhost:5000` by default.

### Frontend

- **Stack:** React (with Vite), React Router, SCSS for styling
- **Features:** Event calendar, event cards, modals, authentication, responsive design

#### Running the Frontend

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Configure environment variables:**  
   Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend URL.
3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` by default.
