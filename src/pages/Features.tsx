
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Powerful Blueprint Features</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Create professional building blueprints instantly with our AI-powered tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Generation</h3>
              <p className="text-muted-foreground mb-4">
                Generate complete building blueprints in seconds from text descriptions using our advanced AI.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Editing</h3>
              <p className="text-muted-foreground mb-4">
                Edit and customize your generated blueprints with our intuitive drag-and-drop interface.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Export Options</h3>
              <p className="text-muted-foreground mb-4">
                Export your blueprints in multiple formats including PDF, PNG, CAD, and more.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Suggestions</h3>
              <p className="text-muted-foreground mb-4">
                Get intelligent design suggestions to optimize space utilization and improve layout efficiency.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Templates Library</h3>
              <p className="text-muted-foreground mb-4">
                Access a growing library of professional templates for different building types and styles.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cloud Storage</h3>
              <p className="text-muted-foreground mb-4">
                Save and access your blueprints from anywhere with secure cloud storage for premium subscribers.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate("/generate")} 
              size="lg" 
              className="mr-4"
            >
              Try It Now
            </Button>
            <Button 
              onClick={() => navigate("/pricing")} 
              variant="outline" 
              size="lg"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
