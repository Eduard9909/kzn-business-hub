
import React, { useState } from 'react';
import DefaultLayout from '../components/layout/DefaultLayout';
import Navbar from '../components/navigation/Navbar';
import BusinessCard from '../components/business/BusinessCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockBusinesses = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    name: 'Ocean View Restaurant',
    location: 'Durban',
    category: 'Food & Drink'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80',
    name: 'Quick Fix Plumbing',
    location: 'Pietermaritzburg',
    category: 'Plumbing'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    name: 'Style Studio Salon',
    location: 'Durban',
    category: 'Beauty & Wellness'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80',
    name: 'Tech Solutions KZN',
    location: 'Newcastle',
    category: 'Technology'
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    name: 'Green Garden Services',
    location: 'Richards Bay',
    category: 'Home & Garden'
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    name: 'Legal Eagles Law Firm',
    location: 'Durban',
    category: 'Professional Services'
  }
];

const categories = [
  'All Categories',
  'Food & Drink',
  'Plumbing',
  'Beauty & Wellness',
  'Technology',
  'Home & Garden',
  'Professional Services'
];

const locations = [
  'All Locations',
  'Durban',
  'Pietermaritzburg',
  'Newcastle',
  'Richards Bay'
];

const sortOptions = [
  'A–Z',
  'Recently Added',
  'Top Rated'
];

const Directory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('A–Z');

  const filteredBusinesses = mockBusinesses.filter(business => {
    const categoryMatch = selectedCategory === 'All Categories' || business.category === selectedCategory;
    const locationMatch = selectedLocation === 'All Locations' || business.location === selectedLocation;
    return categoryMatch && locationMatch;
  });

  return (
    <DefaultLayout>
      <Navbar />
      
      {/* Header */}
      <div className="py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Business Directory</h1>
        <p className="text-lg text-gray-600">Discover local businesses across KwaZulu-Natal</p>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Business Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
        {filteredBusinesses.map((business) => (
          <BusinessCard
            key={business.id}
            imageUrl={business.imageUrl}
            name={business.name}
            location={business.location}
            category={business.category}
          />
        ))}
      </div>

      {filteredBusinesses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No businesses found matching your filters.</p>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Directory;
