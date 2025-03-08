
interface Room {
  id: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  type: 'bedroom' | 'bathroom' | 'kitchen' | 'living' | 'dining' | 'other';
}

interface Door {
  id: string;
  roomId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  isExternal: boolean;
}

interface Window {
  id: string;
  roomId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface Blueprint {
  id: string;
  width: number;
  height: number;
  rooms: Room[];
  doors: Door[];
  windows: Window[];
}

// Helper function to generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Extract requirements from user input text
const extractRequirements = (text: string): any => {
  // This is a simplified version. In a real app, this would use NLP
  const landArea = text.match(/(\d+)\s*(?:sq\.?\s*(?:ft|m)|square\s*(?:feet|meters))/i);
  const bedrooms = text.match(/(\d+)\s*(?:bed(?:room)?s?)/i);
  const bathrooms = text.match(/(\d+)\s*(?:bath(?:room)?s?)/i);
  const kitchen = text.match(/(\d+)\s*(?:kitchen)/i);
  const living = text.match(/(?:living|lounge|family)\s*(?:room|area|space)/i);
  const dining = text.match(/(?:dining)\s*(?:room|area|space)/i);
  
  // Extract dimensions if provided
  const dimensions = text.match(/(\d+)\s*(?:x|by)\s*(\d+)/i);
  
  return {
    landArea: landArea ? parseInt(landArea[1]) : 2000,
    bedrooms: bedrooms ? parseInt(bedrooms[1]) : 2,
    bathrooms: bathrooms ? parseInt(bathrooms[1]) : 2,
    kitchen: kitchen ? parseInt(kitchen[1]) : 1,
    living: living ? 1 : 0,
    dining: dining ? 1 : 0,
    width: dimensions ? parseInt(dimensions[1]) : 50,
    height: dimensions ? parseInt(dimensions[2]) : 40,
  };
};

// Generate a blueprint based on requirements
export const generateBlueprint = (requirementsText: string): Blueprint => {
  const requirements = extractRequirements(requirementsText);
  
  // Calculate total room count
  const totalRooms = requirements.bedrooms + requirements.bathrooms + requirements.kitchen + 
                    requirements.living + requirements.dining;
  
  // Create the blueprint object
  const blueprint: Blueprint = {
    id: generateId(),
    width: requirements.width,
    height: requirements.height,
    rooms: [],
    doors: [],
    windows: [],
  };
  
  // Simple layout algorithm (in a real app, this would be much more sophisticated)
  let currentX = 0;
  let currentY = 0;
  const roomWidth = Math.floor(blueprint.width / 3);
  const roomHeight = Math.floor(blueprint.height / 2);
  
  // Add bedrooms
  for (let i = 0; i < requirements.bedrooms; i++) {
    const room: Room = {
      id: generateId(),
      name: `Bedroom ${i + 1}`,
      width: roomWidth,
      height: roomHeight,
      x: currentX,
      y: currentY,
      type: 'bedroom'
    };
    
    blueprint.rooms.push(room);
    
    // Add door
    blueprint.doors.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width / 2,
      y: room.y + room.height,
      width: 1,
      height: 0.1,
      rotation: 0,
      isExternal: false
    });
    
    // Add window
    blueprint.windows.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width,
      y: room.y + room.height / 2,
      width: 0.1,
      height: 1,
      rotation: 0
    });
    
    // Update position for next room
    currentX += roomWidth;
    if (currentX + roomWidth > blueprint.width) {
      currentX = 0;
      currentY += roomHeight;
    }
  }
  
  // Add bathrooms
  for (let i = 0; i < requirements.bathrooms; i++) {
    const room: Room = {
      id: generateId(),
      name: `Bathroom ${i + 1}`,
      width: Math.floor(roomWidth * 0.8),
      height: Math.floor(roomHeight * 0.8),
      x: currentX,
      y: currentY,
      type: 'bathroom'
    };
    
    blueprint.rooms.push(room);
    
    // Add door
    blueprint.doors.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width / 2,
      y: room.y + room.height,
      width: 0.8,
      height: 0.1,
      rotation: 0,
      isExternal: false
    });
    
    // Add window
    blueprint.windows.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width,
      y: room.y + room.height / 2,
      width: 0.1,
      height: 0.8,
      rotation: 0
    });
    
    // Update position for next room
    currentX += roomWidth;
    if (currentX + roomWidth > blueprint.width) {
      currentX = 0;
      currentY += roomHeight;
    }
  }
  
  // Add kitchen
  if (requirements.kitchen > 0) {
    const room: Room = {
      id: generateId(),
      name: 'Kitchen',
      width: roomWidth * 1.2,
      height: roomHeight,
      x: currentX,
      y: currentY,
      type: 'kitchen'
    };
    
    blueprint.rooms.push(room);
    
    // Add door
    blueprint.doors.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width / 2,
      y: room.y + room.height,
      width: 1,
      height: 0.1,
      rotation: 0,
      isExternal: false
    });
    
    // Add window
    blueprint.windows.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width,
      y: room.y + room.height / 2,
      width: 0.1,
      height: 1,
      rotation: 0
    });
    
    // Update position for next room
    currentX += roomWidth;
    if (currentX + roomWidth > blueprint.width) {
      currentX = 0;
      currentY += roomHeight;
    }
  }
  
  // Add living room
  if (requirements.living > 0) {
    const room: Room = {
      id: generateId(),
      name: 'Living Room',
      width: roomWidth * 1.5,
      height: roomHeight * 1.5,
      x: currentX,
      y: currentY,
      type: 'living'
    };
    
    blueprint.rooms.push(room);
    
    // Add door
    blueprint.doors.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width / 2,
      y: room.y + room.height,
      width: 1.2,
      height: 0.1,
      rotation: 0,
      isExternal: true
    });
    
    // Add windows
    blueprint.windows.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width,
      y: room.y + room.height / 3,
      width: 0.1,
      height: 1.5,
      rotation: 0
    });
    
    blueprint.windows.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width,
      y: room.y + room.height * 2/3,
      width: 0.1,
      height: 1.5,
      rotation: 0
    });
    
    // Update position for next room
    currentX += roomWidth * 1.5;
    if (currentX + roomWidth > blueprint.width) {
      currentX = 0;
      currentY += roomHeight * 1.5;
    }
  }
  
  // Add dining room
  if (requirements.dining > 0) {
    const room: Room = {
      id: generateId(),
      name: 'Dining Room',
      width: roomWidth * 1.2,
      height: roomHeight,
      x: currentX,
      y: currentY,
      type: 'dining'
    };
    
    blueprint.rooms.push(room);
    
    // Add door
    blueprint.doors.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width / 2,
      y: room.y + room.height,
      width: 1,
      height: 0.1,
      rotation: 0,
      isExternal: false
    });
    
    // Add window
    blueprint.windows.push({
      id: generateId(),
      roomId: room.id,
      x: room.x + room.width,
      y: room.y + room.height / 2,
      width: 0.1,
      height: 1,
      rotation: 0
    });
  }
  
  return blueprint;
};

// Simulate an async generation process
export const generateBlueprintAsync = async (requirementsText: string): Promise<Blueprint> => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  return generateBlueprint(requirementsText);
};
