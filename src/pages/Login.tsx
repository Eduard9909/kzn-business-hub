
import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import DefaultLayout from '../components/layout/DefaultLayout';
import Navbar from '../components/navigation/Navbar';

const Login: React.FC = () => {
  return (
    <DefaultLayout>
      <Navbar />
      <div className="py-16 flex justify-center">
        <SignIn 
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

export default Login;
