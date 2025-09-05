import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowLeft, PersonStanding, PlayCircle, MousePointerSquare, Tablet, Headphones, Tv, Share2, Camera, Video, Settings, Check, Download, RotateCcw, Award, Users, Volume2, VolumeX, Maximize, Minimize} from 'lucide-react';
import WebXRVR from './WebXRVR';
import { VRAnimatedButton, VRLoader, VRFloatingPanel, SpatialAudioVisualizer } from './VRTransitions';
import { vrProjects, getProjectById, getRoomById, getHotspotsByRoom } from '../data/vrContent';

interface VRWalkthroughProps {
  
  onReturnToHome: () => void;
}

// Loader component for 3D loading state
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-32 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-semibold">Loading VR Experience... {progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

// 360 Video Sphere Component
function VideoSphere({ videoUrl, isPlaying }: { videoUrl: string; isPlaying: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = videoUrl;
    vid.crossOrigin = 'anonymous';
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    return vid;
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current = video;
    }
  }, [video]);

  useEffect(() => {
    if (isPlaying) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  }, [isPlaying, video]);

  const texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

// Interactive Hotspot Component
function Hotspot({ 
  position, 
  onClick, 
  label, 
  isActive 
}: { 
  position: [number, number, number]; 
  onClick: () => void; 
  label: string;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
      meshRef.current.scale.setScalar(isActive ? 1.2 : 1);
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <sphereGeometry args={[2, 8, 8]} />
      <meshBasicMaterial color={isActive ? "#9333ea" : "#ffffff"} opacity={0.8} transparent />
      <Html distanceFactor={10}>
        <div className="bg-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg pointer-events-none">
          {label}
        </div>
      </Html>
    </mesh>
  );
}

// Main VR Scene Component
function VRScene({ 
  currentRoom, 
  isPlaying, 
  onRoomChange,
  projectId 
}: { 
  currentRoom: string; 
  isPlaying: boolean; 
  onRoomChange: (room: string) => void;
  projectId: string;
}) {
  const currentRoomData = getRoomById(projectId, currentRoom);
  const videoUrl = currentRoomData?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  
  // Get hotspots for current room
  const hotspots = getHotspotsByRoom(projectId, currentRoom);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={75} />
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        enableDamping 
        dampingFactor={0.1}
        rotateSpeed={0.5}
        minDistance={0.1}
        maxDistance={1}
      />
      
      <VideoSphere 
        videoUrl={videoUrl} 
        isPlaying={isPlaying} 
      />
      
      {/* Render hotspots for navigation */}
      {hotspots.map((hotspot, index) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position}
          onClick={() => onRoomChange(hotspot.targetRoom)}
          label={hotspot.label}
          isActive={false}
        />
      ))}
    </>
  );
}

