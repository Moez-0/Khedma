import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  sellerId: string;
  buyerId: string;
  rating: number;
  comment: string;
  date: string;
}

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    sellerDescription: ''
  });

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    const userData = JSON.parse(currentUser);
    setUser(userData);
    setFormData({
      email: userData.email,
      sellerDescription: userData.sellerDescription || ''
    });

    // Load reviews from localStorage
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const userReviews = allReviews.filter((review: Review) => 
      review.sellerId === userData.username || review.buyerId === userData.username
    );
    setReviews(userReviews);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.username === user.username);

    const updatedUser = {
      ...user,
      email: formData.email,
      sellerDescription: formData.sellerDescription
    };

    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                disabled
                value={user.username}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
            </div>

            {user.isSeller && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Professional Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.sellerDescription}
                  onChange={(e) => setFormData({ ...formData, sellerDescription: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Username</h3>
              <p className="mt-1 text-gray-900">{user.username}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700">Email</h3>
              <p className="mt-1 text-gray-900">{user.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700">Account Type</h3>
              <p className="mt-1 text-gray-900">{user.isSeller ? 'Seller' : 'Buyer'}</p>
            </div>

            {user.isSeller && (
              <div>
                <h3 className="text-sm font-medium text-gray-700">Professional Description</h3>
                <p className="mt-1 text-gray-900">{user.sellerDescription}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {review.sellerId === user.username
                    ? `From ${review.buyerId}`
                    : `To ${review.sellerId}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;