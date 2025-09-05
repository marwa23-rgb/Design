import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { getRoomById, getHotspotsByRoom } from '../data/vrContent';

interface WebXRVRProps {
  currentRoom: string;
  onRoomChange: (room: string) => void;
  isVRSupported: boolean;
  projectId: string;
}

// Enhanced 360 Video Sphere for VR
function VRVideoSphere({ videoUrl }: { videoUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = videoUrl;
    vid.crossOrigin = 'anonymous';
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.autoplay = true;
    return vid;
  });

  useEffect(() => {
    video.play().catch(console.error);
  }, [video]);

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

// VR Navigation Hotspots
function VRHotspot({ 
  position, 
  onClick, 
  label 
}: { 
  position: [number, number, number]; 
  onClick: () => void; 
  label: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[hovered ? 3 : 2, 16, 16]} />
      <meshBasicMaterial 
        color={hovered ? "#9333ea" : "#ffffff"} 
        opacity={hovered ? 0.9 : 0.7} 
        transparent 
      />
      {/* Text label floating above */}
      <mesh position={[0, 5, 0]}>
        <planeGeometry args={[20, 5]} />
        <meshBasicMaterial 
          color="#000000" 
          opacity={0.8} 
          transparent 
        />
      </mesh>
    </mesh>
  );
}

// VR Environment Component  
function VREnvironment({ 
  currentRoom, 
  onRoomChange, 
  projectId 
}: { 
  currentRoom: string; 
  onRoomChange: (room: string) => void;
  projectId: string;
}) {
  const currentRoomData = getRoomById(projectId, currentRoom);
  const videoUrl = currentRoomData?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  
  // Get hotspots for current room
  const hotspots = getHotspotsByRoom(projectId, currentRoom);

  return (
    <>
      {/* Ambient lighting for better visibility */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* 360 Video Environment */}
      <VRVideoSphere videoUrl={videoUrl} />
      
      {/* Navigation Hotspots */}
      {hotspots.map((hotspot) => (
        <VRHotspot
          key={hotspot.id}
          position={hotspot.position}
          onClick={() => onRoomChange(hotspot.targetRoom)}
          label={hotspot.label}
        />
      ))}
    </>
  );
}

const WebXRVR: React.FC<WebXRVRProps> = ({ currentRoom, onRoomChange, isVRSupported, projectId }) => {
  const [isVRActive, setIsVRActive] = useState(false);

  if (!isVRSupported) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <div className="text-center">
          <p className="text-gray-600 mb-4">WebXR VR not supported on this device</p>
          <p className="text-sm text-gray-500">Try using a VR-compatible browser or device</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* VR Button */}
      <div className="absolute top-4 right-4 z-10">
        <VRButton 
          onVRStart={() => setIsVRActive(true)}
          onVREnd={() => setIsVRActive(false)}
          className="bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors"
        />
      </div>

      {/* VR Canvas */}
      <Canvas 
        className="w-full h-full"
        camera={{ position: [0, 1.6, 0], fov: 75 }}
      >
        <XR>
          {/* VR Controllers and Hand Tracking */}
          <Controllers />
          <Hands />
          
          {/* VR Environment */}
          <VREnvironment currentRoom={currentRoom} onRoomChange={onRoomChange} projectId={projectId} />
          
          {/* Fallback controls for non-VR mode */}
          {!isVRActive && (
            <OrbitControls 
              enableZoom={true} 
              enablePan={false} 
              enableDamping 
              dampingFactor={0.1}
              rotateSpeed={0.5}
              minDistance={0.1}
              maxDistance={1}
            />
          )}
        </XR>
      </Canvas>

      {/* VR Status Indicator */}
      {isVRActive && (
        <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          VR Mode Active
        </div>
      )}
    </div>
  );
};

export default WebXRVR;