
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const blueprintSamples = [
  {
    id: 1,
    title: "Modern Single Family Home",
    description: "3 bedroom, 2 bathroom single-family home with open floor plan",
    imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Modern+Home+Blueprint",
  },
  {
    id: 2,
    title: "Studio Apartment",
    description: "Efficient 500 sq ft studio apartment layout",
    imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Studio+Apartment+Blueprint",
  },
  {
    id: 3,
    title: "Office Building",
    description: "3-story office building with collaborative spaces",
    imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Office+Building+Blueprint",
  },
  {
    id: 4,
    title: "Duplex Residence",
    description: "2-unit residential duplex with shared common areas",
    imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Duplex+Blueprint",
  },
  {
    id: 5,
    title: "Retail Space",
    description: "Commercial retail space with storage and customer areas",
    imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Retail+Space+Blueprint",
  },
  {
    id: 6,
    title: "Family Cabin",
    description: "Weekend retreat cabin with loft and wraparound porch",
    imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Cabin+Blueprint",
  },
];

const Gallery = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Blueprint Gallery</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Browse examples of blueprints created with BlueprintCraft
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blueprintSamples.map((blueprint) => (
              <Card key={blueprint.id} className="overflow-hidden flex flex-col h-full">
                <div className="aspect-video relative">
                  <img 
                    src={blueprint.imageSrc} 
                    alt={blueprint.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-medium mb-1">{blueprint.title}</h3>
                  <p className="text-muted-foreground text-sm">{blueprint.description}</p>
                </div>
                <CardFooter className="border-t bg-muted/20 px-4 py-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate("/generate")}
                    className="ml-auto text-primary"
                  >
                    Create Similar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg mb-6">
              Ready to create your own custom blueprint?
            </p>
            <Button 
              onClick={() => navigate("/generate")} 
              size="lg"
            >
              Start Creating
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
