
import React, { useState, useMemo } from 'react';
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
import { useBusinesses } from '../hooks/useBusinesses';
import { useCategories } from '../hooks/useCategories';

const Directory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('A–Z');

  const { data: businesses = [], isLoading: businessesLoading, error: businessesError } = useBusinesses();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Get unique locations from businesses
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(businesses.map(business => business.location))];
    return ['All Locations', ...uniqueLocations.sort()];
  }, [businesses]);

  // Filter and sort businesses
  const filteredAndSortedBusinesses = useMemo(() => {
    let filtered = businesses.filter(business => {
      const categoryMatch = selectedCategory === 'All Categories' || 
        business.categories?.name === selectedCategory;
      const locationMatch = selectedLocation === 'All Locations' || 
        business.location === selectedLocation;
      return categoryMatch && locationMatch;
    });

    // Sort businesses
    switch (sortBy) {
      case 'A–Z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Recently Added':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'Top Rated':
        // For now, just sort by name since we don't have ratings yet
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [businesses, selectedCategory, selectedLocation, sortBy]);

  const categoryOptions = ['All Categories', ...categories.map(cat => cat.name)];
  const sortOptions = ['A–Z', 'Recently Added', 'Top Rated'];

  if (businessesError) {
    return (
      <DefaultLayout>
        <Navbar />
        <div className="py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Business Directory</h1>
          <p className="text-red-600">Error loading businesses. Please try again later.</p>
        </div>
      </DefaultLayout>
    );
  }

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
            <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={categoriesLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation} disabled={businessesLoading}>
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

      {/* Loading State */}
      {businessesLoading && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Loading businesses...</p>
        </div>
      )}

      {/* Business Grid */}
      {!businessesLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {filteredAndSortedBusinesses.map((business) => (
            <BusinessCard
              key={business.id}
              imageUrl={business.logo_url || 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80'}
              name={business.name}
              location={business.location}
              category={business.categories?.name || 'Uncategorized'}
            />
          ))}
        </div>
      )}

      {/* No Results State */}
      {!businessesLoading && filteredAndSortedBusinesses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No businesses found matching your filters.</p>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Directory;
