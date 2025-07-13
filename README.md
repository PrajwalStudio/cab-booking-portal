
# 🚕 Cab Booking Portal for Corporate Offices

A full-stack cab booking system built using **React**, **Node.js**, and **PostgreSQL**, designed for corporate users to book cabs from associated vendors.  
> 📌 **This project was built as part of the MCA Capstone Project during my internship at _LaunchEd Global_.**

---

## 🌐 Live Preview (Optional)

You can deploy it using Render, Vercel, or Railway and paste the link here.

---

## 📌 Features

### 👥 Authentication
- JWT-based login and registration
- Role-based access (Company / Vendor)

### 🏢 Company Dashboard
- Book a cab with details like guest name, pickup/drop location, time, vehicle type
- View all bookings
- Cancel pending bookings

### 🚗 Vendor Dashboard
- View available bookings (open market)
- Accept a booking
- Mark accepted bookings as completed
- Manage drivers and vehicles

### 🧑‍✈️ Driver Management
- Add/view drivers
- Store driver details like license, phone, Aadhar, PAN, joining date, etc.

### 🚙 Vehicle Management
- Add/view vehicles
- Track condition, availability, last service, insurance, etc.

---

## 📂 Project Structure

```
cab-booking-portal/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   └── src/
│       ├── pages/
│       ├── context/
│       └── App.js
```

---

## 🛠️ Tech Stack

- **Frontend:** React + Tailwind CSS + Axios  
- **Backend:** Node.js + Express  
- **Database:** PostgreSQL + Sequelize ORM  
- **Authentication:** JWT + bcrypt  

---

## ⚙️ Installation

### Backend

```bash
cd backend
npm install
# Create .env file
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in `/backend` with:

```env
PORT=5000
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Testing

- Use **Postman** to test APIs (`/api/auth`, `/api/bookings`, `/api/vendor`)
- JWT token must be sent via:  
  `Authorization: Bearer <token>`

---

## 🚀 Deployment (Free Options)

- **Frontend:** Vercel / Netlify  
- **Backend + DB:** Render / Railway  

---

## 📸 Screenshots

Include screenshots of:
- Login/Register
- Booking form
- Vendor dashboard
- Driver/Vehicle management

---

## 📚 License

This project is licensed under the **MIT License**.

---

## ✍️ Author

**Prajwal Poojary**  
MCA Student – Full-stack Developer  
Intern @ LaunchEd Global  
[GitHub](https://github.com/PrajwalStudio)
