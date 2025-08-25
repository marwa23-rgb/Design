// src/components/AdvancedFeatures.tsx
import React from 'react';
import { LucideIcon, RotateCcw, Box, Sun, Palette } from 'lucide-react';

interface AdvancedFeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AdvancedFeaturesProps {
  advancedFeatures: AdvancedFeatureItem[];
}

const AdvancedFeatures: React.FC<AdvancedFeaturesProps> = ({ advancedFeatures }) => {
  return (
    <section id="advanced-features" className="py-20 bg-gradient-to-b from-indigo-50 via-indigo-100/20 to-indigo-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Advanced <span className="bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">Visualization</span> Capabilities
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advancedFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition-transform hover:-translate-y-1 text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;