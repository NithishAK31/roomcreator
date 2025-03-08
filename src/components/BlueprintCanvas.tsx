
import React, { useEffect, useRef, useState } from "react";
import { Blueprint } from "@/services/blueprintGenerator";
import { cn } from "@/lib/utils";
import { Pencil, Save, Trash, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface BlueprintCanvasProps {
  blueprint: Blueprint;
  editable?: boolean;
  onSave?: (blueprint: Blueprint) => void;
}

const roomTypeColors = {
  bedroom: "#90CAF9",  // Light blue
  bathroom: "#80DEEA", // Light cyan
  kitchen: "#A5D6A7",  // Light green
  living: "#FFCC80",   // Light orange
  dining: "#CE93D8",   // Light purple
  other: "#EF9A9A",    // Light red
};

const BlueprintCanvas: React.FC<BlueprintCanvasProps> = ({
  blueprint,
  editable = false,
  onSave
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [localBlueprint, setLocalBlueprint] = useState<Blueprint>(blueprint);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedRoom, setDraggedRoom] = useState<string | null>(null);

  // Convert blueprint coordinates to canvas coordinates
  const toCanvasCoords = (x: number, y: number, canvasWidth: number, canvasHeight: number) => {
    const maxDim = Math.max(localBlueprint.width, localBlueprint.height);
    const unit = Math.min(canvasWidth, canvasHeight) / maxDim * scale;
    
    // Center the blueprint
    const offsetX = (canvasWidth - localBlueprint.width * unit) / 2;
    const offsetY = (canvasHeight - localBlueprint.height * unit) / 2;
    
    return {
      x: offsetX + x * unit,
      y: offsetY + y * unit,
      unit
    };
  };

  // Convert canvas coordinates to blueprint coordinates
  const toBlueprintCoords = (canvasX: number, canvasY: number, canvasWidth: number, canvasHeight: number) => {
    const maxDim = Math.max(localBlueprint.width, localBlueprint.height);
    const unit = Math.min(canvasWidth, canvasHeight) / maxDim * scale;
    
    // Center the blueprint
    const offsetX = (canvasWidth - localBlueprint.width * unit) / 2;
    const offsetY = (canvasHeight - localBlueprint.height * unit) / 2;
    
    return {
      x: (canvasX - offsetX) / unit,
      y: (canvasY - offsetY) / unit
    };
  };

  // Draw the blueprint on the canvas
  const drawBlueprint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = canvas;
    
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw the outline
    const { x: startX, y: startY, unit } = toCanvasCoords(0, 0, width, height);
    
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      startX,
      startY,
      localBlueprint.width * unit,
      localBlueprint.height * unit
    );
    
    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= localBlueprint.width; i += 5) {
      const { x, y } = toCanvasCoords(i, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, startY + localBlueprint.height * unit);
      ctx.stroke();
    }
    
    for (let i = 0; i <= localBlueprint.height; i += 5) {
      const { x, y } = toCanvasCoords(0, i, width, height);
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + localBlueprint.width * unit, y);
      ctx.stroke();
    }
    
    // Draw rooms
    localBlueprint.rooms.forEach(room => {
      const { x, y } = toCanvasCoords(room.x, room.y, width, height);
      
      // Fill room based on type
      ctx.fillStyle = roomTypeColors[room.type];
      ctx.fillRect(x, y, room.width * unit, room.height * unit);
      
      // Highlight selected room
      if (selectedRoom === room.id) {
        ctx.strokeStyle = '#1E88E5';
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 2, y - 2, room.width * unit + 4, room.height * unit + 4);
      }
      
      // Draw room outline
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, room.width * unit, room.height * unit);
      
      // Draw room name
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(room.name, x + room.width * unit / 2, y + room.height * unit / 2);
    });
    
    // Draw doors
    localBlueprint.doors.forEach(door => {
      const { x, y } = toCanvasCoords(door.x, door.y, width, height);
      
      ctx.fillStyle = door.isExternal ? '#555' : '#888';
      
      if (door.rotation === 0) {
        // Horizontal door
        ctx.fillRect(x - door.width * unit / 2, y - door.height * unit / 2, door.width * unit, door.height * unit);
      } else {
        // Vertical door
        ctx.fillRect(x - door.height * unit / 2, y - door.width * unit / 2, door.height * unit, door.width * unit);
      }
    });
    
    // Draw windows
    localBlueprint.windows.forEach(window => {
      const { x, y } = toCanvasCoords(window.x, window.y, width, height);
      
      ctx.strokeStyle = '#59C1FF';
      ctx.lineWidth = 2;
      
      if (window.rotation === 0) {
        // Horizontal window
        ctx.strokeRect(x - window.width * unit / 2, y - window.height * unit / 2, window.width * unit, window.height * unit);
      } else {
        // Vertical window
        ctx.strokeRect(x - window.height * unit / 2, y - window.width * unit / 2, window.height * unit, window.width * unit);
      }
    });
  };

  // Handle mouse down event
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!editMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if a room was clicked
    for (const room of localBlueprint.rooms) {
      const { x: roomX, y: roomY, unit } = toCanvasCoords(room.x, room.y, canvas.width, canvas.height);
      if (
        x >= roomX && x <= roomX + room.width * unit &&
        y >= roomY && y <= roomY + room.height * unit
      ) {
        setSelectedRoom(room.id);
        setDraggedRoom(room.id);
        setDragging(true);
        setDragStart({ x, y });
        return;
      }
    }
    
    // If no room was clicked, deselect
    setSelectedRoom(null);
  };

  // Handle mouse move event
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!editMode || !dragging || !draggedRoom) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const dx = x - dragStart.x;
    const dy = y - dragStart.y;
    
    const { unit } = toCanvasCoords(0, 0, canvas.width, canvas.height);
    
    setLocalBlueprint(prev => {
      const newBlueprint = { ...prev };
      const roomIndex = newBlueprint.rooms.findIndex(r => r.id === draggedRoom);
      
      if (roomIndex !== -1) {
        newBlueprint.rooms = [...newBlueprint.rooms];
        newBlueprint.rooms[roomIndex] = {
          ...newBlueprint.rooms[roomIndex],
          x: newBlueprint.rooms[roomIndex].x + dx / unit,
          y: newBlueprint.rooms[roomIndex].y + dy / unit,
        };
      }
      
      return newBlueprint;
    });
    
    setDragStart({ x, y });
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    setDragging(false);
    setDraggedRoom(null);
  };

  // Handle saving the blueprint
  const handleSave = () => {
    if (onSave) {
      onSave(localBlueprint);
      setEditMode(false);
      toast.success("Blueprint saved successfully");
    }
  };

  // Handle deleting a room
  const handleDeleteRoom = () => {
    if (!selectedRoom) return;
    
    setLocalBlueprint(prev => {
      const newBlueprint = { ...prev };
      newBlueprint.rooms = newBlueprint.rooms.filter(r => r.id !== selectedRoom);
      
      // Also remove associated doors and windows
      newBlueprint.doors = newBlueprint.doors.filter(d => d.roomId !== selectedRoom);
      newBlueprint.windows = newBlueprint.windows.filter(w => w.roomId !== selectedRoom);
      
      return newBlueprint;
    });
    
    setSelectedRoom(null);
    toast.success("Room deleted");
  };

  // Handle adding a new room
  const handleAddRoom = () => {
    const id = Math.random().toString(36).substring(2, 15);
    
    setLocalBlueprint(prev => {
      const newBlueprint = { ...prev };
      newBlueprint.rooms = [
        ...newBlueprint.rooms,
        {
          id,
          name: `Room ${newBlueprint.rooms.length + 1}`,
          width: 10,
          height: 8,
          x: 10,
          y: 10,
          type: 'other',
        },
      ];
      
      return newBlueprint;
    });
    
    setSelectedRoom(id);
    toast.success("New room added");
  };

  // Resize the canvas when the window or container size changes
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;
    
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    
    drawBlueprint();
  };

  // Update the canvas when the blueprint changes
  useEffect(() => {
    setLocalBlueprint(blueprint);
  }, [blueprint]);

  // Draw the blueprint when the local blueprint changes
  useEffect(() => {
    drawBlueprint();
  }, [localBlueprint, scale, selectedRoom]);

  // Set up the canvas and event listeners
  useEffect(() => {
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {editable && (
        <div className="flex items-center justify-between p-2 bg-secondary/30 border border-border rounded-t-lg">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={editMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditMode(!editMode)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    {editMode ? "Editing" : "Edit"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {editMode ? "Exit edit mode" : "Enter edit mode"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {editMode && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddRoom}
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add Room
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Add a new room to the blueprint
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {selectedRoom && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDeleteRoom}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete Room
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Delete the selected room
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
                  >
                    -
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Zoom out
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <span className="text-sm">
              {Math.round(scale * 100)}%
            </span>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScale(prev => Math.min(2, prev + 0.1))}
                  >
                    +
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Zoom in
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {editMode && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Save changes
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      )}
      
      <div
        ref={containerRef}
        className={cn(
          "relative flex-1 bg-white overflow-hidden",
          editable ? "rounded-b-lg" : "rounded-lg",
          editMode && "cursor-move"
        )}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
};

export default BlueprintCanvas;
