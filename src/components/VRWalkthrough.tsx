import React from 'react';
import { ArrowLeft, PersonStanding,PlayCircle,MousePointerSquare, Tablet, Headphones, Tv, Share2, Camera, Video, Settings, Check, Download, RotateCcw, Award, Users } from 'lucide-react';

interface VRWalkthroughProps {
  onReturnToHome: () => void;
}

const VRWalkthrough: React.FC<VRWalkthroughProps> = ({ onReturnToHome }) => {
  return (
    <div className="bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-800 text-white py-20 md:py-32">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `url(https://www.transparenttextures.com/patterns/cubes.png)` }}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            {/* You can add a decorative element here */}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">VR Walkthrough Experience</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
            Step inside your designs before they're built. Immersive virtual reality presentations that bring architectural visions to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-gray-100 flex items-center justify-center">
              <PlayCircle className="h-5 w-5 mr-2" />
              Start VR Demo
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-white hover:text-indigo-700 flex items-center justify-center">
              <Tv className="h-5 w-5 mr-2" />
              VR Requirements
            </button>
          </div>
        </div>
      </section>

      {/* VR Project Selection Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Choose Your VR Experience</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Select a project to begin your virtual reality walkthrough.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group">
              <img src="./pages/1.webp" alt="Modern Family Home" className="w-full h-auto object-cover" />
              <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">Residential</div>
              <div className="absolute bottom-4 left-4 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">VR Ready</div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Modern Family Home</h3>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-4">📐 3,200 sq ft</span>
                  <span>🛏️ 4 BR, 3.5 BA</span>
                </div>
                <button className="w-full px-6 py-3 bg-gray-200 text-slate-800 font-semibold rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                  Select Project
                </button>
              </div>
            </div>
            
            {/* Project Card 2 */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group">
              <img src="https://via.placeholder.com/800x600.png?text=Corporate+Office" alt="Corporate Office" className="w-full h-auto object-cover" />
              <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">Commercial</div>
              <div className="absolute bottom-4 left-4 bg-white text-green-600 text-xs font-bold px-3 py-1 rounded-full">VR Ready</div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Corporate Office</h3>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-4">📐 15,000 sq ft</span>
                  <span>🗂️ Open workspace</span>
                </div>
                <button className="w-full px-6 py-3 bg-gray-200 text-slate-800 font-semibold rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                  Select Project
                </button>
              </div>
            </div>

            {/* Project Card 3 (Selected) */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group ring-4 ring-purple-600">
              <img src="https://via.placeholder.com/800x600.png?text=Luxury+Villa" alt="Luxury Villa" className="w-full h-auto object-cover" />
              <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">Residential</div>
              <div className="absolute bottom-4 left-4 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">VR Ready</div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Luxury Villa</h3>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-4">📐 5,800 sq ft</span>
                  <span>🛏️ 6 BR, 4.5 BA</span>
                </div>
                <button className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-full transition-colors">
                  Selected
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VR Walkthrough Controls & Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-slate-50 rounded-2xl shadow-xl p-8 border border-gray-200">
            {/* Walkthrough View and Controls */}
            <div className="relative w-full h-96 bg-gray-800 rounded-xl mb-8 flex items-center justify-center">
              {/* This is a placeholder for the VR view */}
              <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(https://via.placeholder.com/1200x600.png?text=Interactive+VR+Walkthrough)`}}>
                <button className="bg-purple-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105">
                  Enter VR Mode
                </button>
              </div>
            </div>
            
            {/* Room Navigation and View Modes */}
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4">Room Navigation</h4>
              <div className="flex flex-wrap gap-2">
                <button className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium">Living Room</button>
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition">Kitchen</button>
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition">Master Bedroom</button>
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition">Bathroom</button>
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition">Exterior View</button>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-6 py-2 bg-white border border-gray-300 text-gray-800 rounded-full font-medium hover:bg-gray-100 transition">360° View</button>
                <button className="px-6 py-2 bg-white border border-gray-300 text-gray-800 rounded-full font-medium hover:bg-gray-100 transition">Free Walk</button>
              </div>
            </div>
            
            {/* Session Info and Share Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
                <div className="flex items-center justify-center mb-2">
                  <PlayCircle className="h-6 w-6 text-red-500 mr-2" />
                  <span className="font-semibold">Session Time</span>
                </div>
                <p className="text-sm text-gray-600">Not active</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-indigo-500 mr-2" />
                  <span className="font-semibold">Multi-User</span>
                </div>
                <p className="text-sm text-gray-600">Up to 8 participants</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-yellow-500 mr-2" />
                  <span className="font-semibold">Quality</span>
                </div>
                <p className="text-sm text-gray-600">High Definition</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="flex items-center px-6 py-3 bg-white text-gray-800 font-semibold rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <Share2 className="h-5 w-5 mr-2" />
                Share Session
              </button>
              <button className="flex items-center px-6 py-3 bg-white text-gray-800 font-semibold rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <Camera className="h-5 w-5 mr-2" />
                Take Screenshot
              </button>
              <button className="flex items-center px-6 py-3 bg-white text-gray-800 font-semibold rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <Video className="h-5 w-5 mr-2" />
                Record Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced VR Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Advanced VR Features</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Professional-grade virtual reality tools for architectural presentations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
                <RotateCcw className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Immersive Experience</h3>
              <p className="text-gray-600">Full 360° virtual reality walkthrough with realistic lighting and materials.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
                <PersonStanding className="h-10 w-10" /> 
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Natural Movement</h3>
              <p className="text-gray-600">Smooth walking navigation with teleportation and free movement options.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
                <Headphones className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Spatial Audio</h3>
              <p className="text-gray-600">3D audio effects that change based on room acoustics and materials.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
                <MousePointerSquare className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Interactive Elements</h3>
              <p className="text-gray-600">Touch and interact with furniture, lighting, and architectural features.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Multi-User Support</h3>
              <p className="text-gray-600">Share VR sessions with clients and team members simultaneously.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
                <Camera className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Capture & Share</h3>
              <p className="text-gray-600">Take screenshots and record videos during VR sessions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VR System Requirements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="lg:w-1/2 text-left pr-8 mb-12 lg:mb-0">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">VR System Requirements</h2>
            <p className="text-lg text-gray-600 mb-8">
              Compatible with leading VR headsets for the best experience.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-green-100 text-green-600 p-2 rounded-lg">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-800">Supported Headsets</h4>
                  <p className="text-gray-600">Meta Quest 2/3, HTC Vive, Valve Index, Pico 4</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-purple-100 text-purple-600 p-2 rounded-lg">
                  <Tv className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-800">PC Requirements</h4>
                  <p className="text-gray-600">GTX 1060/RTX 2060, 8GB RAM, USB 3.0</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Tablet className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-800">Mobile VR</h4>
                  <p className="text-gray-600">iOS/Android with WebXR support</p>
                </div>
              </div>
            </div>
          </div>
          {/* Images Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <img src="https://via.placeholder.com/600x400.png?text=VR+User+1" alt="VR user 1" className="rounded-xl shadow-lg w-full h-auto" />
            <img src="https://via.placeholder.com/600x400.png?text=VR+User+2" alt="VR user 2" className="rounded-xl shadow-lg w-full h-auto" />
            <img src="https://via.placeholder.com/600x400.png?text=VR+User+3" alt="VR user 3" className="rounded-xl shadow-lg w-full h-auto" />
            <img src="https://via.placeholder.com/600x400.png?text=VR+User+4" alt="VR user 4" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Transform Client Presentations?</h3>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
            Experience the future of architectural visualization with immersive VR walkthroughs
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-gray-100">
              Create VR Project
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-white hover:text-indigo-700">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default VRWalkthrough;
