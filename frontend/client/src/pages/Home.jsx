import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts") // or your backend URL
      .then(res => setPosts(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        posts.map(post => (
          <div
            key={post._id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700 mt-1">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
