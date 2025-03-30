import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, RefreshCcw, MessageSquare, Heart, Share2 } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Package {
  name: string;
  description: string;
  deliveryTime: string;
  revisions: number;
  price: number;
  features: string[];
}

function ServiceDetails() {
  const { id } = useParams();
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('basic');

  const packages: Record<string, Package> = {
    basic: {
      name: 'Basic',
      description: 'Basic package for simple projects',
      deliveryTime: '3 days',
      revisions: 1,
      price: 50,
      features: [
        'Source file',
        '1 page',
        'Responsive design',
        'Commercial use'
      ]
    },
    standard: {
      name: 'Standard',
      description: 'Recommended package for most projects',
      deliveryTime: '5 days',
      revisions: 3,
      price: 100,
      features: [
        'Source file',
        '3 pages',
        'Responsive design',
        'Commercial use',
        'Custom animations',
        'Design customization'
      ]
    },
    premium: {
      name: 'Premium',
      description: 'Complete solution for complex projects',
      deliveryTime: '7 days',
      revisions: 5,
      price: 200,
      features: [
        'Source file',
        '5 pages',
        'Responsive design',
        'Commercial use',
        'Custom animations',
        'Design customization',
        'Priority support',
        'SEO optimization'
      ]
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Service Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            I will create a professional website design
          </h1>

          <div className="flex items-center mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
              alt="Seller"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-gray-900">John Doe</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-700">4.9</span>
                <span className="ml-1 text-gray-500">(203 reviews)</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <Slider {...sliderSettings}>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
                  alt="Service"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80&w=1200"
                  alt="Service"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
            </Slider>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-4">About This Service</h2>
            <p className="text-gray-700 mb-4">
              I will create a professional, modern, and responsive website design that perfectly matches your brand and business needs. With over 5 years of experience in web design, I ensure high-quality work and excellent communication throughout the project.
            </p>

            <h3 className="text-lg font-bold mb-3">Why choose me?</h3>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Professional and modern design</li>
              <li>Fast delivery and communication</li>
              <li>Unlimited revisions until satisfaction</li>
              <li>100% satisfaction guaranteed</li>
              <li>Source files included</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Pricing */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex space-x-4 mb-6">
                {Object.keys(packages).map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPackage(pkg as 'basic' | 'standard' | 'premium')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                      selectedPackage === pkg
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {packages[pkg].name}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    ${packages[selectedPackage].price}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {packages[selectedPackage].description}
                  </p>
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {packages[selectedPackage].deliveryTime} delivery
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  {packages[selectedPackage].revisions} revisions
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">What's included:</h4>
                  <ul className="space-y-2">
                    {packages[selectedPackage].features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
                  Continue (${packages[selectedPackage].price})
                </button>

                <div className="flex justify-center space-x-4 pt-4">
                  <button className="text-gray-600 hover:text-gray-900">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;