import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const userRes = await axios.get('http://localhost:5500/api/v1/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userRes.data.user);
        setBio(userRes.data.user.bio || '');

        const postRes = await axios.get(
          `http://localhost:5500/api/v1/posts/user/${userRes.data.user._id}`
        );
        setPosts(postRes.data.posts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleBioSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5500/api/v1/users/${user._id}`,
        { bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setEditMode(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update bio');
    }
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container">
      <div className="card p-4 shadow-sm mb-4">
        <h3 className="mb-1">{user.name}</h3>
        <p className="text-muted mb-0">{user.email}</p>

        {editMode ? (
          <>
            <textarea
              className="form-control mt-3"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="mt-2">
              <button className="btn btn-success btn-sm me-2" onClick={handleBioSave}>
                Save
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2">{user.bio || <i>No bio provided.</i>}</p>
            <button className="btn btn-outline-primary btn-sm" onClick={() => setEditMode(true)}>
              Edit Bio
            </button>
          </>
        )}
      </div>

      <h5 className="mb-3">My Posts</h5>
      {posts.length === 0 ? (
        <p className="text-muted">You haven't created any posts yet.</p>
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

export default Profile;
