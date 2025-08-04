import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const [userRes, postsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          }),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/posts/user/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          })
        ]);

        console.log("User response:", userRes.data); // Debugging
        console.log("Posts response:", postsRes.data); // Debugging

        // Make sure the response structure matches what you expect
        setUser(userRes.data.user || userRes.data.data); // Try both possibilities
        setPosts(postsRes.data.posts || postsRes.data);
      } catch (err) {
        console.error("Error details:", err.response);
        setError(err.response?.data?.message || "Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                   style={{ width: '120px', height: '120px', fontSize: '3rem' }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <h3 className="mb-1">{user.name || 'Unknown User'}</h3>
              <p className="text-muted mb-3">{user.email || 'No email'}</p>

              <p className="text-start mb-4">
                {user.bio || <span className="text-muted fst-italic">No bio available</span>}
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Posts by {user.name || 'this user'}</h5>
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
                      <p className="mb-1">{post.content}</p>
                      <small className="text-muted">
                        {new Date(post.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;