function PostCard({ title, content, tags }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{content}</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-sm mx-auto mt-10">
  <h2 className="text-xl font-bold text-gray-900">Tailwind Test</h2>
  <p className="text-gray-700">If this looks nice, Tailwind is working!</p>
</div>

    </div>
    
  );
}

export default PostCard;
