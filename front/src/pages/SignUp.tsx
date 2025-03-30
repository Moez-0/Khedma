import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isSeller: false,
    sellerDescription: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user: any) => user.username === formData.username);

    if (userExists) {
      setError('Username already exists');
      return;
    }

    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      isSeller: formData.isSeller,
      sellerDescription: formData.sellerDescription,
      services: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    navigate(formData.isSeller ? '/seller-dashboard' : '/');
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>
        
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isSeller"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={formData.isSeller}
              onChange={(e) => setFormData({ ...formData, isSeller: e.target.checked })}
            />
            <label htmlFor="isSeller" className="ml-2 block text-sm text-gray-700">
              I want to offer services as a seller
            </label>
          </div>

          {formData.isSeller && (
            <div>
              <label htmlFor="sellerDescription" className="block text-sm font-medium text-gray-700">
                Professional Description
              </label>
              <textarea
                id="sellerDescription"
                required={formData.isSeller}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                value={formData.sellerDescription}
                onChange={(e) => setFormData({ ...formData, sellerDescription: e.target.value })}
                placeholder="Describe your professional experience and expertise..."
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;