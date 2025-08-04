import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky-top shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary">
        <div className="container-fluid px-3 px-md-4 px-lg-5">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="logo-icon me-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM9 17.5H6.5V9.5H9V17.5ZM7.75 8.25C6.7835 8.25 6 7.4665 6 6.5C6 5.5335 6.7835 4.75 7.75 4.75C8.7165 4.75 9.5 5.5335 9.5 6.5C9.5 7.4665 8.7165 8.25 7.75 8.25ZM18 17.5H15.5V13C15.5 11.6193 14.3807 10.5 13 10.5C11.6193 10.5 10.5 11.6193 10.5 13V17.5H8V9.5H10.5V10.765C11.2345 9.9115 12.5265 9.5 13.5 9.5C15.9853 9.5 18 11.5147 18 14V17.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="brand-text">MiniLinkedIn</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {user ? (
                <>
                  <li className="nav-item mx-1 my-1 my-lg-0">
                    <Link
                      className="nav-link px-3 py-2 rounded-pill hover-effect"
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="bi bi-house me-1"></i> Home
                    </Link>
                  </li>
                  <li className="nav-item mx-1 my-1 my-lg-0">
                    <Link
                      className="nav-link px-3 py-2 rounded-pill hover-effect"
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="bi bi-person me-1"></i> Profile
                    </Link>
                  </li>
                  <li className="nav-item mx-1 my-1 my-lg-0">
                    <Link
                      className="nav-link px-3 py-2 rounded-pill hover-effect"
                      to="/create-post"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="bi bi-plus-circle me-1"></i> Create Post
                    </Link>
                  </li>
                  <li className="nav-item mx-1 my-1 my-lg-0">
                    <button
                      className="btn btn-outline-light rounded-pill px-3 py-2 ms-lg-2"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-1 my-1 my-lg-0">
                    <Link
                      className="nav-link px-3 py-2 rounded-pill hover-effect"
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="bi bi-house me-1"></i> Home
                    </Link>
                  </li>
                  <li className="nav-item mx-1 my-1 my-lg-0">
                    <Link
                      className="nav-link px-3 py-2 rounded-pill hover-effect"
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="bi bi-box-arrow-in-right me-1"></i> Login
                    </Link>
                  </li>
                  <li className="nav-item mx-1 my-1 my-lg-0">
                    <Link
                      className="btn btn-primary rounded-pill px-3 py-2"
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="bi bi-person-plus me-1"></i> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Add this CSS in your global styles or style tag */}
      <style>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);
        }
        
        .logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .brand-text {
          font-weight: 600;
          font-size: 1.25rem;
        }
        
        .hover-effect {
          transition: all 0.3s ease;
        }
        
        .hover-effect:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }
        
        .nav-link {
          font-weight: 500;
        }
        
        .rounded-pill {
          border-radius: 50rem !important;
        }
        
        @media (max-width: 991.98px) {
          .navbar-collapse {
            padding: 1rem 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
