import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import logoBgPath from "@assets/Brand Logo-01.jpeg";

interface HeroSectionProps {
  sassMode: boolean;
  heroRef: React.RefObject<HTMLElement>;
  isHeroInView: boolean;
}

const HeroSection = ({ sassMode, heroRef, isHeroInView }: HeroSectionProps) => {
  const heroControls = useAnimation();

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start({ opacity: 1, y: 0 });
    } else {
      heroControls.start({ opacity: 0, y: -30 });
    }
  }, [isHeroInView, heroControls]);

  return (
    <section 
      ref={heroRef}
      className="relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 overflow-hidden" 
      style={{ position: 'relative' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-primary">SASSED</span>
            <span className="block text-accent mt-3">
              {sassMode 
                ? "Where Freelancers and Clients Actually Connect" 
                : "The Intelligent Freelance Marketplace"}
            </span>
          </motion.h1>
          <motion.p 
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {sassMode 
              ? "Stop wasting time on sketchy job platforms. Let us match you with clients who won't waste your time (or money)."
              : "Our AI-powered platform matches skilled freelancers with the perfect clients, creating successful partnerships."}
          </motion.p>
          <motion.div 
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="rounded-md shadow">
              <Link href="/auth">
                <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md md:py-4 md:text-lg md:px-10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;