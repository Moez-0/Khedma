import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface User {
  username: string;
  email: string;
  isSeller: boolean;
  sellerDescription: string;
  services: Service[];
}

function SellerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    const userData = JSON.parse(currentUser);
    if (!userData.isSeller) {
      navigate('/');
      return;
    }
    setUser(userData);
  }, [navigate]);

  const handleSubmitService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.username === user.username);

    const newService = {
      id: Date.now(),
      title: serviceForm.title,
      description: serviceForm.description,
      price: parseFloat(serviceForm.price),
      image: serviceForm.image
    };

    const updatedUser = {
      ...user,
      services: editingService 
        ? user.services.map(s => s.id === editingService.id ? newService : s)
        : [...user.services, newService]
    };

    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowServiceForm(false);
    setEditingService(null);
    setServiceForm({ title: '', description: '', price: '', image: '' });
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      image: service.image
    });
    setShowServiceForm(true);
  };

  const handleDeleteService = (serviceId: number) => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.username === user.username);

    const updatedUser = {
      ...user,
      services: user.services.filter(s => s.id !== serviceId)
    };

    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
        <p className="mt-2 text-gray-600">Welcome back, {user.username}!</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Professional Profile</h3>
        <p className="text-gray-600">{user.sellerDescription}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Your Services</h3>
          <button
            onClick={() => {
              setShowServiceForm(true);
              setEditingService(null);
              setServiceForm({ title: '', description: '', price: '', image: '' });
            }}
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            Add New Service
          </button>
        </div>

        {showServiceForm && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h4>
            <form onSubmit={handleSubmitService} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Service Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (USD)
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  min="1"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowServiceForm(false);
                    setEditingService(null);
                    setServiceForm({ title: '', description: '', price: '', image: '' });
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.services.map((service) => (
            <div key={service.id} className="border rounded-lg p-4">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900">{service.title}</h4>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <p className="text-xl font-bold text-gray-900 mt-2">${service.price}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleEditService(service)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;