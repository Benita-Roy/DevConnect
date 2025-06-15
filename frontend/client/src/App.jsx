import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";

function App() {
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Fetch posts or fallback to sample
  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setPosts([
          {
            _id: "sample1",
            title: "Welcome to DevNet 👋",
            content:
              "This is a sample post added because the backend isn't running or didn't return data.",
            tags: ["sample", "demo", "frontend"],
          },
        ]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      {/* Header row: title + toggle */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white ml-2">
          devnet
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Posts centered */}
      <div className="flex flex-col items-center space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No posts yet.
          </p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="w-full max-w-3xl">
              <PostCard
                title={post.title}
                content={post.content}
                tags={post.tags}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
