import React from 'react';
import { Home, Menu, X } from 'lucide-react';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleHomeClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleGenerateClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  handleSignIn: () => void;
  handleSignUp: () => void; // Added handleSignUp prop
  handleGetStarted: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleHomeClick,
  handleGenerateClick,
  handleSignIn,
  handleSignUp,
  handleGetStarted,
}) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16"> {/* Increased height for better spacing */}
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-blue-600 rounded-lg p-1 mr-2">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-logo text-gray-900">archaI</span>
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium"> {/* Increased spacing with space-x-6 */}
            <a
              href="#home"
              onClick={handleHomeClick}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#Features"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#"
              onClick={handleGenerateClick}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors duration-200"
            >
              Generate
            </a>
            <a
              href="#Gallery"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors duration-200"
            >
              Gallery
            </a>
            <a
              href="#Pricing"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors duration-200"
            >
              Pricing
            </a>
            
            <div className="flex items-center space-x-6"> 
              <button
                onClick={handleSignIn}
                className="text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
              <button
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3"> {/* Increased vertical spacing with space-y-2 */}
          <a
            href="#home"
            onClick={handleHomeClick}
            className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#Features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#"
            onClick={handleGenerateClick}
            className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Generate
          </a>
          <a
            href="#Gallery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Gallery
          </a>
          <a
            href="#Pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Pricing
          </a>
          <button
            onClick={handleSignIn}
            className="w-full text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-left"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="w-full text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-left"
          >
            Sign Up
          </button>
          <button
            onClick={handleGetStarted}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-left"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;