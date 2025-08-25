// src/components/Gallery.tsx
import React from 'react';
import { Settings, ArrowRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const designs = [
    { title: "Detailed 2D Sketch", dims: "2,400 sq ft", rooms: "4 BR, 3 BA" },
    { title: "3D Floor Plan View", dims: "800 sq ft", rooms: "2 BR, 1 BA" },
    { title: "Colored 2D Section", dims: "3,200 sq ft", rooms: "5 Zones" },
    { title: "3D Exterior Rendering", dims: "4,800 sq ft", rooms: "5 BR, 4 BA" },
    { title: "VR Immersive Experience", dims: "600 sq ft", rooms: "1 BR, 1 BA" },
    { title: "Photorealistic Exterior Render", dims: "2,000 sq ft", rooms: "4 Sections" }
  ];

  return (
    <section id="Gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 font-logo">AI-Generated Designs</h2>
          <p className="text-lg text-gray-600 font-logo">See what our AI can create for different spaces and requirements</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 font-logo">
          {designs.map((design, index) => (
            <div key={index} className="bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-lg opacity-60 flex items-center justify-center">
                  <Settings className="h-8 w-8 text-gray-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors font-logo">
                  {design.title}
                </h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3 font-logo">
                  <span>{design.dims}</span>
                  <span>{design.rooms}</span>
                </div>
                <button className="text-blue-600 font-logo hover:text-blue-700 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
                  View Details <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;