import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/posts`);
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex align-items-center mb-4">
            <h2 className="mb-0">🔗 MiniLinkedIn Feed</h2>
            <div className="ms-auto">
              <Link to="/create-post" className="btn btn-primary btn-sm rounded-pill">
                <i className="bi bi-plus-lg me-1"></i> Create Post
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
              <p className="text-muted mt-3">No posts yet. Be the first to share something!</p>
              <Link to="/create-post" className="btn btn-primary mt-2 rounded-pill">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="post-feed">
              {posts.map((post) => (
                <div className="card shadow-sm mb-4 border-0" key={post._id}>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-shrink-0">
                        <div className="avatar bg-light text-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                          {post.author.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <Link to={`/user/${post.author._id}`} className="text-decoration-none fw-bold">
                          {post.author.name}
                        </Link>
                        <div className="text-muted small">
                          {new Date(post.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <p className="card-text mb-3">{post.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button className="btn btn-sm btn-outline-secondary rounded-pill">
                        <i className="bi bi-heart me-1"></i> Like
                      </button>
                      <button className="btn btn-sm btn-outline-secondary rounded-pill">
                        <i className="bi bi-chat me-1"></i> Comment
                      </button>
                      <button className="btn btn-sm btn-outline-secondary rounded-pill">
                        <i className="bi bi-share me-1"></i> Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add this CSS in your global styles or style tag */}
      <style>{`
        .post-feed .card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border-radius: 0.75rem;
        }
        
        .post-feed .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
        }
        
        .avatar {
          font-weight: 600;
          background-color: #f0f2f5 !important;
        }
        
        .btn-outline-secondary {
          border-color: #dee2e6;
          color: #6c757d;
        }
        
        .btn-outline-secondary:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
}

export default Home;