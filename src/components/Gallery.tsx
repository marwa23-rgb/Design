import React from 'react';
import { ArrowRight, Layers, Image, Plus, PenTool } from 'lucide-react';

import video2 from '../pages/ai-scenario-changer.mp4';
import video3 from '../pages/exterior_renovator.mp4';
import video4 from '../pages/interior-remodel.mp4';
import video6 from '../pages/texturelock-rendering.mp4';
import video8 from '../pages/sketch.mp4';

const Gallery = () => {
    // Replaced local video imports with public URLs to ensure the application runs correctly.
    const designs = [
        {
            title: "Interior Design",
            videoUrl: video4,
            description: "Upload a sketch or model to redesign your interior space with magical styles"
        },
        {
            title: "Exterior Design",
            videoUrl:video3,
            description: "Upload a sketch or model to redesign your exterior space with many unique styles"
        },
        {
            title: "Remodel Design",
            videoUrl: video2,
            description: "Transform your Design with AI-powered Style Transfer Render. Upload a photo, select a style, and see the magic happen"
        },
        {
            title: "Virtual Staging AI",
            videoUrl: video4,
            description: "Reimagine your home with AI-powered Virtual Staging. Upload a photo, select a style, and transform interiors instantly"
        },
        {
            title: "Sketch to Image",
            videoUrl: video8,
            description: "Turn your architecture sketches or CAD into fully rendered shots with AI"
        },
        {
            title: "Render Enhancer",
            videoUrl: video6,
            description: "Enhance Lumion, Enscape, vray, SketchUp or Revit renders & upscale low quality renders up to 4k"
        },
        {
            title: "Masterplan AI",
            description: "Visualize 2D plans and masterplans in seconds",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architects-working-on-a-blueprint-in-a-modern-office-5775-large.mp4"
        },
        {
            title: "Landscape AI",
            description: "Generate stunning landscape designs with AI",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architect-working-in-an-office-5774-large.mp4"
        },
        {
            title: "Imagine AI",
            description: "A powerful text-to-render architecture render tool. Quickly visualize your inspirations and imagine architecture and interior designs using text prompts for your next project.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-using-a-laptop-at-the-office-30919-large.mp4"
        },
        {
            title: "Edit & Modify",
            description: "Modify part of your design while maintaining the rest of your design using AI inpainting canvas.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-businesswoman-working-at-a-desk-3928-large.mp4"
        },
        {
            title: "2D Floor Plan to 3D Model",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-a-shot-of-the-city-of-madrid-2845-large.mp4",
            description: "Convert 2D floor plans into stunning 3D models with ease"
        },
        {
            title: 'Plan to Plot',
            description: "Enter your plot's dimensions and let our AI generate the optimal 2D floor plan layout for your space.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architect-studying-a-plan-on-a-tablet-454-large.mp4"
        }
    ];

    return (
        <section id="Gallery" className="py-20 bg-gray-50 font-sans">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                .font-sans {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
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
                                <video
                                    className="w-full h-64 object-cover"
                                    src={design.videoUrl}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {design.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {design.description}
                                </p>
                                <a
                                    href="/dashboard"
                                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Try {design.title}
                                    <span className="ml-2 w-4 h-4">
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
