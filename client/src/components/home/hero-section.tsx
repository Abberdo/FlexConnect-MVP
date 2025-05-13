import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Star } from "lucide-react";
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
      className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary/80 text-white py-20 md:py-28 overflow-hidden" 
      style={{ position: 'relative' }}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute inset-0 w-full h-full opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/20" />
        <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-white/10" />
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-white/30" />
      </motion.div>

      {/* Logo watermark */}
      <div className="absolute right-0 bottom-0 w-64 h-64 opacity-10 overflow-hidden">
        <img 
          src={logoBgPath} 
          alt="SASSED Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-3xl">
            {/* Banner tag */}
            <motion.div 
              className="inline-flex items-center p-2 px-4 bg-white/10 backdrop-blur-sm rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4 mr-2 text-secondary" />
              <span className="text-sm font-medium text-white">
                {sassMode 
                  ? "No BS. Just Great Connections." 
                  : "AI-Powered Freelance Matching"}
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="block">
                {sassMode 
                  ? "Find Better Clients." 
                  : "Connect with the Right"}
              </span>
              <span className="block mt-2 text-secondary font-black">
                {sassMode 
                  ? "Get Paid Your Worth." 
                  : "Talent. Always."}
              </span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl text-white/90 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {sassMode 
                ? "SASSED connects freelancers with clients who value quality over cost. No more lowball offers, sketchy payment terms, or unreasonable demands."
                : "Our intelligent matching algorithm connects skilled freelancers with the perfect clients, creating successful professional relationships with higher satisfaction rates."}
            </motion.p>
            
            {/* Review stars - only shown in non-sass mode */}
            {!sassMode && (
              <motion.div 
                className="mt-5 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <div className="flex text-yellow-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-white/80 text-sm">Over 2,000 five-star ratings</span>
              </motion.div>
            )}
            
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/auth">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-medium"
                  asChild
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex items-center"
                  >
                    {sassMode ? "Let's Do This" : "Get Started"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {sassMode ? "Convince Me First" : "See How It Works"}
                </motion.div>
              </Button>
            </motion.div>
          </div>
          
          {/* Right side stats card - only visible on larger screens */}
          <motion.div 
            className="hidden lg:block relative mt-12 lg:mt-0 lg:ml-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-xl">
              <div className="text-center px-4 py-2">
                <div className="text-4xl font-bold text-secondary">
                  {sassMode ? "87%" : "93%"}
                </div>
                <div className="text-sm mt-1 text-white/80">
                  {sassMode ? "Higher payment rate than traditional platforms" : "Match satisfaction rate"}
                </div>
              </div>
              
              <div className="h-px bg-white/20 my-4" />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-2">
                  <div className="text-2xl font-bold text-white">
                    {sassMode ? "5hrs" : "48hrs"}
                  </div>
                  <div className="text-xs mt-1 text-white/80">
                    {sassMode ? "Average time to first response" : "Average match time"}
                  </div>
                </div>
                <div className="text-center p-2">
                  <div className="text-2xl font-bold text-white">
                    {sassMode ? "$3.8k" : "5k+"}
                  </div>
                  <div className="text-xs mt-1 text-white/80">
                    {sassMode ? "Avg. monthly freelancer earnings" : "Active professionals"}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-sm text-white/70 text-center">
                  {sassMode 
                    ? "We don't waste your time with bad matches" 
                    : "Join our growing community of professionals"}
                </div>
              </div>
            </div>
            
            {/* Decorative elements behind card */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full -z-10" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary rounded-full -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Animated wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <motion.path 
            fill="#ffffff" 
            fillOpacity="0.1"
            d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,176C672,171,768,117,864,106.7C960,96,1056,128,1152,154.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 0.1 }}
            transition={{ duration: 1.5 }}
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;