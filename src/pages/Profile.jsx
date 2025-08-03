import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const [userRes, postRes] = await Promise.all([
          axios.get('http://localhost:5500/api/v1/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5500/api/v1/posts/user/${token ? JSON.parse(localStorage.getItem('user'))._id : ''}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setUser(userRes.data.user);
        setBio(userRes.data.user.bio || '');
        setPosts(postRes.data.posts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleBioSave = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5500/api/v1/users/${user._id}`,
        { bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update bio');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                   style={{ width: '120px', height: '120px', fontSize: '3rem' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              
              <h3 className="mb-1">{user.name}</h3>
              <p className="text-muted mb-3">{user.email}</p>
              
              {editMode ? (
                <div className="mt-3">
                  <textarea
                    className="form-control mb-3"
                    rows="4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell others about yourself..."
                  />
                  <div className="d-flex justify-content-center gap-2">
                    <button 
                      className="btn btn-success btn-sm" 
                      onClick={handleBioSave}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : 'Save'}
                    </button>
                    <button 
                      className="btn btn-outline-secondary btn-sm" 
                      onClick={() => setEditMode(false)}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-start mb-4">
                    {user.bio || <span className="text-muted fst-italic">No bio provided</span>}
                  </p>
                  <button 
                    className="btn btn-outline-primary btn-sm" 
                    onClick={() => setEditMode(true)}
                  >
                    <i className="bi bi-pencil me-1"></i> Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">My Posts</h5>
              <Link to="/create-post" className="btn btn-primary btn-sm">
                <i className="bi bi-plus-lg me-1"></i> Create Post
              </Link>
            </div>
            
            <div className="card-body">
              {posts.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-newspaper text-muted" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mt-3">You haven't created any posts yet</p>
                  <Link to="/create-post" className="btn btn-primary mt-2">
                    Create Your First Post
                  </Link>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {posts.map((post) => (
                    <div className="list-group-item border-0 py-3" key={post._id}>
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-grow-1">
                          <p className="mb-1">{post.content}</p>
                          <small className="text-muted">
                            <i className="bi bi-clock me-1"></i>
                            {new Date(post.createdAt).toLocaleString()}
                          </small>
                        </div>
                        <div className="dropdown">
                          <button 
                            className="btn btn-sm btn-outline-secondary rounded-circle" 
                            type="button" 
                            data-bs-toggle="dropdown"
                            style={{ width: '32px', height: '32px' }}
                          >
                            <i className="bi bi-three-dots"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <button className="dropdown-item">
                                <i className="bi bi-pencil me-2"></i> Edit
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item text-danger">
                                <i className="bi bi-trash me-2"></i> Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add this CSS in your global styles or style tag */}
      <style>{`
        .avatar {
          font-weight: 600;
          background-color: #f0f2f5 !important;
        }
        
        .list-group-item {
          transition: background-color 0.2s ease;
        }
        
        .list-group-item:hover {
          background-color: #f8f9fa;
        }
        
        .dropdown-toggle::after {
          display: none;
        }
        
        .card {
          border-radius: 0.75rem;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
}

export default Profile;