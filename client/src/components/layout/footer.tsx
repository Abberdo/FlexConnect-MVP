import { Link } from "wouter";
import { useState, useEffect } from "react";

interface FooterProps {
  sassMode?: boolean;
  onToggleSassMode?: () => void;
}

export function Footer({ sassMode, onToggleSassMode }: FooterProps = {}) {
  const [sassyFooterText, setSassyFooterText] = useState(false);
  
  // Check if sass mode is enabled from localStorage or parent component
  useEffect(() => {
    // If sassMode is provided as a prop, use it
    if (typeof sassMode !== 'undefined') {
      setSassyFooterText(sassMode);
      return;
    }
    
    // Otherwise try to get it from localStorage
    const savedSassMode = localStorage.getItem('sass-mode');
    if (savedSassMode !== null) {
      setSassyFooterText(savedSassMode === 'true');
    }
    
    // Listen for sass mode toggle events
    const handleSassToggle = (e: CustomEvent) => {
      setSassyFooterText(e.detail.enabled);
    };
    
    window.addEventListener('sass-mode-toggle' as any, handleSassToggle);
    
    return () => {
      window.removeEventListener('sass-mode-toggle' as any, handleSassToggle);
    };
  }, [sassMode]);

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex items-center justify-center mb-4 md:mb-0 md:order-1">
          <img 
            src="/assets/brand-logo.jpeg" 
            alt="SASSED Logo" 
            className="h-8 w-auto object-contain mr-2" 
          />
          <span className="text-foreground font-semibold">SASSED</span>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          <a 
            href="https://facebook.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">Facebook</span>
            <svg 
              className="h-5 w-5" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
          
          <a 
            href="https://twitter.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">Twitter</span>
            <svg 
              className="h-5 w-5" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path 
                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" 
              />
            </svg>
          </a>
          
          <a 
            href="https://linkedin.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">LinkedIn</span>
            <svg 
              className="h-5 w-5" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1 flex flex-col items-center gap-2">
          <div 
            data-tutorial="sass-toggle" 
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onClick={() => {
              if (onToggleSassMode) {
                // Use the parent component's toggle function if provided
                onToggleSassMode();
              } else {
                // Otherwise handle it locally
                const newSassMode = !sassyFooterText;
                setSassyFooterText(newSassMode);
                localStorage.setItem('sass-mode', newSassMode.toString());
                
                // Dispatch an event that can be listened to by other components
                const event = new CustomEvent('sass-mode-toggle', { 
                  detail: { enabled: newSassMode } 
                });
                window.dispatchEvent(event);
              }
            }}
          >
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${sassyFooterText ? 'bg-secondary' : 'bg-muted'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sassyFooterText ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm font-medium">
              {sassyFooterText ? "Savigail Sass Mode: On" : "Savigail Sass Mode: Off"}
            </span>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SASSED, Inc. All rights reserved. 
            {sassyFooterText ? (
              <span className="ml-1 text-secondary">Where Savigail makes the rules & doesn't apologize for it. 💅</span>
            ) : (
              <span className="ml-1">Founded by Abigail Desautels.</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
