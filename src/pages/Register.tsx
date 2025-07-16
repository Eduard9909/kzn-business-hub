
import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import DefaultLayout from '../components/layout/DefaultLayout';
import Navbar from '../components/navigation/Navbar';

const Register: React.FC = () => {
  return (
    <DefaultLayout>
      <Navbar />
      <div className="py-16 flex justify-center">
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              card: "shadow-lg"
            }
          }}
        />
      </div>
    </DefaultLayout>
  );
};

export default Register;
