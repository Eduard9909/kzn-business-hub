
import React, { useState } from 'react';
import { Menu, X, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/directory', label: 'Directory' },
  ];

  const authenticatedLinks = [
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              KZN Business Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            
            <SignedIn>
              {authenticatedLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </SignedIn>
            
            {/* Authentication buttons */}
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton>
                  <button className="text-gray-700 hover:text-primary font-medium transition-colors duration-200">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 font-medium transition-colors duration-200">
                    Register
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-700 hover:text-primary font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <SignedIn>
                {authenticatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-gray-700 hover:text-primary font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </SignedIn>
              
              {/* Mobile Authentication */}
              <div className="pt-3 border-t border-gray-100">
                <SignedOut>
                  <div className="space-y-2">
                    <SignInButton>
                      <button className="w-full text-left text-gray-700 hover:text-primary font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                        Login
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="w-full bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 font-medium transition-colors duration-200">
                        Register
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="px-3 py-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "h-8 w-8"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
