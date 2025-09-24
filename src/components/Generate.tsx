import React, { useState } from 'react';
import { Loader2, Star } from 'lucide-react';

// Define the shape of the generated design object
interface GeneratedDesign {
    title: string;
    description: string;
    image: string;
}
type BuildingType = 'Single Family Home' | 'Townhouse' | 'Apartment Complex' | 'Commercial Building' | null;
type ArchitecturalStyle = 'Modern' | 'Traditional' | 'Contemporary' | 'Minimalist' | null;
type SustainabilityLevel = 'Basic' | 'Standard efficiency' | 'Green' | 'Energy efficient' | 'LEED' | 'Certified sustainable' | null;
type BudgetType = 'low' | 'medium' | 'high' | null;
type Unit = 'Feet' | 'Meters';

interface RoomConfiguration {
    bedrooms: number;
    bathrooms: number;
    kitchen: number;
    livingRoom: number;
    diningRoom: number;
    office: number;
    garage: number;
}

// Props interface to accept onNavigate
interface GenerateProps {
    onNavigate?: (sectionId: string) => void;
}

// Define the shape of the component's view states
type InputView = 'specifications' | 'upload';
type ProjectType = 'Residential' | 'Commercial' | null;

const Generate: React.FC<GenerateProps> = ({ onNavigate }) => {
    // State for the main view
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [generatedDesign, setGeneratedDesign] = useState<GeneratedDesign | null>(null);
    const [error, setError] = useState<string | null>(null);

    // State for the input panel's navigation
    const [inputView, setInputView] = useState<InputView>('specifications');

    // State for the upload form
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState<boolean>(false);
    
    // State for the specifications form
    const [buildingType, setBuildingType] = useState<BuildingType>(null);
    const [architecturalStyle, setArchitecturalStyle] = useState<ArchitecturalStyle>(null);
    const [sustainabilityLevel, setSustainabilityLevel] = useState<SustainabilityLevel>(null);
    const [budget, setBudget] = useState<BudgetType>(null);
    const [specialRequirements, setSpecialRequirements] = useState<string>('');
    const [lotWidth, setLotWidth] = useState<string>('');
    const [lotHeight, setLotHeight] = useState<string>('');
    const [unit, setUnit] = useState<Unit>('Feet');
    const [roomConfig, setRoomConfig] = useState<RoomConfiguration>({
        bedrooms: 0,
        bathrooms: 0,
        kitchen: 0,
        livingRoom: 0,
        diningRoom: 0,
        office: 0,
        garage: 0,
    });
    const [projectType, setProjectType] = useState<ProjectType>(null);

    // Handlers for drag and drop
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFiles(Array.from(e.dataTransfer.files));
        }
    };

    // Handler for file input
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUploadedFiles(Array.from(e.target.files));
        }
    };

    // Handler for the "Generate AI Design" button
    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        setGeneratedDesign(null);
        
        // Validation check based on the active tab and Project Type
        if (!projectType) {
            setError("Please select a Project Type.");
            setIsGenerating(false);
            return;
        }

        if (inputView === 'specifications' && (!buildingType || !architecturalStyle || !budget)) {
            setError("Please fill out all required specifications before generating.");
            setIsGenerating(false);
            return;
        }
        if (inputView === 'upload' && uploadedFiles.length === 0) {
            setError("Please upload at least one file or switch to 'Input Specifications'.");
            setIsGenerating(false);
            return;
        }

        // Construct the prompt
        let prompt = '';
        if (inputView === 'specifications') {
            prompt = `Generate a design for a ${buildingType} project with ${architecturalStyle} style. The lot dimensions are ${lotWidth}x${lotHeight} ${unit}. Sustainability level is ${sustainabilityLevel} and budget is ${budget}. Rooms: ${JSON.stringify(roomConfig)}. Special requirements: ${specialRequirements || 'None'}.`;
        } else {
            prompt = `Generate a design based on the uploaded files for a ${projectType} project with additional requirements: ${specialRequirements || 'None'}.`;
        }

        console.log("Simulating AI generation with prompt:", prompt);

        // Simulate a network request and wait for a response
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Simulate a successful AI response
        const newDesign: GeneratedDesign = {
            title: `Your AI-Generated Architectural Design`,
            description: `This design was created based on your provided inputs and preferences.`,
            image: "https://via.placeholder.com/1200x800.png?text=AI-Generated+Architectural+Design",
        };

        setGeneratedDesign(newDesign);
        setIsGenerating(false);
    };

    const handleIncrementRoom = (room: keyof RoomConfiguration) => {
        setRoomConfig(prev => ({ ...prev, [room]: prev[room] + 1 }));
    };

    const handleDecrementRoom = (room: keyof RoomConfiguration) => {
        setRoomConfig(prev => ({ ...prev, [room]: Math.max(0, prev[room] - 1) }));
    };

    // Function to render the upload files form
    const renderUploadFilesForm = () => (
        <div className="space-y-6 font-logo">
            <h3 className="text-xl font-semibold text-slate-700">Upload Your Files</h3>
            <div
                className={`flex flex-col items-center justify-center p-8 w-full border-2 border-dashed rounded-md transition-colors ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="text-gray-500 text-center">Drop files here or click to upload</p>
                <p className="text-sm text-gray-400 mt-1">Support for sketches, CAD files, PDFs, and images</p>
                <label htmlFor="file-upload" className="mt-4 px-6 py-2 bg-indigo-600 text-white text-base rounded-md shadow-md cursor-pointer hover:bg-indigo-700 transition">
                    Choose Files
                </label>
                <input id="file-upload" type="file" multiple onChange={handleFileSelect} className="hidden" />
            </div>
            {uploadedFiles.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-md font-semibold text-slate-700">Uploaded Files:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                        {uploadedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            {/* Project Type in Upload panel */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Project Type</h4>
                <div className="flex gap-4">
                    <button
                        onClick={() => setProjectType('Residential')}
                        className={`flex-1 px-6 py-3 rounded-md font-semibold transition-colors ${projectType === 'Residential' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Residential
                    </button>
                    <button
                        onClick={() => setProjectType('Commercial')}
                        className={`flex-1 px-6 py-3 rounded-md font-semibold transition-colors ${projectType === 'Commercial' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Commercial
                    </button>
                </div>
            </div>

            {/* Additional Requirements for Upload view */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Additional Requirements</h4>
                <textarea
                    className="w-full h-24 p-4 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700"
                    maxLength={500}
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                />
                <span className="text-sm text-gray-500 float-right">{specialRequirements.length}/500 characters</span>
            </div>
        </div>
    );

    // Function to render the specifications form
    const renderSpecificationsForm = () => (
        <div className="space-y-6 font-logo">
            <h3 className="text-2xl font-semibold text-blue-700 ">Input Your Specifications</h3>
            
            {/* Project Type for Specifications view */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Project Type</h4>
                <div className="flex gap-4">
                    <button
                        onClick={() => setProjectType('Residential')}
                        className={`flex-1 px-6 py-3 rounded-md font-semibold transition-colors ${projectType === 'Residential' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Residential
                    </button>
                    <button
                        onClick={() => setProjectType('Commercial')}
                        className={`flex-1 px-6 py-3 rounded-md font-semibold transition-colors ${projectType === 'Commercial' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Commercial
                    </button>
                </div>
            </div>

            {/* Building Type */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Building Type</h4>
                <div className="flex flex-wrap gap-2">
                    {['Single Family Home', 'Townhouse', 'Apartment Complex', 'Commercial Building'].map(type => (
                        <button
                            key={type}
                            onClick={() => setBuildingType(type as BuildingType)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${buildingType === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lot Dimensions */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Lot Dimensions</h4>
                <div className="flex flex-wrap items-center gap-4">
                    <input
                        type="number"
                        value={lotWidth}
                        onChange={(e) => setLotWidth(e.target.value)}
                        placeholder="Width"
                        className="w-24 p-2 border rounded-md text-gray-700"
                    />
                    <input
                        type="number"
                        value={lotHeight}
                        onChange={(e) => setLotHeight(e.target.value)}
                        placeholder="Height"
                        className="w-24 p-2 border rounded-md text-gray-700"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => setUnit('Feet')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === 'Feet' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Feet
                        </button>
                        <button
                            onClick={() => setUnit('Meters')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === 'Meters' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Meters
                        </button>
                    </div>
                </div>
            </div>

            {/* Architectural Style */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Architectural Style</h4>
                <div className="flex flex-wrap gap-2">
                    {['Modern', 'Traditional', 'Contemporary', 'Minimalist'].map(style => (
                        <button
                            key={style}
                            onClick={() => setArchitecturalStyle(style as ArchitecturalStyle)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${architecturalStyle === style ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>

            {/* Room Configuration */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Room Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(roomConfig).map(key => (
                        <div key={key} className="flex items-center justify-between">
                            <span className="capitalize">{key}</span>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => handleDecrementRoom(key as keyof RoomConfiguration)} className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 transition">-</button>
                                <span className="w-6 text-center">{roomConfig[key as keyof RoomConfiguration]}</span>
                                <button onClick={() => handleIncrementRoom(key as keyof RoomConfiguration)} className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 transition">+</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sustainability Level */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Sustainability Level</h4>
                <div className="flex flex-wrap gap-2">
                    {['Basic', 'Standard efficiency', 'Green', 'Energy efficient', 'LEED', 'Certified sustainable'].map(level => (
                        <button
                            key={level}
                            onClick={() => setSustainabilityLevel(level as SustainabilityLevel)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${sustainabilityLevel === level ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Budget Consideration */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Budget Consideration</h4>
                <div className="flex flex-wrap gap-2">
                    {['low', 'medium', 'high'].map(b => (
                        <button
                            key={b}
                            onClick={() => setBudget(b as BudgetType)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${budget === b ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {b}
                        </button>
                    ))}
                </div>
            </div>

            {/* Special Requirements */}
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Special Requirements & Features</h4>
                <textarea
                    className="w-full h-24 p-4 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700"
                    maxLength={500}
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                />
                <span className="text-sm text-gray-500 float-right">{specialRequirements.length}/500 characters</span>
            </div>

            {/* AI Enhancement Features */}
            <div className="p-6 bg-blue-100 rounded-2xl shadow-lg border border-blue-100 font-logo">
                <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center space-x-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <span>AI Enhancement Features</span>
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Automatic building code compliance checking</li>
                    <li>Energy efficiency optimization</li>
                    <li>Structural integrity analysis</li>
                    <li>Cost estimation with material suggestions</li>
                </ul>
            </div>
        </div>
    );

    const renderReadyToGenerate = () => (
        <div className="text-center text-gray-500 p-8 space-y-4 font-logo">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-logo font-semibold text-blue-700">Ready to Generate</h3>
            <p className="mb-4">Upload your files or input dimensions to start generating your architectural design</p>
            
            {/* Added section with colored background */}
            <div className="bg-gray-100 rounded-lg p-6 text-left space-y-4 font-logo">
                <p className="text-lg font-semibold text-blue-700 ">What you can do:</p>
                <div className="flex items-start space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                    <div>
                        <h4 className="font-semibold text-gray-800">File Upload</h4>
                        <p className="text-sm text-gray-600 mt-1">Sketches & CAD files</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <svg className="h-6 w-6 text-green-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h4 className="font-semibold text-gray-800">Input Dimensions</h4>
                        <p className="text-sm text-gray-600 mt-1">Size & requirements</p>
                    </div>
                </div>
            </div>
        </div>
    );
    

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans antialiased text-gray-800">
            {/* Header and Navigation outside the panels */}
            <header className="text-center mb-12">
                <h1 className="text-4xl font-logo md:text-5xl font-extrabold text-blue-700 leading-tight">
                    From vision to design in minutes
                </h1>
                <p className="mt-2 text-lg font-logo text-gray-600 max-w-2xl mx-auto">
                   Simply upload sketches, provide dimensions, or share your vision, and receive detailed architectural plans in minutes
                </p>
                
                {/* Navigation Tabs */}
                <div className="flex justify-center font-logo border-b border-gray-200 mt-8">
                    <button
                        onClick={() => { setInputView('specifications'); setError(null); }}
                        className={`px-4 py-2 font-medium transition-colors ${inputView === 'specifications' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Input dimensions
                    </button>
                    <button
                        onClick={() => { setInputView('upload'); setError(null); }}
                        className={`px-4 py-2 font-medium transition-colors ${inputView === 'upload' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Upload Files
                    </button>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* --------------------------- Left Panel: Input Section --------------------------- */}
                <div className="lg:w-1/2 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
                    {/* Conditional rendering based on inputView state */}
                    {inputView === 'specifications' ? renderSpecificationsForm() : renderUploadFilesForm()}

                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                    {/* Generate Button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || (inputView === 'specifications' && (!buildingType || !architecturalStyle || !budget)) || !projectType || (inputView === 'upload' && uploadedFiles.length === 0)}
                            className="px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-md shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <span className="flex items-center space-x-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Generating...</span>
                                </span>
                            ) : (
                                "Generate AI Design"
                            )}
                        </button>
                    </div>
                </div>

                 <div 
                    className={`lg:w-1/2 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 text-center flex flex-col justify-center items-center 
                        ${generatedDesign ? 'h-auto' : 'h-[32rem]'}` /* Dynamic height classes */}
                >
                    {generatedDesign ? (
                        <div className="w-full">
                            <h3 className="text-2xl font-bold mb-4 text-slate-800">{generatedDesign.title}</h3>
                            <p className="text-gray-600 mb-6">{generatedDesign.description}</p>
                            <img
                                src={generatedDesign.image}
                                alt="AI Generated Design"
                                className="w-full h-auto rounded-xl shadow-lg"
                            />
                        </div>
                    ) : isGenerating ? (
                        <div className="text-center p-8 space-y-4">
                            <Loader2 className="mx-auto h-16 w-16 text-indigo-500 animate-spin" />
                            <p className="text-xl font-semibold text-gray-700">Generating your design...</p>
                        </div>
                    ) : (
                        renderReadyToGenerate()
                    )}
                </div>
            </div>
        </div>
    );
};

export default Generate;