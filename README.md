# MiniLinkedIn Frontend

This is the **React.js frontend** for the MiniLinkedIn community platform — a simple social app where users can register, log in, create posts, view others’ profiles, and manage their own.

---

## 🔧 Tech Stack

- **React.js** (Functional components with Hooks)
- **React Router DOM** – Routing
- **Axios** – API requests
- **Bootstrap** – Styling and responsiveness
- **LocalStorage** – Auth token storage

---

## 📁 Folder Structure

src
│
├── Components/
│ └── Header.jsx # Navbar (includes login/logout links)
│
├── Pages/
│ ├── Home.jsx # Feed with all posts
│ ├── Login.jsx # User login
│ ├── Register.jsx # User signup
│ ├── Profile.jsx # Logged-in user's profile & posts
│ ├── CreatePost.jsx # Post creation form
│ └── UserProfile.jsx # View other users' profiles & posts
│
├── utils/
│ └── api.js # Axios config with base URL and headers
│
├── App.jsx # Main router setup
└── main.jsx # React app entry point


---

## ✅ Features

- 🔐 **Register/Login** using JWT
- 🏠 **Home Feed** with all public posts
- ✍️ **Create Posts** (text-based)
- 🙍‍♂️ **Profile Page** with editable bio
- 👥 **User Profiles** with individual post lists
- 🔐 **Protected Routes** using token logic

---

## ⚙️ Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/minilinkedin.git
cd minilinkedin/frontend
2. Install dependencies

npm install
3. Start the development server

npm run dev
🔐 Authentication Logic
JWT token is stored in localStorage

Sent with Authorization: Bearer <token> on protected routes

If token is missing or expired, users are redirected to login

🌐 API Base URL
Ensure your backend is running at:

http://localhost:5500/api/v1
Or update the base URL in:

/src/utils/api.js
🧪 Testing
Test login and registration

Try creating a post

Visit /user/:id to see another user’s profile

Edit bio in your profile

📌 Notes
This project depends on a backend server. Ensure your backend is live and accepting requests.

You can find backend endpoints like /auth/sign-in, /users/me, /posts, etc.









