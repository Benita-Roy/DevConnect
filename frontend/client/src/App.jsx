import { useEffect, useState } from "react";
import PostCard from "./components/PostCard"; // ✅ correct path

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts)) // ✅ if using pagination response
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

 return (
  <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">devnet</h1>

    {posts.length === 0 ? (
      <p className="text-center text-gray-500 dark:text-gray-400">No posts yet.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            title={post.title}
            content={post.content}
            tags={post.tags}
          />
        ))}
      </div>
    )}
  </div>
);

}

export default App;
