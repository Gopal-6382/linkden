// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5500/api/v1/posts')
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4 text-center">🔗 MiniLinkedIn Feed</h2>

      {posts.length === 0 ? (
        <p className="text-muted text-center">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div className="card shadow-sm mb-4" key={post._id}>
            <div className="card-body">
              <p className="card-text">{post.content}</p>
              <hr />
              <div className="d-flex justify-content-between text-muted small">
                <span>
                  👤{' '}
                  <Link to={`/user/${post.author._id}`} className="text-decoration-none">
                    {post.author.name}
                  </Link>
                </span>
                <span>🕒 {new Date(post.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
