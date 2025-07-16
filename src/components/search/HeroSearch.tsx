
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const HeroSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // TODO: Implement search functionality with Supabase
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Headlines */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Local Businesses in{' '}
            <span className="text-primary">KwaZulu-Natal</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From coffee shops to contractors – all in one place.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-lg p-2 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for a service, business, or location"
                  className="w-full px-6 py-4 text-lg text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Popular Categories */}
        <div className="mt-8">
          <p className="text-gray-600 mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Restaurants', 'Coffee Shops', 'Hair Salons', 'Auto Repair', 'Contractors', 'Fitness'].map((category) => (
              <button
                key={category}
                className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full border border-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
