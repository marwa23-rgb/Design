import React, { useState, useEffect, memo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { loadStripe } from '@stripe/stripe-js';

// Placeholder video URL for the gallery items
const galleryVideoUrl = "https://cdn.glitch.global/03c27e99-4787-43c3-ae31-3147814b600f/placeholder-video.mp4";

// Inline SVG icons to replace external libraries
const Icon = ({ className, children, onClick }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} onClick={onClick}>{children}</svg>
);
const House = (props) => <Icon {...props}><path d="M12 2L2 7.5v11.5A2.5 2.5 0 0 0 4.5 21h15A2.5 2.5 0 0 0 22 19V7.5L12 2z"></path><path d="M16 11H8V21H16z"></path><path d="M12 5V2"></path></Icon>;
const Camera = (props) => <Icon {...props}><path d="M18.8 4.6l-2.4 2.4-1.6-1.6L16.4 3a2 2 0 0 1 2.8 0z"></path><path d="M18.8 4.6L12 11.4l-3.2 3.2c-.4.4-1.2.4-1.6 0L2.4 9.2c-.4-.4-.4-1.2 0-1.6l3.2-3.2c.4-.4 1.2-.4 1.6 0l5.8 5.8"></path></Icon>;
const Layers = (props) => <Icon {...props}><path d="M12 2l-8 4.5-8 4.5 8 4.5 8-4.5-8-4.5-8-4.5v14l8 4.5 8-4.5V6.5"></path><path d="M22 6l-10-6-10 6"></path><path d="M22 18l-10 6-10-6"></path></Icon>;
const Image = (props) => <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L6 21"></path></Icon>;
const PenTool = (props) => <Icon {...props}><path d="M12 19.5L18.5 13 19 13.5 12.5 20 6 13.5 6.5 13"></path><path d="M5 20l7-7 7 7"></path></Icon>;
const Plus = (props) => <Icon {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></Icon>;
const X = (props) => <Icon {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>;
const Upload = (props) => <Icon {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></Icon>;
const Loader = (props) => <Icon {...props}><path d="M12 2A10 10 0 0 1 22 12A10 10 0 0 1 2 12"></path></Icon>;
const CheckCircle = (props) => <Icon {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-8.8"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></Icon>;
const ArrowRight = (props) => <Icon {...props}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></Icon>;
const LogOut = (props) => <Icon {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></Icon>;
const Check = (props) => <Icon {...props}><polyline points="20 6 9 17 4 12"></polyline></Icon>;
const User = (props) => <Icon {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></Icon>;
const CreditCard = (props) => <Icon {...props}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></Icon>;
const TrendingUp = (props) => <Icon {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></Icon>;

const features = [
    {
        title: "Interior Design",
        description: "Upload a sketch or model to redesign your interior space with magical styles.",
        icon: House,
        cta: "Redesign your Interior",
        type: "interior",
        videoUrl: galleryVideoUrl
    },
    {
        title: "Exterior Design",
        description: "Upload a sketch or model to redesign your exterior space with many unique styles.",
        icon: House,
        cta: "Redesign your Exterior",
        type: "exterior",
        videoUrl: galleryVideoUrl
    },
    {
        title: "Remodel Design",
        description: "Transform your Design with AI-powered Style Transfer Render. Upload a photo, select a style, and see the magic happen.",
        icon: Camera,
        cta: "Remodel with AI",
        type: "remodel",
        videoUrl: galleryVideoUrl
    },
    {
        title: "Virtual Staging AI",
        description: "Reimagine your home with AI-powered Virtual Staging. Upload a photo, select a style, and transform interiors instantly.",
        icon: Layers,
        cta: "Stage your Home",
        type: "staging",
        videoUrl: galleryVideoUrl
    },
    {
        title: "Sketch to Image",
        description: "Turn your architecture sketches or CAD into fully rendered shots with AI.",
        icon: PenTool,
        cta: "Render your Sketch",
        type: "sketch",
        videoUrl: galleryVideoUrl
    },
    {
        title: "Render Enhancer",
        description: "Enhance Lumion, Enscape, vray, SketchUp or Revit renders & upscale low quality renders up to 4k.",
        icon: Image,
        cta: "Enhance your Render",
        type: "enhance",
        videoUrl: galleryVideoUrl
    },
    {
        title: "Masterplan AI",
        description: "Visualize 2D plans and masterplans in seconds",
        icon: Layers,
        cta: "Visualize Masterplan",
        type: "masterplan",
        videoUrl: galleryVideoUrl
    },
    {
        title: "Landscape AI",
        description: "Generate stunning landscape designs with AI",
        icon: Image,
        cta: "Generate Landscape",
        type: "landscape",
        videoUrl: galleryVideoUrl
    },
    {
        title: "Imagine AI",
        description: "A powerful text-to-render architecture render tool. Quickly visualize your inspirations and imagine architecture and interior designs using text prompts for your next project.",
        icon: Plus,
        cta: "Imagine with AI",
        type: "imagine",
        videoUrl: galleryVideoUrl
    },
    {
        title: "Edit & Modify",
        description: "Modify part of your design while maintaining the rest of your design using AI inpainting canvas.",
        icon: PenTool,
        cta: "Edit your Design",
        type: "edit",
        videoUrl: galleryVideoUrl
    }
];

const styles = [
    "Minimalist",
    "Modern",
    "Industrial",
    "Bohemian",
    "Scandinavian",
    "Rustic",
    "Art Deco",
    "Coastal",
    "Mid-Century Modern",
    "Traditional",
    "Transitional",
    "Farmhouse",
    "Contemporary",
    "Eclectic"
];

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Skeleton Loader Component
const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="h-64 bg-gray-200 rounded-2xl"></div>
            ))}
        </div>
    </div>
);

// Gallery Component (memoized for performance)
const Gallery = memo(({ onSelectFeature }) => {
    return (
        <section id="gallery" className="py-20 bg-gray-50 font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                        AI-Generated Designs
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See what our AI can create for different spaces and requirements.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="relative">
                                <video
                                    className="w-full h-64 object-cover"
                                    src={feature.videoUrl}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {feature.description}
                                </p>
                                <button
                                    onClick={() => onSelectFeature(feature)}
                                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Try {feature.title}
                                    <span className="ml-2 w-4 h-4">
                                        <ArrowRight />
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

// HomePage Component
const HomePage = ({ onSelectFeature }) => {
    return (
        <main>
            <section className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                        Reimagine Your World, <br /> One Design at a Time
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                        Transform your architectural concepts into stunning realities with AI-powered design tools. From a simple sketch to a complex render, your imagination is the only limit.
                    </p>
                    <a href="#gallery" className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                        Explore All Features
                    </a>
                </div>
            </section>
            <Gallery onSelectFeature={onSelectFeature} />
        </main>
    );
};

const FeatureModal = ({ feature, onClose, onGenerate, errorMessage, status, generatedImageUrl, uploadedImage, setUploadedImage }) => {
    const [selectedStyle, setSelectedStyle] = useState('');
    const [promptText, setPromptText] = useState('');

    const requiresImageUpload = ['staging', 'remodel', 'interior', 'exterior', 'sketch', 'enhance', 'landscape', 'masterplan', 'edit'].includes(feature.type);
    const requiresTextPrompt = ['imagine', 'edit'].includes(feature.type);
    const requiresStyleSelection = !requiresTextPrompt && feature.type !== 'enhance';

    const isGenerateDisabled = (requiresImageUpload && !uploadedImage) || (requiresTextPrompt && !promptText) || status === 'generating' || promptText.length > 200;

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
            setErrorMessage("Image size exceeds 5MB limit.");
            return;
        }
        setUploadedImage(file);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-lg max-w-2xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-2">
                    <X className="h-6 w-6" />
                </button>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{feature.title}</h2>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                </div>

                <div className="space-y-6">
                    {requiresImageUpload && (
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">
                                Upload a photo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full text-gray-700 bg-gray-100 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {uploadedImage && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Image Preview:</h3>
                                    <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded preview" className="w-full h-auto rounded-xl shadow-md" />
                                </div>
                            )}
                        </div>
                    )}
                    {requiresTextPrompt && (
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">
                                Enter your design prompt (max 200 characters)
                            </label>
                            <textarea
                                value={promptText}
                                onChange={(e) => setPromptText(e.target.value.slice(0, 200))}
                                rows="4"
                                className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors"
                                placeholder="e.g., A minimalist living room with a large window overlooking a forest."
                            />
                            <p className="text-sm text-gray-500 mt-1">{promptText.length}/200 characters</p>
                        </div>
                    )}
                    {requiresStyleSelection && (
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">
                                Select a Style
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {styles.map(style => (
                                    <button
                                        key={style}
                                        onClick={() => setSelectedStyle(style)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedStyle === style ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {generatedImageUrl ? (
                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Your Generated Design:</h3>
                        <img
                            src={generatedImageUrl}
                            alt="Generated architectural design"
                            className="w-full h-auto rounded-xl shadow-lg"
                        />
                    </div>
                ) : (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => onGenerate(feature, selectedStyle, uploadedImage, promptText)}
                            disabled={isGenerateDisabled}
                            className={`px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform ${isGenerateDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'}`}
                        >
                            {status === 'generating' ? (
                                <span className="flex items-center">
                                    <Loader className="animate-spin h-5 w-5 mr-2" />
                                    Generating...
                                </span>
                            ) : status === 'success' ? (
                                <span className="flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-2" />
                                    Done!
                                </span>
                            ) : (
                                "Generate Design"
                            )}
                        </button>
                    </div>
                )}
                {errorMessage && <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>}
            </div>
        </div>
    );
};

const DesignCard = ({ design }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
            <h4 className="text-xl font-bold text-gray-900">{design.feature_title}</h4>
            <p className="text-gray-600 text-sm mt-1">
                Generated: {design.created_at ? new Date(design.created_at).toLocaleString() : 'Pending...'}
            </p>
            {design.image_url && (
                <img src={design.image_url} alt={design.feature_title} className="w-full h-auto mt-4 rounded-lg" />
            )}
        </div>
    );
};

const DashboardPage = ({ designs, authReady }) => {
    return (
        <section id="my-designs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                        My Generated Projects
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Your past creations, saved for you.
                    </p>
                </div>
                {!authReady ? (
                    <SkeletonLoader />
                ) : designs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {designs.map((design) => <DesignCard key={design.id} design={design} />)}
                    </div>
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        You haven't generated any designs yet.
                    </div>
                )}
            </div>
        </section>
    );
};

const PlanCard = ({ title, price, description, features, isPopular, onGetStarted }) => (
    <div className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow ${isPopular ? 'border-2 border-blue-500 relative' : 'hover:border-2 hover:border-blue-500'}`}>
        {isPopular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-md font-large font-logo">Most Popular</span>
            </div>
        )}
        <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-logo">{title}</h3>
            <p className="text-gray-600 font-logo mb-4">{description}</p>
            <div className="text-4xl font-bold font-logo text-gray-900 mb-1">${price}<span className="text-lg font-medium text-gray-600">/mo</span></div>
            <p className="text-gray-500 text-sm">billed monthly</p>
        </div>
        <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 font-logo" />
                    {feature}
                </li>
            ))}
        </ul>
        <button
            onClick={() => onGetStarted({ title, price })}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors font-logo"
        >
            Subscribe Now
        </button>
    </div>
);

const PricingPage = ({ onGetStarted }) => {
    const plans = [
        {
            title: "Basic Plan",
            price: 19,
            description: "Explore AI tools to elevate your design workflow.",
            features: ["1,000 Credits", "100 Designs", "12 Videos", "200 text-to-render designs", "High resolution designs", "Save generated designs", "4K Upscaling", "Commercial use"],
            isPopular: false,
        },
        {
            title: "Pro Plan",
            price: 39,
            description: "Generate amazing designs and visuals at a fraction of the cost.",
            features: ["5,000 Credits", "500 Designs", "65 Videos", "1000 text-to-render designs", "High resolution designs", "Save generated designs", "4K Upscaling", "Commercial use"],
            isPopular: true,
        },
        {
            title: "Expert Plan",
            price: 79,
            description: "Optimize your design workflow and serve your clients fast.",
            features: ["10,000 Credits", "1,000 Designs", "130 Videos", "2000 text-to-render designs", "High resolution designs", "Save generated designs", "4K Upscaling", "Commercial use"],
            isPopular: false,
        },
    ];

    return (
        <section id="pricing" className="py-20 bg-gray-50 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-logo text-blue-700 mb-4">Choose Your Plan</h2>
                    <p className="text-lg text-gray-600 font-logo">Select the perfect plan for your architectural design needs</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <PlanCard key={index} {...plan} onGetStarted={onGetStarted} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProfilePage = ({ userProfile, designsCount }) => {
    if (!userProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
                <div className="animate-pulse space-y-4">
                    <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
            </div>
        );
    }
    const totalCredits = userProfile.credits || 1000; // Default to Basic Plan credits
    const remainingCredits = totalCredits - designsCount;
    const creditsUsedPercentage = (designsCount / totalCredits) * 100;

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-8">
                    <img
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-6 md:mb-0 md:mr-8 border-4 border-blue-500 shadow-md"
                        src={userProfile.avatar_url || "https://placehold.co/150x150/e0e0e0/ffffff?text=User"}
                        alt="User Profile"
                    />
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{userProfile.username || "Anonymous User"}</h2>
                        <p className="text-lg text-gray-600">{userProfile.email || "No email provided"}</p>
                        <p className="text-sm text-gray-500 mt-2">User ID: {userProfile.id}</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><CreditCard className="w-5 h-5 mr-2" />Subscription Plan</h3>
                        <p className="text-lg font-semibold text-gray-700">{userProfile.subscription_plan || "Basic Plan"}</p>
                        <p className="text-gray-500 text-sm mt-1">Status: Active</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><TrendingUp className="w-5 h-5 mr-2" />Usage & Limits</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-gray-700">Designs Generated</span>
                                    <span className="font-semibold text-gray-900">{designsCount} / {totalCredits}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${creditsUsedPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-gray-700">Remaining Designs</span>
                                    <span className="font-semibold text-gray-900">{remainingCredits}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [authReady, setAuthReady] = useState(false);
    const [user, setUser] = useState(null);
    const [designs, setDesigns] = useState([]);
    const [status, setStatus] = useState('initial');
    const [errorMessage, setErrorMessage] = useState('');
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    // Initialize Stripe
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'your-publishable-key');

    // Validate Supabase configuration
    useEffect(() => {
        if (!supabaseUrl || !supabaseKey) {
            setErrorMessage("Supabase configuration is missing. Please contact support.");
            return;
        }

        // Supabase Auth state listener
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setUser(session?.user || null);
                if (session?.user) {
                    // Fetch or create user profile
                    const fetchOrCreateProfile = async () => {
                        const { data, error } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', session.user.id)
                            .single();

                        if (error && error.code === 'PGRST116') {
                            // Profile doesn't exist, create one
                            const newProfile = {
                                id: session.user.id,
                                username: session.user.user_metadata?.username || "Anonymous User",
                                email: session.user.email || "No email provided",
                                avatar_url: session.user.user_metadata?.avatar_url || null,
                                subscription_plan: 'basic',
                                credits: 1000,
                                created_at: new Date().toISOString(),
                            };
                            await supabase.from('profiles').insert([newProfile]);
                            setUserProfile(newProfile);
                        } else if (data) {
                            setUserProfile(data);
                        } else {
                            setErrorMessage("Failed to load profile. Please try again.");
                        }
                    };
                    fetchOrCreateProfile();
                }
                setAuthReady(true);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setUserProfile(null);
                setAuthReady(true);
            }
        });

        // Anonymous sign-in or custom token
        const initializeAuth = async () => {
            try {
                const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
                if (initialAuthToken) {
                    await supabase.auth.signInWithIdToken({
                        provider: 'custom',
                        token: initialAuthToken,
                    });
                } else {
                    await supabase.auth.signInAnonymously();
                }
            } catch (error) {
                console.error("Auth error:", error);
                setErrorMessage("Authentication failed. Please try again.");
            }
        };
        initializeAuth();

        // Timeout for auth
        const timeout = setTimeout(() => {
            if (!authReady) {
                setErrorMessage("Authentication timeout. Please refresh the page.");
            }
        }, 10000);

        return () => {
            authListener.subscription.unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    // Fetch designs with pagination
    useEffect(() => {
        if (!user || !authReady) return;

        const fetchDesigns = async () => {
            try {
                const { data, error } = await supabase
                    .from('designs')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(10);

                if (error) throw error;
                setDesigns(data || []);
            } catch (error) {
                console.error("Error fetching designs:", error);
                setErrorMessage("Failed to load designs. Please try again.");
            }
        };

        fetchDesigns();

        // Subscribe to real-time updates
        const subscription = supabase
            .channel('designs')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'designs', filter: `user_id=eq.${user.id}` }, (payload) => {
                fetchDesigns();
            })
            .subscribe();

        return () => supabase.removeChannel(subscription);
    }, [user, authReady]);

    const handleGenerate = async (feature, selectedStyle, uploadedImageFile, promptText) => {
        if (!userProfile || userProfile.credits <= 0) {
            setErrorMessage("You have no remaining credits. Please upgrade your plan.");
            return;
        }

        if (promptText.length > 200) {
            setErrorMessage("Prompt is too long. Maximum 200 characters allowed.");
            return;
        }

        setStatus('generating');
        setErrorMessage('');
        setGeneratedImageUrl('');

        if (!user) {
            setErrorMessage("User not authenticated. Please try again.");
            setStatus('initial');
            return;
        }

        try {
            const isImageToImageFeature = ['staging', 'remodel', 'interior', 'exterior', 'sketch', 'enhance', 'landscape', 'masterplan', 'edit'].includes(feature.type);
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("API key is missing.");
            }
            let apiUrl = '';
            let payload = {};

            if (isImageToImageFeature && uploadedImageFile) {
                const base64Data = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = reject;
                    reader.readAsDataURL(uploadedImageFile);
                });

                let specificPrompt = promptText;
                if (!specificPrompt) {
                    switch (feature.type) {
                        case 'staging':
                            specificPrompt = `Re-render this image of an empty room in a ${selectedStyle} architectural style. Add furniture and decor to the empty space.`;
                            break;
                        case 'interior':
                            specificPrompt = `Re-render this interior image with a ${selectedStyle} aesthetic, updating the furniture and design.`;
                            break;
                        case 'exterior':
                            specificPrompt = `Re-render this exterior image with a ${selectedStyle} aesthetic, updating the facade and landscaping.`;
                            break;
                        case 'remodel':
                            specificPrompt = `Remodel this architectural image to apply a ${selectedStyle} style, transforming the space and its elements.`;
                            break;
                        case 'sketch':
                            specificPrompt = `Turn this architectural sketch into a photorealistic, high-quality render in a ${selectedStyle} style.`;
                            break;
                        case 'enhance':
                            specificPrompt = `Enhance the quality, details, and realism of this architectural render.`;
                            break;
                        case 'masterplan':
                            specificPrompt = `Visualize this 2D masterplan into a photorealistic, high-quality 3D render.`;
                            break;
                        case 'landscape':
                            specificPrompt = `Generate a stunning landscape design from this image, applying a ${selectedStyle} aesthetic.`;
                            break;
                        case 'edit':
                            specificPrompt = `Modify this image based on the following instructions: ${promptText}.`;
                            break;
                    }
                }
                
                apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
                payload = {
                    contents: [{
                        parts: [
                            { text: specificPrompt },
                            {
                                inlineData: {
                                    mimeType: uploadedImageFile.type,
                                    data: base64Data
                                }
                            }
                        ]
                    }],
                    generationConfig: {
                        responseModalities: ["TEXT", "IMAGE"],
                    }
                };
            } else {
                const prompt = promptText || `A photorealistic, high-quality architectural render of a ${selectedStyle} ${feature.title.toLowerCase()} for a home design.`;
                apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
                payload = {
                    instances: {
                        prompt: prompt,
                    },
                    parameters: {
                        "sampleCount": 1,
                        "aspectRatio": "1:1",
                    },
                };
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            let base64Data;

            if (isImageToImageFeature) {
                base64Data = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
            } else {
                base64Data = result?.predictions?.[0]?.bytesBase64Encoded;
            }

            if (!base64Data) {
                throw new Error('Image data not found in response.');
            }

            const imageUrl = `data:image/png;base64,${base64Data}`;
            setGeneratedImageUrl(imageUrl);

            // Save design to Supabase
            await supabase.from('designs').insert([{
                user_id: user.id,
                feature_title: feature.title,
                style: selectedStyle,
                image_url: imageUrl,
                created_at: new Date().toISOString(),
            }]);

            // Update user credits
            await supabase
                .from('profiles')
                .update({ credits: userProfile.credits - 1 })
                .eq('id', user.id);

            setStatus('success');
            setTimeout(() => {
                setStatus('initial');
            }, 1000);
        } catch (error) {
            console.error("Error generating or saving design:", error);
            let errorMsg = "Failed to generate design. Please try again.";
            if (error.message.includes("HTTP error")) {
                errorMsg = "Server error. Please check your connection or try again later.";
            } else if (error.message.includes("Image data")) {
                errorMsg = "Failed to process image. Ensure the uploaded file is valid.";
            } else if (error.message.includes("API key")) {
                errorMsg = "Configuration error. Please contact support.";
            }
            setErrorMessage(errorMsg);
            setStatus('initial');
        }
    };

    const handleGetStarted = async (plan) => {
        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: plan.title, userId: user?.id }),
            });
            const { id } = await response.json();
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: id });
        } catch (error) {
            console.error("Error initiating checkout:", error);
            setErrorMessage("Failed to start subscription. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            console.log("User signed out successfully.");
            setCurrentPage('home');
        } catch (error) {
            console.error("Error signing out:", error);
            setErrorMessage("Failed to log out. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900" dir="auto">
            <header className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => setCurrentPage('home')} className="flex items-center text-2xl">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="bg-blue-600 rounded-lg p-1 mr-2">
                                <House className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-logo text-gray-900">archaI</span>
                        </div>
                    </button>
                    <nav className="hidden md:flex space-x-8">
                        <button onClick={() => setCurrentPage('home')} className={`text-gray-600 hover:text-blue-600 font-medium transition-colors ${currentPage === 'home' ? 'text-blue-600' : ''}`}>Home</button>
                        <button onClick={() => setCurrentPage('dashboard')} className={`text-gray-600 hover:text-blue-600 font-medium transition-colors ${currentPage === 'dashboard' ? 'text-blue-600' : ''}`}>My Projects</button>
                        <button onClick={() => setCurrentPage('pricing')} className={`text-gray-600 hover:text-blue-600 font-medium transition-colors ${currentPage === 'pricing' ? 'text-blue-600' : ''}`}>Pricing</button>
                    </nav>
                    <div className="flex items-center space-x-4">
                        {userProfile && (
                            <div className="relative group">
                                <button onClick={() => setCurrentPage('profile')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                                    <img
                                        className="h-8 w-8 rounded-full object-cover border-2 border-transparent group-hover:border-blue-500 transition-all"
                                        src={userProfile.avatar_url || `https://placehold.co/32x32/e0e0e0/ffffff?text=${userProfile.username ? userProfile.username.charAt(0) : 'U'}`}
                                        alt="Profile"
                                    />
                                    <span className="hidden md:inline-block font-medium">{userProfile.username || "User"}</span>
                                </button>
                            </div>
                        )}
                        <div className="hidden md:block text-right text-xs text-gray-500">
                            {authReady ? `User ID: ${user?.id || 'N/A'}` : "Authenticating..."}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                        >
                            <LogOut className="h-5 w-5 mr-1" />
                            Log Out
                        </button>
                    </div>
                </div>
            </header>

            {currentPage === 'home' && (
                <HomePage onSelectFeature={(feature) => {
                    setSelectedFeature(feature);
                    setGeneratedImageUrl('');
                }} />
            )}
            {currentPage === 'dashboard' && (
                <DashboardPage designs={designs} authReady={authReady} />
            )}
            {currentPage === 'pricing' && (
                <PricingPage onGetStarted={handleGetStarted} />
            )}
            {currentPage === 'profile' && (
                <ProfilePage userProfile={userProfile} designsCount={designs.length} />
            )}

            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex-shrink-0 flex items-center mb-4">
                                <div className="bg-blue-600 rounded-lg p-1 mr-2">
                                    <House className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">ArchitectAI</span>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Revolutionizing architectural design with AI-powered tools for professionals worldwide.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300" aria-label="Twitter">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 8l-3.5 3.5-3.5-3.5"></path></svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300" aria-label="Github">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 3c0 0-1.07-.3-3.5 1.42A12.78 12.78 0 0012 5.62v18.38a12.78 12.78 0 00-4.41-1.15c-2.43-1.72-3.5-1.42-3.5-1.42a5.07 5.07 0 00-.09 1.77A5.44 5.44 0 002 9.27c0 5.46 3.3 6.65 6.44 7a3.37 3.37 0 00-.94 2.61V22"></path></svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300" aria-label="LinkedIn">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8V6a4 4 0 00-4-4H4v16h4z"></path></svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300" aria-label="Email">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26c.72.48 1.45.74 2.11.74s1.39-.26 2.11-.74L21 8"></path><path d="M1 5h22v14H1z"></path></svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="mb-4 md:mb-0">&copy; 2025 All rights reserved for <span className='text-blue-500'>ArchitectAI</span></p>
                            <ul className="flex flex-wrap gap-4 md:gap-6 transition-colors">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            {selectedFeature && (
                <FeatureModal
                    feature={selectedFeature}
                    onClose={() => {
                        setSelectedFeature(null);
                        setErrorMessage('');
                        setGeneratedImageUrl('');
                        setUploadedImage(null);
                    }}
                    onGenerate={handleGenerate}
                    errorMessage={errorMessage}
                    status={status}
                    generatedImageUrl={generatedImageUrl}
                    uploadedImage={uploadedImage}
                    setUploadedImage={setUploadedImage}
                />
            )}
        </div>
    );
}