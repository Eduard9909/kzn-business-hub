
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import DefaultLayout from '../components/layout/DefaultLayout';
import Navbar from '../components/navigation/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart3, Eye, MousePointer, Upload } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [businessData, setBusinessData] = useState({
    name: '',
    location: '',
    category: '',
    description: ''
  });

  if (!isLoaded) {
    return (
      <DefaultLayout>
        <Navbar />
        <div className="py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (!user) {
    return (
      <DefaultLayout>
        <Navbar />
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You must be signed in to view this page.</p>
        </div>
      </DefaultLayout>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <DefaultLayout>
      <Navbar />
      
      {/* Welcome Header */}
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to your Dashboard
        </h1>
        <p className="text-gray-600">
          Hello {user.firstName || user.emailAddresses[0]?.emailAddress || 'User'}! 
          Manage your business listing and track your performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
        {/* Business Info Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                placeholder="Enter your business name"
                value={businessData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={businessData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="durban">Durban</SelectItem>
                  <SelectItem value="pietermaritzburg">Pietermaritzburg</SelectItem>
                  <SelectItem value="newcastle">Newcastle</SelectItem>
                  <SelectItem value="richards-bay">Richards Bay</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={businessData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food-drink">Food & Drink</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="beauty-wellness">Beauty & Wellness</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="home-garden">Home & Garden</SelectItem>
                  <SelectItem value="professional-services">Professional Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your business..."
                value={businessData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <Button className="w-full">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Image Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Business Images
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Upload your business photos</p>
              <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 10MB</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose Files
                </Button>
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Image upload functionality will be available once backend is connected.
            </p>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                    <p className="text-sm text-gray-500">This week</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MousePointer className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Search Clicks</p>
                    <p className="text-2xl font-bold text-gray-900">14</p>
                    <p className="text-sm text-gray-500">This week</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Listing Rank</p>
                    <p className="text-2xl font-bold text-gray-900">#7</p>
                    <p className="text-sm text-gray-500">In category</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
