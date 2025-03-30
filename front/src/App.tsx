import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Briefcase, MessageSquare, Star, TrendingUp, UserCircle, LogOut, Bell, Heart, ChevronDown } from 'lucide-react';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import SellerDashboard from './pages/SellerDashboard';
import UserProfile from './pages/UserProfile';
import ServiceDetails from './pages/ServiceDetails';

// Mock data for services
const services = [
  {
    id: 1,
    title: "I will create a professional website design",
    seller: "Alex Johnson",
    rating: 4.9,
    reviews: 127,
    price: 50,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    level: "Level 2 Seller",
    deliveryTime: "3 days",
    description: "Professional and modern website design with unlimited revisions"
  },
  {
    id: 2,
    title: "I will design a modern and unique logo",
    seller: "Sarah Smith",
    rating: 4.8,
    reviews: 89,
    price: 35,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600",
    level: "Top Rated",
    deliveryTime: "2 days",
    description: "Creative and memorable logo design for your brand"
  },
  {
    id: 3,
    title: "Content Writing",
    seller: "Mike Brown",
    rating: 4.7,
    reviews: 156,
    price: 25,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
    level: "Level 1 Seller",
    deliveryTime: "1 day"
  },
  {
    id: 4,
    title: "Social Media Marketing",
    seller: "Emma Wilson",
    rating: 4.9,
    reviews: 203,
    price: 45,
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=600",
    level: "Top Rated",
    deliveryTime: "4 days"
  },
  {
    id: 5,
    title: "Mobile App Development",
    seller: "David Chen",
    rating: 4.8,
    reviews: 178,
    price: 65,
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80&w=600",
    level: "Level 2 Seller",
    deliveryTime: "5 days"
  },
  {
    id: 6,
    title: "Video Editing",
    seller: "Lisa Anderson",
    rating: 4.7,
    reviews: 142,
    price: 40,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=600",
    level: "Level 1 Seller",
    deliveryTime: "2 days"
  }
];

const categories = [
  {
    name: 'Graphics & Design',
    icon: Briefcase,
    subcategories: ['Logo Design', 'Web Design', 'App Design', 'Illustration']
  },
  {
    name: 'Digital Marketing',
    icon: TrendingUp,
    subcategories: ['Social Media', 'SEO', 'Content Marketing', 'Email Marketing']
  },
  {
    name: 'Writing & Translation',
    icon: MessageSquare,
    subcategories: ['Articles & Blog Posts', 'Translation', 'Proofreading', 'Creative Writing']
  },
  {
    name: 'Video & Animation',
    icon: Star,
    subcategories: ['Video Editing', 'Animation', 'Short Video Ads', 'Intros & Outros']
  }
];

function CategoryDropdown({ category }: { category: typeof categories[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
        <span>{category.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
          {category.subcategories.map((subcategory) => (
            <a
              key={subcategory}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {subcategory}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Find the perfect freelance services for your business</h2>
            <p className="text-xl mb-8">Millions of people use Connection to turn their ideas into reality</p>
            <div className="max-w-3xl mx-auto">
              <div className="flex bg-white rounded-lg p-2">
                <input
                  type="text"
                  placeholder="What service are you looking for today?"
                  className="flex-1 px-4 py-2 text-gray-900 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            {categories.map((category) => (
              <CategoryDropdown key={category.name} category={category} />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Services you might like</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services
            .filter(service => 
              searchQuery === '' || 
              service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              service.seller.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((service) => (
            <Link to={`/service/${service.id}`} key={service.id} className="group">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-5 w-5 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{service.seller}</h5>
                      <span className="text-xs text-indigo-600">{service.level}</span>
                    </div>
                  </div>
                  <h4 className="text-base font-medium text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600">
                    {service.title}
                  </h4>
                  <div className="flex items-center text-sm mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-700">{service.rating}</span>
                    <span className="ml-1 text-gray-500">({service.reviews})</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        From
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${service.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">خدمة</h1>
              </Link>
              <div className="flex items-center space-x-6">
                {currentUser ? (
                  <>
                    <div className="relative">
                      <button className="text-gray-600 hover:text-gray-900">
                        <Bell className="h-6 w-6" />
                        {notifications.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {notifications.length}
                          </span>
                        )}
                      </button>
                    </div>
                    <div className="h-6 w-px bg-gray-200"></div>
                    {currentUser.isSeller && (
                      <Link to="/seller-dashboard" className="text-gray-600 hover:text-gray-900">
                        Seller Dashboard
                      </Link>
                    )}
                    <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-900">
                      <UserCircle className="h-5 w-5 mr-1" />
                      {currentUser.username}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <LogOut className="h-5 w-5 mr-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" className="text-gray-600 hover:text-gray-900">Sign In</Link>
                    <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                      Join Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-6 w-6 text-indigo-400" />
                  <span className="text-xl font-bold">خدمة</span>
                </div>
                <p className="text-gray-400">Find the perfect match for your project needs.</p>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-4">About</h5>
                <p className="text-gray-400 mb-2">Connection is your gateway to a world of professional services, connecting talented freelancers with clients who need their expertise.</p>
                <p className="text-gray-400">Our platform makes it easy to find, connect, and collaborate with the right professionals for your project.</p>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-4">Support</h5>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Help Center</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;