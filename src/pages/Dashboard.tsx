
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Plus, FileText, Edit, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { db } from "@/services/database";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Blueprint } from "@/services/blueprintGenerator";
import BlueprintCanvas from "@/components/BlueprintCanvas";

const Dashboard = () => {
  const navigate = useNavigate();
  const [blueprints, setBlueprints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [blueprintToDelete, setBlueprintToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const user = db.getCurrentUser();
    
    if (!user) {
      toast.error("Please log in to access the dashboard");
      navigate("/login");
      return;
    }
    
    setCurrentUser(user);
    
    const loadBlueprints = async () => {
      try {
        const userBlueprints = await db.getBlueprints();
        setBlueprints(userBlueprints);
      } catch (err) {
        setError("Failed to load blueprints");
        toast.error("Failed to load blueprints");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBlueprints();
  }, [navigate]);

  const handleDeleteBlueprint = async (id) => {
    try {
      await db.deleteBlueprint(id);
      setBlueprints(blueprints.filter(bp => bp.id !== id));
      toast.success("Blueprint deleted successfully");
      setShowDeleteDialog(false);
      setBlueprintToDelete(null);
    } catch (err) {
      toast.error("Failed to delete blueprint");
    }
  };

  const confirmDelete = (blueprint) => {
    setBlueprintToDelete(blueprint);
    setShowDeleteDialog(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Blueprints</h1>
              <p className="text-muted-foreground">
                {currentUser?.isPremium 
                  ? "Premium account: Enjoy unlimited blueprint generations"
                  : `Free account: ${3 - (currentUser?.usageCount || 0)} generations remaining`
                }
              </p>
            </div>
            
            <Button onClick={() => navigate("/generate")}>
              <Plus className="mr-2 h-4 w-4" />
              New Blueprint
            </Button>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!currentUser?.isPremium && currentUser?.usageCount >= 3 && (
            <Alert className="mb-6 bg-primary/10 border-primary">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="flex justify-between items-center">
                <span>You've used all your free generations. Upgrade to premium for unlimited blueprints.</span>
                <Button onClick={() => navigate("/pricing")} variant="outline" size="sm">
                  Upgrade Now
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-[300px] animate-pulse">
                  <div className="h-full bg-muted"></div>
                </Card>
              ))}
            </div>
          ) : blueprints.length === 0 ? (
            <Card className="border-dashed border-2 p-8">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">No blueprints yet</h2>
                <p className="text-muted-foreground mb-4">
                  Create your first blueprint to see it here
                </p>
                <Button onClick={() => navigate("/generate")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Blueprint
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blueprints.map((blueprint) => (
                <Card key={blueprint.id} className="overflow-hidden flex flex-col h-full">
                  <div className="p-4 h-40 bg-muted/30 flex items-center justify-center">
                    {blueprint.blueprint && (
                      <BlueprintCanvas 
                        blueprint={JSON.parse(blueprint.blueprint)} 
                        editable={false} 
                        previewMode={true}
                      />
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{blueprint.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {blueprint.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground pb-2">
                    <p>Created: {new Date(blueprint.createdAt).toLocaleDateString()}</p>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/20 px-4 py-3 mt-auto">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigate(`/blueprint/${blueprint.id}`)}
                    >
                      Open
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Options
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/blueprint/${blueprint.id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => confirmDelete(blueprint)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blueprint</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{blueprintToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDeleteBlueprint(blueprintToDelete?.id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
