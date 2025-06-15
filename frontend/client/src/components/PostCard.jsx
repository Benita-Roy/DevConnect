function PostCard({ title, content, tags }) {
  return (
    <div className="w-full max-w-3xl bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="mb-4 text-gray-300">{content}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-600 text-sm px-3 py-1 rounded-full text-white"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
