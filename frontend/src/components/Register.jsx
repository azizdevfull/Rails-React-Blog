import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    axios.post('http://localhost:3000/api/v1/users', { user })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
        navigate('/');
      })
      .catch(error => {
        if (error.response) {
          setErrors([error.response.data.error]);
        } else {
          setErrors(['Something went wrong. Please try again later.']);
        }
      });
  };

  return (
    <div>
      <h2>Register</h2>
      {errors.length > 0 && (
        <div className="error">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange}  />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange}  />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
