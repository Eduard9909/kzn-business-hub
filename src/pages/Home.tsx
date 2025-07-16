
import React from 'react';
import DefaultLayout from '../components/layout/DefaultLayout';
import Navbar from '../components/navigation/Navbar';
import HeroSearch from '../components/search/HeroSearch';
import BusinessCard from '../components/business/BusinessCard';

const Home: React.FC = () => {
  // Dummy data for BusinessCard components
  const dummyBusinesses = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      name: 'Bean There Coffee Co.',
      location: 'Durban, KZN',
      category: 'Coffee Shop',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      name: 'The Golden Spoon Restaurant',
      location: 'Pietermaritzburg, KZN',
      category: 'Restaurant',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      name: 'Style Studio Hair Salon',
      location: 'Ballito, KZN',
      category: 'Hair Salon',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      name: 'KZN Auto Repair',
      location: 'Newcastle, KZN',
      category: 'Auto Service',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      name: 'FitZone Gym',
      location: 'Richards Bay, KZN',
      category: 'Fitness Center',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      name: 'Elite Construction Services',
      location: 'Empangeni, KZN',
      category: 'Construction',
    },
  ];

  return (
    <DefaultLayout>
      <Navbar />
      <HeroSearch />
      
      {/* Featured Businesses Section */}
      <section className="py-16 sm:py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Businesses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover some of the most popular businesses in KwaZulu-Natal
          </p>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {dummyBusinesses.map((business, index) => (
            <BusinessCard
              key={index}
              imageUrl={business.imageUrl}
              name={business.name}
              location={business.location}
              category={business.category}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
            View All Businesses
          </button>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Home;
