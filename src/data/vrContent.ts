// VR Content Data
export interface VRRoom {
  id: string;
  name: string;
  icon: string;
  videoUrl: string;
  description: string;
  hotspots: VRHotspot[];
  acoustics: 'small' | 'medium' | 'large' | 'outdoor';
  lightingConditions: 'natural' | 'artificial' | 'mixed';
  furniture: string[];
}

export interface VRHotspot {
  id: string;
  position: [number, number, number];
  targetRoom: string;
  label: string;
  type: 'navigation' | 'interaction' | 'information';
  metadata?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface VRProject {
  id: string;
  name: string;
  category: 'Residential' | 'Commercial' | 'Mixed-Use';
  image: string;
  size: string;
  details: string;
  rooms: VRRoom[];
  thumbnail: string;
  description: string;
}

// Sample 360° videos for demonstration
// In production, these would be actual 360° architectural videos
const sampleVideos = {
  livingRoom: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  kitchen: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  bedroom: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  bathroom: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  exterior: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  office: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  lobby: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
};

export const vrProjects: VRProject[] = [
  {
    id: 'modern-family-home',
    name: 'Modern Family Home',
    category: 'Residential',
    image: '/api/placeholder/800/600',
    size: '3,200 sq ft',
    details: '4 BR, 3.5 BA',
    thumbnail: '/api/placeholder/400/300',
    description: 'A contemporary family home featuring open-plan living, smart home technology, and sustainable design elements.',
    rooms: [
      {
        id: 'living-room',
        name: 'Living Room',
        icon: '🛋️',
        videoUrl: sampleVideos.livingRoom,
        description: 'Spacious open-plan living area with modern furnishings and large windows',
        acoustics: 'large',
        lightingConditions: 'natural',
        furniture: ['sofa', 'coffee table', 'tv unit', 'plants'],
        hotspots: [
          {
            id: 'to-kitchen',
            position: [100, 0, 100],
            targetRoom: 'kitchen',
            label: 'Kitchen',
            type: 'navigation'
          },
          {
            id: 'to-bedroom',
            position: [-100, 0, 100],
            targetRoom: 'bedroom',
            label: 'Master Bedroom',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'kitchen',
        name: 'Kitchen',
        icon: '🍽️',
        videoUrl: sampleVideos.kitchen,
        description: 'Modern kitchen with island, stainless steel appliances, and quartz countertops',
        acoustics: 'medium',
        lightingConditions: 'mixed',
        furniture: ['island', 'cabinets', 'appliances', 'bar stools'],
        hotspots: [
          {
            id: 'to-living-room',
            position: [-100, 0, -100],
            targetRoom: 'living-room',
            label: 'Living Room',
            type: 'navigation'
          },
          {
            id: 'to-exterior',
            position: [150, 0, 0],
            targetRoom: 'exterior',
            label: 'Outdoor Deck',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'bedroom',
        name: 'Master Bedroom',
        icon: '🛏️',
        videoUrl: sampleVideos.bedroom,
        description: 'Relaxing master suite with ensuite bathroom and walk-in closet',
        acoustics: 'medium',
        lightingConditions: 'natural',
        furniture: ['bed', 'nightstands', 'dresser', 'seating area'],
        hotspots: [
          {
            id: 'to-bathroom',
            position: [0, 0, -150],
            targetRoom: 'bathroom',
            label: 'Ensuite Bathroom',
            type: 'navigation'
          },
          {
            id: 'to-living-room',
            position: [100, 0, -100],
            targetRoom: 'living-room',
            label: 'Living Room',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'bathroom',
        name: 'Master Bathroom',
        icon: '🛁',
        videoUrl: sampleVideos.bathroom,
        description: 'Luxurious bathroom with soaking tub, separate shower, and double vanity',
        acoustics: 'small',
        lightingConditions: 'artificial',
        furniture: ['vanity', 'bathtub', 'shower', 'mirror'],
        hotspots: [
          {
            id: 'to-bedroom',
            position: [0, 0, 150],
            targetRoom: 'bedroom',
            label: 'Master Bedroom',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'exterior',
        name: 'Exterior View',
        icon: '🏡',
        videoUrl: sampleVideos.exterior,
        description: 'Beautiful outdoor living space with deck, landscaping, and panoramic views',
        acoustics: 'outdoor',
        lightingConditions: 'natural',
        furniture: ['outdoor furniture', 'grill', 'planters', 'lighting'],
        hotspots: [
          {
            id: 'to-kitchen',
            position: [-150, 0, 0],
            targetRoom: 'kitchen',
            label: 'Kitchen',
            type: 'navigation'
          }
        ]
      }
    ]
  },
  {
    id: 'corporate-office',
    name: 'Corporate Office',
    category: 'Commercial',
    image: '/api/placeholder/800/600',
    size: '15,000 sq ft',
    details: 'Open workspace',
    thumbnail: '/api/placeholder/400/300',
    description: 'Modern corporate office space with flexible workstations, meeting rooms, and collaborative areas.',
    rooms: [
      {
        id: 'office-main',
        name: 'Main Office',
        icon: '💼',
        videoUrl: sampleVideos.office,
        description: 'Open-plan workspace with modern workstations and collaborative areas',
        acoustics: 'large',
        lightingConditions: 'artificial',
        furniture: ['desks', 'chairs', 'monitors', 'storage'],
        hotspots: [
          {
            id: 'to-lobby',
            position: [0, 0, -150],
            targetRoom: 'lobby',
            label: 'Lobby',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'lobby',
        name: 'Reception Lobby',
        icon: '🏢',
        videoUrl: sampleVideos.lobby,
        description: 'Welcoming reception area with modern design and company branding',
        acoustics: 'large',
        lightingConditions: 'mixed',
        furniture: ['reception desk', 'seating', 'displays', 'plants'],
        hotspots: [
          {
            id: 'to-office',
            position: [0, 0, 150],
            targetRoom: 'office-main',
            label: 'Main Office',
            type: 'navigation'
          }
        ]
      }
    ]
  },
  {
    id: 'luxury-villa',
    name: 'Luxury Villa',
    category: 'Residential',
    image: '/api/placeholder/800/600',
    size: '5,800 sq ft',
    details: '6 BR, 4.5 BA',
    thumbnail: '/api/placeholder/400/300',
    description: 'Stunning luxury villa with premium finishes, infinity pool, and breathtaking ocean views.',
    rooms: [
      {
        id: 'living-room',
        name: 'Grand Living Room',
        icon: '🛋️',
        videoUrl: sampleVideos.livingRoom,
        description: 'Expansive living area with floor-to-ceiling windows and ocean views',
        acoustics: 'large',
        lightingConditions: 'natural',
        furniture: ['sectional sofa', 'fireplace', 'art pieces', 'piano'],
        hotspots: [
          {
            id: 'to-kitchen',
            position: [100, 0, 100],
            targetRoom: 'kitchen',
            label: 'Gourmet Kitchen',
            type: 'navigation'
          },
          {
            id: 'to-bedroom',
            position: [-100, 0, 100],
            targetRoom: 'bedroom',
            label: 'Master Suite',
            type: 'navigation'
          },
          {
            id: 'to-exterior',
            position: [0, 0, -150],
            targetRoom: 'exterior',
            label: 'Pool Terrace',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'kitchen',
        name: 'Gourmet Kitchen',
        icon: '👨‍🍳',
        videoUrl: sampleVideos.kitchen,
        description: 'Professional-grade kitchen with premium appliances and marble countertops',
        acoustics: 'medium',
        lightingConditions: 'mixed',
        furniture: ['chef island', 'wine fridge', 'professional range', 'butler pantry'],
        hotspots: [
          {
            id: 'to-living-room',
            position: [-100, 0, -100],
            targetRoom: 'living-room',
            label: 'Living Room',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'bedroom',
        name: 'Master Suite',
        icon: '🛏️',
        videoUrl: sampleVideos.bedroom,
        description: 'Luxurious master bedroom with private balcony and ocean views',
        acoustics: 'medium',
        lightingConditions: 'natural',
        furniture: ['king bed', 'sitting area', 'private balcony', 'walk-in closet'],
        hotspots: [
          {
            id: 'to-bathroom',
            position: [0, 0, -150],
            targetRoom: 'bathroom',
            label: 'Spa Bathroom',
            type: 'navigation'
          },
          {
            id: 'to-living-room',
            position: [100, 0, -100],
            targetRoom: 'living-room',
            label: 'Living Room',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'bathroom',
        name: 'Spa Bathroom',
        icon: '🛁',
        videoUrl: sampleVideos.bathroom,
        description: 'Resort-style bathroom with infinity tub and rain shower',
        acoustics: 'small',
        lightingConditions: 'mixed',
        furniture: ['infinity tub', 'rain shower', 'double vanity', 'heated floors'],
        hotspots: [
          {
            id: 'to-bedroom',
            position: [0, 0, 150],
            targetRoom: 'bedroom',
            label: 'Master Suite',
            type: 'navigation'
          }
        ]
      },
      {
        id: 'exterior',
        name: 'Pool Terrace',
        icon: '🏊‍♀️',
        videoUrl: sampleVideos.exterior,
        description: 'Stunning infinity pool with panoramic ocean views and outdoor kitchen',
        acoustics: 'outdoor',
        lightingConditions: 'natural',
        furniture: ['infinity pool', 'outdoor kitchen', 'lounge chairs', 'fire pit'],
        hotspots: [
          {
            id: 'to-living-room',
            position: [0, 0, 150],
            targetRoom: 'living-room',
            label: 'Living Room',
            type: 'navigation'
          }
        ]
      }
    ]
  }
];

export const getProjectById = (id: string): VRProject | undefined => {
  return vrProjects.find(project => project.id === id);
};

export const getRoomById = (projectId: string, roomId: string): VRRoom | undefined => {
  const project = getProjectById(projectId);
  return project?.rooms.find(room => room.id === roomId);
};

export const getHotspotsByRoom = (projectId: string, roomId: string): VRHotspot[] => {
  const room = getRoomById(projectId, roomId);
  return room?.hotspots || [];
};