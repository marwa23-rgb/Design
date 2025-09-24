import React from 'react';
import { Users, Award, Star } from 'lucide-react';

const SocialProof: React.FC = () => {
  return (
    <section className="py-3 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold font-logo text-blue-700 mb-4">Trusted by Professionals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 mb-4 shadow-md hover:shadow-lg transition-shadow">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700">10,000+</div>
              <div className="text-gray-800 font-logo">Active Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-4 mb-4 shadow-md hover:shadow-lg transition-shadow">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700">500,000+</div>
              <div className="text-gray-800 font-logo">Designs Generated</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 rounded-full p-4 mb-4 shadow-md hover:shadow-lg transition-shadow">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700">4.9/5</div>
              <div className="text-gray-800 font-logo">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;