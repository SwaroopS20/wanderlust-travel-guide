# 🌍 Wanderlust - Travel Destination Discovery & Bucket List App

**Wanderlust** is a full-stack web application designed to help travelers discover top tourist destinations across India, view detailed travel itineraries and budget estimates, and manage personal travel bucket lists.

---

## 📸 Features

- **User Authentication:** Secure user registration and login powered by **Node.js, Express, PostgreSQL, bcrypt, and JWT (JSON Web Tokens)**.
- **Interactive Destination Directory:** Search and explore handpicked destinations (Mumbai, Delhi, Goa, Jaipur, Agra, Udaipur, Darjeeling, Shimla, Rishikesh) with key highlights, famous food, best times to visit, estimated budget, and transportation guides.
- **Protected Destination Details:** Detailed travel guides and modal popups accessible upon logging in.
- **Personal Bucket List ("My Places"):** Add destinations to your personal bucket list, persisted via browser `localStorage`.
- **Responsive UI:** Modern, clean design built using **Bootstrap 5** and custom CSS.

---

## 🛠️ Tech Stack & Architecture

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (using `pg.Pool`)
- **Authentication & Security:** JWT (`jsonwebtoken`), Password Hashing (`bcrypt`), CORS (`cors`)
- **Environment Management:** `dotenv`

### **Frontend**
- **Structure & Styling:** HTML5, CSS3, Bootstrap 5
- **Scripting & State:** JavaScript (ES6+), Fetch API, `localStorage` (bucket list), `sessionStorage` (auth tokens & session tracking)

---

## 📁 Project Structure

```text
wanderlust/
│── db.js               # PostgreSQL connection pool configuration
│── server.js           # Express API server & authentication routes
│── index.html          # Landing page with authentication modals
│── destinations.html   # Destination cards, search filter, and detail modals
│── addplace.html       # Saved bucket list places management
│── style.css           # Custom styling rules
└── .env                # Environment variables (Database & JWT settings)
```

---

## ⚡ Installation & Setup Guide

### 1. Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14+)
- [PostgreSQL](https://www.postgresql.org/)

### 2. Database Setup
Create a PostgreSQL database and `users` table:

```sql
CREATE DATABASE wanderlust_db;

\c wanderlust_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Clone & Install Dependencies
Navigate to the project root directory and install required npm packages:

```bash
npm install express pg bcrypt jsonwebtoken cors dotenv
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=wanderlust_db
DB_PASSWORD=your_postgres_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
```

### 5. Start the Server
Run the Express backend server:

```bash
node server.js
```
The server will run on `http://localhost:5000`.

### 6. Run the Frontend
Open `index.html` in your browser (or use a live server extension) to access the application.

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Health check endpoint | No |
| `POST` | `/api/auth/signup` | Register a new user account | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | No |

---

## 📜 License

This project is open-source and available under the **MIT License**.
