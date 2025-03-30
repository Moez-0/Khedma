import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // For now, we'll use localStorage to simulate authentication
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => 
      u.username === formData.username && u.password === formData.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in to your account</h2>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;