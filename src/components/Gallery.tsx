import React from 'react';
import { ArrowRight } from 'lucide-react';
import video2 from '../pages/ai-scenario-changer.mp4';
import video3 from '../pages/exterior_renovator.mp4';
import video4 from '../pages/interior-remodel.mp4';
import video5 from '../pages/panorama.mp4';
import video6 from '../pages/texturelock-rendering.mp4';
import video8 from '../pages/sketch.mp4';
import video7 from '../pages/namee.mp4';
import video10 from '../pages/107.jpg';

const Gallery: React.FC = () => {
  const designs = [
    { title: "Interior Design", mediaUrl: video10, type: "image", description: "Upload a sketch or model to redesign your interior space with magical styles"},
    { title: "Exterior Design", mediaUrl: video3, type: "video", description: "Upload a sketch or model to redesign your exterior space with many unique styles"},
    { title: "Remodel Design", mediaUrl: video2, type: "video", description:"Transform your Design with AI-powered Style Transfer Render. Upload a photo, select a style, and see the magic happen" },
    { title: "Virtual Staging AI", mediaUrl: video4, type: "video", description: "Reimagine your home with AI-powered Virtual Staging. Upload a photo, select a style, and transform interiors instantly"},
    { title: "Sketch to Image", mediaUrl: video8, type: "video", description: "Turn your architecture sketches or CAD into fully rendered shots with AI" },    
    { title: "Render Enhancer", mediaUrl: video6, type: "video", description: "Enhance Lumion, Enscape, vray, SketchUp or Revit renders & upscale low quality renders up to 4k" },
    { title: "VR Immersive Experience", mediaUrl: video5, type: "video", description: "Create stunning 360-degree panoramic views of your designs with ease" },
    { title: "2D Floor Plan to 3D Model", mediaUrl: video7, type: "video", description: "Convert 2D floor plans into stunning 3D models with ease" }
  ];

  return (
    <section id="Gallery" className="py-20 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-4">
            AI-Generated Designs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our AI can create for different spaces and requirements.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {designs.map((design, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative">
                {design.type === "video" ? (
                  <video
                    className="w-full h-64 object-cover"
                    src={design.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    className="w-full h-64 object-cover"
                    src={design.mediaUrl}
                    alt={design.title}
                  />
                )}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {design.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {design.description}
                </p>
                <a
                  href="#"
                  className="text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-200"
                >
                  View Details
                  <span className="ml-2 w-5 h-5">
                    <ArrowRight />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
