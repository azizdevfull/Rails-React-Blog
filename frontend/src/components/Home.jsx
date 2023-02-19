import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.reload(); // refresh the page to update the UI
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
