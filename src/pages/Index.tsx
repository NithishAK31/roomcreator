
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, PlusCircle, FileSearch, Settings, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/30 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16 animate-fade-in">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              Introducing BlueprintCraft
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Generate professional building
              <span className="text-primary block">blueprints instantly</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Simply describe your requirements and our AI will create detailed, customizable blueprints 
              for your construction projects. Save time, reduce costs, and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/generate">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
          
          <div className="relative mx-auto rounded-xl overflow-hidden shadow-2xl max-w-4xl animate-slide-in">
            <div className="aspect-[16/9] bg-muted flex items-center justify-center">
              <div className="w-full h-full bg-white p-6">
                <div className="h-full border-2 border-primary/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PlusCircle className="mx-auto h-12 w-12 text-primary opacity-50 mb-4" />
                    <p className="text-muted-foreground">Blueprint preview will appear here</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-10 pointer-events-none"></div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose BlueprintCraft?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our powerful features make building design accessible to everyone,
              saving you time and money on your construction projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Instant Generation</h3>
              <p className="text-muted-foreground">
                Generate complete building blueprints in seconds based on your text description. 
                No more waiting for days or weeks.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Fully Customizable</h3>
              <p className="text-muted-foreground">
                Edit and customize every aspect of your blueprint with our intuitive 
                editor. Adjust rooms, doors, windows, and more.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <FileSearch className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Intelligent NLP</h3>
              <p className="text-muted-foreground">
                Our advanced natural language processing understands your requirements 
                and converts them into accurate blueprints.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Building Codes Compliant</h3>
              <p className="text-muted-foreground">
                Our AI ensures your blueprints follow standard building codes and 
                best practices in architectural design.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Export Options</h3>
              <p className="text-muted-foreground">
                Export your blueprints in various formats suitable for contractors, 
                architects, or personal use.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">3 Free Generations</h3>
              <p className="text-muted-foreground">
                Try BlueprintCraft with three free blueprint generations. Upgrade 
                to premium for unlimited access.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting your building blueprint is simple and fast with our three-step process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
                <div className="absolute -right-1/2 top-1/2 h-0.5 w-full bg-primary/20 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-medium mb-2">Describe Your Needs</h3>
              <p className="text-muted-foreground">
                Enter your requirements in plain text - land area, number of rooms, special features, and any other specifications.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
                <div className="absolute -right-1/2 top-1/2 h-0.5 w-full bg-primary/20 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-medium mb-2">AI Generates Blueprint</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your requirements and generates a detailed 2D blueprint with rooms, doors, windows, and layout.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Customize & Export</h3>
              <p className="text-muted-foreground">
                Edit the blueprint to your liking, add your personal touch, and export it in your preferred format.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5 border-y border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to create your blueprint?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start with 3 free generations. No credit card required.
          </p>
          <Button size="lg" asChild>
            <Link to="/generate">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
