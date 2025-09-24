import React from 'react';

interface CTAProps {
  handleGetStarted: () => void;
}

const CTA: React.FC<CTAProps> = ({ handleGetStarted }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 font-logo">
          Ready to Transform Your Design Process?
        </h2>
        <p className="text-xl text-blue-100 mb-8 font-logo">
          Join thousands of architects and engineers using AI to create better designs faster
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 font-logo py-3 rounded-lg text-lg hover:bg-blue-700 hover:text-white font-medium transition-colors"
          >
            Start Free Trial
          </button>
          <button className="border border-blue-300 hover:border-white font-logo text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;