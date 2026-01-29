# 🎧 Gadgethub (MERN Stack Web Application)

A full-stack **E-Commerce Web Application** built using the **MERN stack** as part of my internship project.  
The platform supports user authentication, product browsing, cart management, and admin inventory control with a modern UI and scalable backend.

---

## 📌 Features

### 👤 User Features
- User authentication using **JWT**
- Browse products with modern UI
- Add / remove products from cart
- View cart with quantity management
- Responsive design for all devices

### 🛠️ Admin Features
- Admin dashboard for product management
- Add, update, and delete products
- Inventory management

### 🤖 Advanced Add-Ons
- AI-powered product recommendations (concept implemented)
- Modular and scalable code structure
- Deployment-ready configuration

---

## 🧰 Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Context API (State Management)
- Axios
- CSS (Custom modern UI)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

### Deployment
- Render (Backend)
- Render / Vercel (Frontend)

---

## 📁 Project Structure

ecommerce-platform/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── styles/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/MadhumithraA1426/e-commerce.git
cd ecommerce-platform

### 2️⃣ Backend Setup

cd backend
npm install

Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:
npm run dev

Backend runs on:
http://localhost:5000

### 3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

### 👩‍💻 Author

Madhu Mithra A
Computer Science Engineering Student
Aspiring MERN Stack & AI Developer

🔗 GitHub: https://github.com/MadhumithraA1426