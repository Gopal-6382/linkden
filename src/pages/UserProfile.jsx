// src/pages/UserProfile.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const userRes = await axios.get(`http://localhost:5500/api/v1/users/${id}`);
        setUser(userRes.data.user);

        const postsRes = await axios.get(`http://localhost:5500/api/v1/posts/user/${id}`);
        setPosts(postsRes.data.posts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container">
      {user && (
        <div className="card p-4 shadow-sm mb-4">
          <h3>{user.name}</h3>
          <p className="text-muted">{user.email}</p>
          <p>{user.bio || <i>No bio available.</i>}</p>
        </div>
      )}

      <h5 className="mb-3">Posts by {user?.name}:</h5>
      {posts.length === 0 ? (
        <p className="text-muted">No posts from this user.</p>
      ) : (
        posts.map((post) => (
          <div className="card mb-3 shadow-sm" key={post._id}>
            <div className="card-body">
              <p>{post.content}</p>
              <hr />
              <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserProfile;
