// src/components/Navbar.tsx
import React from 'react';
import { Home, Menu, X } from 'lucide-react';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleHomeClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleGenerateClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  handleVRWalkthroughClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  handleSignIn: () => void;
  handleGetStarted: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleHomeClick,
  handleGenerateClick,
  handleVRWalkthroughClick,
  handleSignIn,
  handleGetStarted,
}) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-blue-600 rounded-lg p-1 mr-2">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-logo text-gray-900">archaI</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-4 text-gray-700 font-medium">
            <a href="#home" onClick={handleHomeClick} className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors">Home</a>
            <a href="#Features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors">Features</a>
            <a href="#" onClick={handleGenerateClick} className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors">Generate</a>
            <a href="#" onClick={handleVRWalkthroughClick}  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors">VR Walkthrough</a>
            <a href="#Gallery" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors">Gallery</a>
            <a href="#Pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors">Pricing</a>
            <div className="flex space-x-4">
              <button
                onClick={handleSignIn}
                className="hover:bg-blue-600 hover:text-white hover:rounded-lg text-blue-600 px-3 py-2 text-md font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-md font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
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
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#home" onClick={handleHomeClick} className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors">Home</a>
          <a href="#Features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors">Features</a>
          <a href="#" onClick={handleGenerateClick} className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors">Generate</a>
          <a href="#" onClick={handleVRWalkthroughClick} className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors">VR Walkthrough</a>
          <a href="#Gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors">Gallery</a>
          <a href="#Pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors">Pricing</a>
          <button onClick={handleSignIn} className="text-gray-700 hover:bg-gray-50 hover:text-blue-500 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors">
            Sign In
          </button>
          <button onClick={handleGetStarted} className="w-full text-left bg-blue-600 hover:bg-blue-800 text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;