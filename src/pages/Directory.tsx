
import React from 'react';
import DefaultLayout from '../components/layout/DefaultLayout';
import Navbar from '../components/navigation/Navbar';

const Directory: React.FC = () => {
  return (
    <DefaultLayout>
      <Navbar />
      <div className="py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Business Directory</h1>
        <p className="text-lg text-gray-600">Browse all businesses in KwaZulu-Natal</p>
        <div className="mt-8 text-gray-500">
          Directory page coming soon...
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Directory;
