import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phoneNumber: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous error
    setError('');

    // Check if passwords match
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Make the API request to the signup endpoint
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        // Redirect to the login page
        navigate('/login');
      } else {
        console.error('Signup error:', data);
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to signup');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center" style={{ backgroundImage: "url('https://i.pinimg.com/736x/50/ca/44/50ca4401934853174450947e959b1ef4.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="bg-white opacity-75 p-8 shadow-md rounded-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => handleChange(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}
