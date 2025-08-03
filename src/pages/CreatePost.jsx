import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Login first to create a post.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        'http://localhost:5500/api/v1/posts',
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContent('');
      navigate('/');
    } catch (err) {
      console.error(err.response?.data?.message || 'Post creation failed');
      alert(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h3>Create a Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
