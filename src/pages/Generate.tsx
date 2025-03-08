
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Wand2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { db } from "@/services/database";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlueprintCanvas from "@/components/BlueprintCanvas";
import { Blueprint, generateBlueprintAsync } from "@/services/blueprintGenerator";

const Generate = () => {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [canGenerate, setCanGenerate] = useState(false);

  useEffect(() => {
    const user = db.getCurrentUser();
    setIsLoggedIn(!!user);
    setCanGenerate(user ? db.canGenerateBlueprint() : true);
  }, []);

  const handleGenerate = async () => {
    if (!requirements.trim()) {
      setError("Please enter your requirements");
      return;
    }

    // Check if user is logged in and has free generations left
    const user = db.getCurrentUser();
    if (!user) {
      // Allow 3 free generations for anonymous users
      const anonymousGenerations = parseInt(localStorage.getItem("anonymousGenerations") || "0");
      if (anonymousGenerations >= 3) {
        setError("You've used all your free generations. Please create an account to continue.");
        toast.error("Free generation limit reached");
        return;
      }
      
      localStorage.setItem("anonymousGenerations", (anonymousGenerations + 1).toString());
    } else {
      // Check if the user has free generations left or is premium
      if (!db.canGenerateBlueprint()) {
        setError("You've used all your free generations. Please upgrade to premium to continue.");
        toast.error("Free generation limit reached");
        return;
      }
      
      // Increment usage count
      await db.incrementUsageCount();
    }

    setError(null);
    setIsLoading(true);

    try {
      // Generate the blueprint
      const generatedBlueprint = await generateBlueprintAsync(requirements);
      setBlueprint(generatedBlueprint);
      toast.success("Blueprint generated successfully!");
      
      // Update the UI about generations left
      setCanGenerate(user ? db.canGenerateBlueprint() : true);
    } catch (err) {
      setError("Failed to generate blueprint. Please try again.");
      toast.error("Generation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!blueprint) return;
    
    const user = db.getCurrentUser();
    
    if (!user) {
      toast.error("Please log in to save your blueprint");
      navigate("/login");
      return;
    }
    
    try {
      await db.saveBlueprint({
        title: "New Blueprint",
        description: "Generated blueprint",
        requirements,
        blueprint: JSON.stringify(blueprint),
      });
      
      toast.success("Blueprint saved to your dashboard");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to save blueprint");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Generate Your Blueprint</h1>
            <p className="text-muted-foreground">
              Describe your requirements in detail for the best results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-md animate-zoom-in">
              <CardHeader>
                <CardTitle>Building Requirements</CardTitle>
                <CardDescription>
                  Tell us about the building you want to create. Include details like land area,
                  number of rooms, dimensions, and any special requirements.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Textarea
                  placeholder="Example: I need a 2000 sq ft house with 3 bedrooms, 2 bathrooms, a kitchen, living room, and dining room. The lot is 50 x 40 feet."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={10}
                  className="resize-none"
                  disabled={isLoading}
                />
                
                {!isLoggedIn && (
                  <p className="text-sm text-muted-foreground mt-2">
                    You have {3 - parseInt(localStorage.getItem("anonymousGenerations") || "0")} free generations left. 
                    <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/register")}>
                      Create an account
                    </Button>{" "}
                    for more.
                  </p>
                )}
                
                {isLoggedIn && !canGenerate && (
                  <p className="text-sm text-muted-foreground mt-2">
                    You've used all your free generations.{" "}
                    <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/pricing")}>
                      Upgrade to premium
                    </Button>{" "}
                    for unlimited generations.
                  </p>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !canGenerate}
                >
                  {isLoading ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Blueprint
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-md h-full animate-zoom-in">
              <CardHeader>
                <CardTitle>Blueprint Preview</CardTitle>
                <CardDescription>
                  Your generated blueprint will appear here. You can customize it after generation.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="h-[400px]">
                {blueprint ? (
                  <BlueprintCanvas blueprint={blueprint} editable />
                ) : (
                  <div className="h-full border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <Wand2 className="mx-auto h-12 w-12 text-primary opacity-30 mb-4" />
                      <p className="text-muted-foreground">
                        {isLoading ? (
                          <span className="shimmer inline-block bg-muted rounded p-1">Generating your blueprint...</span>
                        ) : (
                          "Enter your requirements and generate a blueprint"
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-end">
                {blueprint && (
                  <Button onClick={handleSave}>
                    Save Blueprint
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-12 bg-secondary/30 rounded-lg p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Tips for Best Results</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc pl-5">
              <li>Specify the total area of your land (e.g., 2000 sq ft)</li>
              <li>Mention the number of rooms you need (e.g., 3 bedrooms, 2 bathrooms)</li>
              <li>Include special rooms (e.g., home office, game room, workshop)</li>
              <li>Describe any specific layout requirements (e.g., open floor plan)</li>
              <li>Mention if you need special features (e.g., basement, garage)</li>
              <li>Specify if you have specific dimensions (e.g., 50 ft x 40 ft lot)</li>
              <li>Describe the style of architecture if important</li>
              <li>Mention any accessibility requirements</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Generate;
