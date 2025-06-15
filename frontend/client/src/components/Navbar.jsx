const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">devnet</h1>
      <div className="space-x-4">
        <button className="hover:underline">Home</button>
        <button className="hover:underline">Profile</button>
        <button className="hover:underline">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
