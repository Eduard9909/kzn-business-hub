
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { useUserBusiness, type BusinessFormData } from '@/hooks/useUserBusiness';

// KZN towns/cities
const KZN_LOCATIONS = [
  'Durban',
  'Pietermaritzburg',
  'Newcastle',
  'Richards Bay',
  'Empangeni',
  'Ladysmith',
  'Dundee',
  'Vryheid',
  'Estcourt',
  'Kokstad',
  'Port Shepstone',
  'Pinetown',
  'Chatsworth',
  'Umlazi',
  'Phoenix',
  'Verulam',
  'Stanger',
  'Eshowe',
  'Mtubatuba',
  'Other'
];

const BusinessForm: React.FC = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { 
    business, 
    isLoading: businessLoading, 
    createBusiness, 
    updateBusiness, 
    isCreating, 
    isUpdating 
  } = useUserBusiness();

  const [formData, setFormData] = useState<BusinessFormData>({
    name: '',
    description: '',
    location: '',
    category_id: '',
    logo_url: ''
  });

  // Pre-fill form if business exists
  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name,
        description: business.description || '',
        location: business.location,
        category_id: business.category_id || '',
        logo_url: business.logo_url || ''
      });
    }
  }, [business]);

  const handleInputChange = (field: keyof BusinessFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.category_id) {
      return;
    }

    if (business) {
      updateBusiness(formData);
    } else {
      createBusiness(formData);
    }
  };

  const isSubmitting = isCreating || isUpdating;

  if (businessLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-center text-gray-600">Loading your business information...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {business ? 'Update Your Business Listing' : 'Create Your Business Listing'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="business-name">Business Name *</Label>
            <Input
              id="business-name"
              placeholder="Enter your business name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Select 
              value={formData.location} 
              onValueChange={(value) => handleInputChange('location', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your location" />
              </SelectTrigger>
              <SelectContent>
                {KZN_LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category_id} 
              onValueChange={(value) => handleInputChange('category_id', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your business category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesLoading ? (
                  <SelectItem value="" disabled>Loading categories...</SelectItem>
                ) : (
                  categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your business and services..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <Label htmlFor="logo-url">Logo URL (Optional)</Label>
            <Input
              id="logo-url"
              placeholder="https://example.com/logo.jpg"
              value={formData.logo_url}
              onChange={(e) => handleInputChange('logo_url', e.target.value)}
              type="url"
            />
          </div>

          <div>
            <Label>Logo Upload (Coming Soon)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Logo upload will be available soon</p>
              <p className="text-xs text-gray-500 mt-1">For now, you can provide a logo URL above</p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {business ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              business ? 'Update Business Listing' : 'Create Business Listing'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessForm;
