// src/components/Footer.tsx
import React from 'react';
import { Home, Github, Twitter, Linkedin, Mail } from 'lucide-react';


interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex-shrink-0 flex items-center mb-4">
              <div className="bg-blue-600 rounded-lg p-1 mr-2">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-logo text-white-500">archaI</span>
            </div>
            <p className="text-gray-400 mb-4 font-logo">
              Revolutionizing architectural design with AI-powered tools <br/> for professionals worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-logo">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => onNavigate('features')} className="hover:text-white transition-colors font-logo">Features</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors font-logo">Pricing</button></li>
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors font-logo">Gallery</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-logo">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors font-logo">About</button></li>
              <li><button onClick={() => onNavigate('careers')} className="hover:text-white transition-colors font-logo">Careers</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors font-logo">Contact Us</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors font-logo">Blog</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-logo">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => onNavigate('docs')} className="hover:text-white transition-colors font-logo">Documentation</button></li>
              <li><button onClick={() => onNavigate('help')} className="hover:text-white transition-colors font-logo">Help Center</button></li>
              <li><button onClick={() => onNavigate('community')} className="hover:text-white transition-colors font-logo">Community</button></li>
              <li><button onClick={() => onNavigate('status')} className="hover:text-white transition-colors font-logo">Status</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 font-logo">
          <div className="flex justify-between items-center">
            <p>&copy; 2025 All rights reserved for <span className='text-blue-500'>archaI</span></p>
            <ul className="flex gap-6 transition-colors">
              <li><button onClick={() => onNavigate('privacy-policy')} className="hover:text-white">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms-of-service')} className="hover:text-white">Terms of Service</button></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
