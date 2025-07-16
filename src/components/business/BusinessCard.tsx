
import React from 'react';
import { MapPin, Tag, Eye } from 'lucide-react';

interface BusinessCardProps {
  imageUrl: string;
  name: string;
  location: string;
  category: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  imageUrl,
  name,
  location,
  category,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Business Image */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Business Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
            {name}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Tag className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{category}</span>
          </div>
        </div>

        {/* View Button */}
        <button className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center group">
          <Eye className="h-4 w-4 mr-2" />
          View Business
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;
