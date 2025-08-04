import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Header from './Components/Header';
import NotFound from './pages/NotFound';
import './Scss/Main.scss';
import CreatePost from './pages/CreatePost';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/create-post" element={<CreatePost />} />
  <Route path="/user/:id" element={<UserProfile />} /> {/* ✅ Add this line */}
  <Route path="/404" element={<NotFound />} />
  <Route path="*" element={<Navigate to="/404" replace />} />
</Routes>

      </div>
    </Router>
  );
}

export default App;