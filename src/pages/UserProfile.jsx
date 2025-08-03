import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        setLoading(true);
        const [userRes, postsRes] = await Promise.all([
          axios.get(`http://localhost:5500/api/v1/users/${id}`),
          axios.get(`http://localhost:5500/api/v1/posts/user/${id}`)
        ]);

        setUser(userRes.data.user);
        setPosts(postsRes.data.posts);
        
        // Check if current user is following this profile
        // You'll need to implement this based on your backend
        // setIsFollowing(res.data.isFollowing);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [id]);

  const handleFollow = async () => {
    try {
      // Implement follow/unfollow logic based on your API
      // const res = await axios.post(`/api/v1/users/${id}/follow`);
      // setIsFollowing(res.data.isFollowing);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Follow error:', err);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
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
        <div className="text-center mt-3">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
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
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              
              <h3 className="mb-1">{user?.name}</h3>
              <p className="text-muted mb-3">{user?.email}</p>
              
              <p className="text-start mb-4">
                {user?.bio || <span className="text-muted fst-italic">No bio available</span>}
              </p>

              <button 
                className={`btn ${isFollowing ? 'btn-outline-secondary' : 'btn-primary'} w-100`}
                onClick={handleFollow}
              >
                {isFollowing ? (
                  <>
                    <i className="bi bi-person-check me-2"></i>
                    Following
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>
                    Follow
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Posts by {user?.name}</h5>
            </div>
            
            <div className="card-body">
              {posts.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-newspaper text-muted" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mt-3">No posts from this user yet</p>
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
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-secondary rounded-pill">
                          <i className="bi bi-heart me-1"></i> Like
                        </button>
                        <button className="btn btn-sm btn-outline-secondary rounded-pill">
                          <i className="bi bi-chat me-1"></i> Comment
                        </button>
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
        
        .card {
          border-radius: 0.75rem;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        
        .btn-outline-secondary {
          border-color: #dee2e6;
          color: #6c757d;
        }
      `}</style>
    </div>
  );
}

export default UserProfile;