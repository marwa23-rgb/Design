import React from 'react';
import { LucideIcon, Layers, Ruler, Home, Wand, Palette, FileText, Square } from 'lucide-react';

interface FeatureItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

const features: FeatureItem[] = [
    {
        icon: Home,
        title: 'Interior & Exterior Design',
        description: 'Effortlessly reimagine interior and exterior spaces with a diverse range of styles and aesthetics, bringing your vision to life.'
    },
    {
        icon: Wand,
        title: 'Sketch to Image',
        description: 'Transform your hand-drawn sketches or CAD plans into stunning, fully rendered architectural visualizations.'
    },
    {
        icon: Palette,
        title: 'Plan to Plot',
        description: "Enter your plot's dimensions and let our AI generate the optimal 2D floor plan layout for your space."
    },
    {
        icon: Ruler,
        title: '2D Floor Plan to 3D',
        description: 'Convert two-dimensional floor plans into breathtakingly detailed and realistic 3D models.'
    },
    {
        icon: Layers,
        title: 'Masterplan & Landscape',
        description: 'Visualize masterplans and landscape designs in seconds, powered by advanced artificial intelligence.'
    },
    {
        icon: FileText,
        title: 'Text to Render',
        description: 'Generate intricate architectural and interior designs by simply describing your vision with text prompts.'
    }

];

const Features: React.FC = () => {
    return (
        <section id='Features' className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 via-gray-100/20 to-gray-50 font-sans">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                .font-sans {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
                        Everything You Need for
                        <span className="text-blue-600 block mt-2">Professional Architectural Design</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Our intelligent platform provides architects and engineers with all the tools they need to create, modify, and perfect their designs with unprecedented speed and accuracy.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl shadow-md bg-white hover:shadow-lg transition-transform hover:-translate-y-1"
                        >
                            <div className="relative mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-base">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
