
import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, GitHub } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-block text-2xl font-medium mb-4">
              <span className="text-primary">Blueprint</span>
              <span className="font-light">Craft</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Create professional building blueprints instantly using AI technology.
              Design, customize, and export with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <GitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Blueprint Generation
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Custom Editing
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Export Options
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  AI Suggestions
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Advanced Templates
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/documentation" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} BlueprintCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
