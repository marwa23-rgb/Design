import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface VRTransitionsProps {
  isTransitioning: boolean;
  transitionType: 'fade' | 'slide' | 'zoom';
  onTransitionComplete: () => void;
}

// Transition overlay for smooth scene changes
function TransitionOverlay({ 
  isTransitioning, 
  transitionType, 
  onTransitionComplete 
}: VRTransitionsProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number>(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (isTransitioning && startTime.current === 0) {
      startTime.current = state.clock.elapsedTime;
    }

    if (isTransitioning) {
      const elapsed = state.clock.elapsedTime - startTime.current;
      const progress = Math.min(elapsed / 1.0, 1); // 1 second transition

      switch (transitionType) {
        case 'fade':
          meshRef.current.material.opacity = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
          break;
        case 'slide':
          meshRef.current.position.x = progress < 0.5 ? progress * 1000 : (1 - progress) * 1000;
          break;
        case 'zoom':
          const scale = progress < 0.5 ? 1 + progress * 10 : 1 + (1 - progress) * 10;
          meshRef.current.scale.setScalar(scale);
          break;
      }

      if (progress >= 1) {
        startTime.current = 0;
        onTransitionComplete();
      }
    } else {
      // Reset to default state
      meshRef.current.material.opacity = 0;
      meshRef.current.position.x = 0;
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -100]}>
      <planeGeometry args={[2000, 2000]} />
      <meshBasicMaterial 
        color="#000000" 
        transparent 
        opacity={0}
      />
    </mesh>
  );
}

// Animated UI components for VR
export const VRAnimatedButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}> = ({ children, onClick, isActive = false, className = "" }) => {
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(147, 51, 234, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: isActive ? "#9333ea" : "#6b7280",
        color: isActive ? "#ffffff" : "#e5e7eb"
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
        initial={{ x: '-100%' }}
        animate={{ x: isActive ? '0%' : '-100%' }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Loading animation for VR content
export const VRLoader: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-300"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <motion.path
            className="text-purple-600"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - progress }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-2xl font-bold text-purple-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </div>
      </div>
      <motion.p
        className="text-white font-semibold text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Loading VR Experience...
      </motion.p>
    </div>
  );
};

// Floating VR UI Panel
export const VRFloatingPanel: React.FC<{
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}> = ({ title, children, isVisible, position = 'bottom-left' }) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} z-20 pointer-events-auto`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <div className="bg-black bg-opacity-80 backdrop-blur-sm rounded-xl p-4 min-w-64 border border-gray-600">
        <h3 className="text-white font-bold text-lg mb-3 flex items-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
          {title}
        </h3>
        <div className="text-gray-200">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Spatial Audio Visualizer
export const SpatialAudioVisualizer: React.FC<{ 
  isActive: boolean; 
  volume: number;
  roomAcoustics: 'small' | 'medium' | 'large' | 'outdoor';
}> = ({ isActive, volume, roomAcoustics }) => {
  const acousticsConfig = {
    small: { reverb: 0.3, frequency: 'high' },
    medium: { reverb: 0.6, frequency: 'medium' },
    large: { reverb: 0.9, frequency: 'low' },
    outdoor: { reverb: 0.1, frequency: 'wide' }
  };

  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-green-400 rounded-full"
            style={{ height: `${Math.max(4, volume * 20)}px` }}
            animate={{
              height: isActive 
                ? `${Math.max(4, (volume + Math.random() * 0.3) * 20)}px`
                : '4px'
            }}
            transition={{ 
              duration: 0.1,
              repeat: isActive ? Infinity : 0,
              repeatType: 'reverse'
            }}
          />
        ))}
      </div>
      <span className="text-xs text-gray-400 capitalize">
        {acousticsConfig[roomAcoustics].frequency} freq
      </span>
    </motion.div>
  );
};

export default TransitionOverlay;