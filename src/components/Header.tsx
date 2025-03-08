
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { db } from "@/services/database";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = db.getCurrentUser();

  const handleLogout = async () => {
    try {
      await db.logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-medium tracking-tight hover:opacity-80 transition-opacity duration-200"
            >
              <span className="text-primary">Blueprint</span>
              <span className="font-light">Craft</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/features" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link 
              to="/gallery" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Gallery
            </Link>
            {!currentUser ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium"
                >
                  Sign In
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => navigate("/register")}
                  className="text-sm font-medium"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/dashboard")}
                  className="mr-2 text-sm font-medium"
                >
                  Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {currentUser.name || currentUser.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {!currentUser.isPremium && (
                      <DropdownMenuItem asChild>
                        <Link to="/pricing">Upgrade to Premium</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-slide-in">
          <div className="px-4 pt-2 pb-4 space-y-4 bg-background border-t border-border">
            <Link 
              to="/features" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/gallery" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            {!currentUser ? (
              <div className="pt-2 flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="pt-2 space-y-3">
                <div className="font-medium">{currentUser.name || currentUser.email}</div>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/dashboard");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Profile
                  </Button>
                  {!currentUser.isPremium && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        navigate("/pricing");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Upgrade to Premium
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