const VRWalkthrough: React.FC<VRWalkthroughProps> = ({ onReturnToHome }) => {
  const [currentRoom, setCurrentRoom] = useState('living-room');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('luxury-villa');
  const [viewMode, setViewMode] = useState<'360' | 'free'>('360');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [showVRPanel, setShowVRPanel] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.7);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Check WebXR support
  useEffect(() => {
    if ('xr' in navigator) {
      navigator.xr?.isSessionSupported('immersive-vr').then(setIsVRSupported);
    }
  }, []);

  const currentProject = getProjectById(selectedProject);
  const currentRoomData = getRoomById(selectedProject, currentRoom);
  const rooms = currentProject?.rooms || [];
  const projects = vrProjects;

  const handleEnterVR = () => {
    setIsPlaying(true);
    if (canvasRef.current && canvasRef.current.requestFullscreen) {
      canvasRef.current.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    }
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    }
    setIsFullscreen(false);
  };

  const handleRoomChange = (roomId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentRoom(roomId);
      setIsTransitioning(false);
    }, 500); // Smooth transition delay
  };

  const getRoomAcoustics = (room: string): 'small' | 'medium' | 'large' | 'outdoor' => {
    const roomData = getRoomById(selectedProject, room);
    return roomData?.acoustics || 'medium';
  };

  const handleShare = () => {
    navigator.share?.({
      title: 'VR Walkthrough Experience',
      text: 'Check out this amazing VR architectural walkthrough!',
      url: window.location.href
    }).catch(() => {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    });
  };

  const handleScreenshot = () => {
    // This would capture the current canvas view
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `vr-screenshot-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={onReturnToHome}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <h1 className="text-xl font-bold">VR Walkthrough Experience</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            VR Walkthrough Experience
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
            Step inside your designs before they're built. Immersive virtual reality presentations that bring architectural visions to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={handleEnterVR}
              className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-gray-100 flex items-center justify-center"
            >
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

      {/* Project Selection */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Choose Your VR Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all ${
                  selectedProject === project.id ? 'ring-4 ring-purple-600' : 'hover:shadow-2xl'
                }`}
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="h-48 bg-gray-300 flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 items-center justify-center text-white font-bold text-lg">
                    {project.name}
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {project.category}
                </div>
                <div className="absolute bottom-4 left-4 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
                  VR Ready
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span className="mr-4">📐 {project.size}</span>
                    <span>🏠 {project.details}</span>
                  </div>
                  <VRAnimatedButton
                    onClick={() => {
                      setSelectedProject(project.id);
                      if (project.rooms.length > 0) {
                        setCurrentRoom(project.rooms[0].id);
                      }
                    }}
                    isActive={selectedProject === project.id}
                    className={`w-full px-6 py-3 font-semibold rounded-full transition-colors ${
                      selectedProject === project.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-200 text-slate-800 hover:bg-indigo-600 hover:text-white'
                    }`}
                  >
                    {selectedProject === project.id ? 'Selected' : 'Select Project'}
                  </VRAnimatedButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VR Viewer */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            {/* VR Canvas */}
            <div ref={canvasRef} className="relative w-full h-96 md:h-[600px]">
              {isVRSupported && viewMode === '360' ? (
                <WebXRVR 
                  currentRoom={currentRoom}
                  onRoomChange={handleRoomChange}
                  isVRSupported={isVRSupported}
                  projectId={selectedProject}
                />
              ) : (
                <Canvas className="w-full h-full">
                  <Suspense fallback={<Loader />}>
                    <VRScene 
                      currentRoom={currentRoom} 
                      isPlaying={isPlaying}
                      onRoomChange={handleRoomChange}
                      projectId={selectedProject}
                    />
                  </Suspense>
                </Canvas>
              )}
              
              {/* Enhanced VR Controls Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top Controls */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
                  <div className="flex space-x-2">
                    <VRAnimatedButton
                      onClick={() => setIsPlaying(!isPlaying)}
                      isActive={isPlaying}
                      className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      {isPlaying ? <Video className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                    </VRAnimatedButton>
                    <VRAnimatedButton
                      onClick={() => setIsMuted(!isMuted)}
                      isActive={!isMuted}
                      className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </VRAnimatedButton>
                    {isVRSupported && (
                      <VRAnimatedButton
                        onClick={() => setShowVRPanel(!showVRPanel)}
                        isActive={showVRPanel}
                        className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                      >
                        <Settings className="h-5 w-5" />
                      </VRAnimatedButton>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 items-center">
                    <SpatialAudioVisualizer 
                      isActive={isPlaying && !isMuted}
                      volume={audioVolume}
                      roomAcoustics={getRoomAcoustics(currentRoom)}
                    />
                    <VRAnimatedButton
                      onClick={isFullscreen ? handleExitFullscreen : handleEnterVR}
                      isActive={isFullscreen}
                      className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </VRAnimatedButton>
                  </div>
                </div>

                {/* Center Play Button (when not playing) */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                    <VRAnimatedButton
                      onClick={handleEnterVR}
                      className="bg-purple-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg flex items-center"
                    >
                      <PlayCircle className="h-6 w-6 mr-2" />
                      Enter VR Mode
                    </VRAnimatedButton>
                  </div>
                )}

                {/* Transition Overlay */}
                {isTransitioning && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <VRLoader progress={50} />
                  </div>
                )}

                {/* VR Settings Panel */}
                <VRFloatingPanel
                  title="VR Settings"
                  isVisible={showVRPanel}
                  position="top-right"
                >
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Audio Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={audioVolume}
                        onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Room Acoustics</label>
                      <p className="text-sm text-gray-400 capitalize">{getRoomAcoustics(currentRoom)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Room</label>
                      <p className="text-sm text-gray-400">{currentRoomData?.description || 'No description available'}</p>
                    </div>
                    {isVRSupported && (
                      <div className="pt-2 border-t border-gray-600">
                        <p className="text-sm text-green-400">✓ WebXR VR Supported</p>
                      </div>
                    )}
                  </div>
                </VRFloatingPanel>
              </div>
            </div>

            {/* Room Navigation */}
            <div className="p-6 bg-gray-800 text-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold">Room Navigation</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('360')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      viewMode === '360' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    360° View
                  </button>
                  <button
                    onClick={() => setViewMode('free')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      viewMode === 'free' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    Free Walk
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {rooms.map((room) => (
                  <VRAnimatedButton
                    key={room.id}
                    onClick={() => handleRoomChange(room.id)}
                    isActive={currentRoom === room.id}
                    className="px-4 py-2 rounded-full font-medium flex items-center"
                  >
                    <span className="mr-2">{room.icon}</span>
                    {room.name}
                  </VRAnimatedButton>
                ))}
              </div>

              {/* Session Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <PlayCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-semibold">Session Time</span>
                  </div>
                  <p className="text-sm text-gray-300">{isPlaying ? 'Active' : 'Not active'}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="font-semibold">Multi-User</span>
                  </div>
                  <p className="text-sm text-gray-300">Up to 8 participants</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="font-semibold">Quality</span>
                  </div>
                  <p className="text-sm text-gray-300">High Definition</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={handleShare}
                  className="flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-500 transition-colors"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Session
                </button>
                <button 
                  onClick={handleScreenshot}
                  className="flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-500 transition-colors"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Take Screenshot
                </button>
                <button className="flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-500 transition-colors">
                  <Video className="h-5 w-5 mr-2" />
                  Record Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced VR Features */}
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

      {/* VR System Requirements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
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
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl shadow-lg w-full h-32 flex items-center justify-center text-white font-bold">
                VR User {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
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