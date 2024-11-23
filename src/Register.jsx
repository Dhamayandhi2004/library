import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleRegister = async () => {
    try {
      // API call to backend
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password,
      });

      console.log('Server Response:', response.data);
      alert('Registration successful!');
      navigate('/'); // Redirect to homepage after successful registration
    } catch (error) {
      console.error('Registration Error:', error);
      alert(error.response?.data || 'An error occurred during registration');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
