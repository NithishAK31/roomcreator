
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { db } from "@/services/database";
import { toast } from "sonner";

const PricingTier = ({
  title,
  price,
  description,
  features,
  buttonText,
  isPremium,
  className = "",
}) => {
  const navigate = useNavigate();
  const currentUser = db.getCurrentUser();
  
  const handleClick = async () => {
    if (isPremium) {
      if (!currentUser) {
        toast.info("Please sign in to upgrade to premium");
        navigate("/login");
        return;
      }
      
      try {
        await db.updateUserToPremium();
        toast.success("Successfully upgraded to Premium!");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Failed to upgrade. Please try again.");
      }
    } else {
      navigate("/register");
    }
  };
  
  return (
    <Card className={`flex flex-col h-full shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">${price}</span>
          {price > 0 && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleClick} 
          className="w-full" 
          variant={isPremium ? "default" : "outline"}
          disabled={currentUser && currentUser.isPremium && isPremium}
        >
          {currentUser && currentUser.isPremium && isPremium 
            ? "Current Plan" 
            : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that's right for you and start creating amazing blueprints today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingTier
              title="Free"
              price={0}
              description="Perfect for trying out the platform"
              features={[
                "Generate up to 3 blueprints",
                "Basic editing tools",
                "PNG export option",
                "24 hour blueprint storage",
                "Community support"
              ]}
              buttonText="Get Started"
              isPremium={false}
            />
            
            <PricingTier
              title="Premium"
              price={9.99}
              description="Everything you need for professional blueprints"
              features={[
                "Unlimited blueprint generations",
                "Advanced editing tools",
                "Export to PDF, PNG, CAD formats",
                "Unlimited cloud storage",
                "AI design suggestions",
                "Priority support",
                "Access to template library"
              ]}
              buttonText="Upgrade to Premium"
              isPremium={true}
              className="border-primary"
            />
          </div>
          
          <div className="mt-16 bg-secondary/30 rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Can I try the premium features before subscribing?</h3>
                <p className="text-muted-foreground">
                  Yes! The free plan allows you to generate up to 3 blueprints with basic features, giving you a chance to experience the platform before committing.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">How do I upgrade to the premium plan?</h3>
                <p className="text-muted-foreground">
                  Simply click on the "Upgrade to Premium" button, create an account if you haven't already, and follow the subscription process. Your account will be upgraded instantly.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Can I cancel my premium subscription?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time from your account settings. You'll continue to have premium access until the end of your billing cycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Are there team or enterprise plans available?</h3>
                <p className="text-muted-foreground">
                  We're working on team and enterprise plans with additional features and collaboration tools. Contact us for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
