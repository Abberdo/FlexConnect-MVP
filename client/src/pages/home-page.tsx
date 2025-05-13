import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, ArrowRight, Coffee, X, Sparkles, Loader2 } from "lucide-react";
import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import logoBgPath from "@assets/Brand Logo-01.jpeg";

// Import lazy-loaded section components
import {
  LazyHeroSection,
  LazyFeaturesSection,
  LazyBenefitsSection,
  LazyCtaSection
} from "@/components/home/lazy-sections";

export default function HomePage() {
  const [sassMode, setSassMode] = useState(true);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.2 });
  const isFeaturesInView = useInView(featuresRef, { once: false, amount: 0.2 });
  const isBenefitsInView = useInView(benefitsRef, { once: false, amount: 0.2 });
  
  const heroControls = useAnimation();
  const featureControls = useAnimation();
  const benefitControls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false // Use useEffect instead of useLayoutEffect for better performance
  });
  
  // Create a smoother scroll progress value with reduced updates
  const smoothProgress = useTransform(scrollYProgress, (latest) => {
    // Round to nearest 2% to reduce jitter and number of updates
    return Math.round(latest * 50) / 50;
  });
  
  // Parallax effects: elements move at different speeds while scrolling
  // Using very small values to make it subtle and reduce jank
  const imageOneY = useTransform(smoothProgress, [0, 1], [0, 30]);
  const imageTwoY = useTransform(smoothProgress, [0, 1], [0, -20]);
  const imageThreeY = useTransform(smoothProgress, [0, 1], [0, 15]);
  
  // Peek-a-boo effects: images that reveal as you scroll (with minimal values)
  const peekOneScale = useTransform(smoothProgress, [0, 0.3], [0.95, 1]);
  const peekOneOpacity = useTransform(smoothProgress, [0, 0.2], [0.3, 0.95]);
  const peekOneRotate = useTransform(smoothProgress, [0, 0.5], [-2, 2]);
  
  // Smoothed animations for peek-from-bottom effect with smaller motion
  const peekTwoY = useTransform(smoothProgress, [0.2, 0.5], [20, -10]);
  const peekTwoOpacity = useTransform(smoothProgress, [0.2, 0.4], [0.3, 0.9]);
  const peekTwoScale = useTransform(smoothProgress, [0.2, 0.5], [0.97, 1.02]);
  
  // Animation for element that peeks in from the side (more subtle)
  const peekFromSide = useTransform(smoothProgress, [0.4, 0.7], [20, -3]);
  
  // Load sass mode from localStorage only once at component mount
  useEffect(() => {
    const savedSassMode = localStorage.getItem('sass-mode');
    if (savedSassMode !== null) {
      setSassMode(savedSassMode === 'true');
    }
  }, []);
  
  // Separate effect to handle changes to sassMode
  useEffect(() => {
    // Only dispatch events when toggle changes, not on initial load
    localStorage.setItem('sass-mode', sassMode.toString());
    
    // Dispatch custom event when sass mode changes
    window.dispatchEvent(
      new CustomEvent('sass-mode-toggle', { detail: { enabled: sassMode } })
    );
  }, [sassMode]);
  
  // Animation controls for section transitions
  useEffect(() => {
    if (isHeroInView) {
      heroControls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } });
    } else {
      heroControls.start({ opacity: 0, y: 50, transition: { duration: 0.5 } });
    }
  }, [isHeroInView, heroControls]);
  
  useEffect(() => {
    if (isFeaturesInView) {
      featureControls.start({ opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } });
    } else {
      featureControls.start({ opacity: 0, y: 30 });
    }
  }, [isFeaturesInView, featureControls]);
  
  useEffect(() => {
    if (isBenefitsInView) {
      benefitControls.start({ opacity: 1, x: 0, transition: { duration: 0.7 } });
    } else {
      benefitControls.start({ opacity: 0, x: -30 });
    }
  }, [isBenefitsInView, benefitControls]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" ref={containerRef}>
      <Navbar />
      
      <main className="flex-1 overflow-hidden" style={{ position: 'relative', willChange: 'transform' }}>
        {/* Sass Mode Toggle */}
        <div className="fixed top-20 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <Switch 
              id="sass-mode" 
              checked={sassMode}
              onCheckedChange={setSassMode}
            />
            <Label htmlFor="sass-mode" className="text-sm font-medium">
              {sassMode ? "Sass On 💁‍♀️" : "Sass Off 😴"}
            </Label>
          </div>
        </div>
        
        {/* Enhanced Parallax Background Images with Peek-a-boo Effect */}
        {/* Brand logo peek-a-boo element */}
        <motion.div 
          className="absolute top-10 right-0 w-96 h-96 z-0 overflow-hidden"
          style={{ 
            y: imageOneY, 
            scale: peekOneScale, 
            opacity: peekOneOpacity,
            rotate: peekOneRotate,
            transformOrigin: "top right"
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-8 border-white/20 shadow-xl">
            <img 
              src={logoBgPath} 
              alt="SASSED Background" 
              className="w-full h-full object-cover transform scale-110"
            />
          </div>
        </motion.div>
        
        {/* Abstract shapes that move at different speeds */}
        <motion.div 
          className="absolute top-80 -left-32 w-96 h-96 opacity-10 z-0 overflow-visible"
          style={{ y: imageTwoY, translateZ: 0 }}
        >
          <motion.div 
            className="w-full h-full rounded-full bg-accent"
            whileInView={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>
        
        {/* Peek-a-boo decorative element that slides in from right */}
        <motion.div 
          className="absolute top-1/2 -right-20 w-80 z-10"
          style={{ x: peekFromSide, translateZ: 0 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-secondary to-primary rounded-l-full p-6 shadow-lg"
            whileInView={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          >
            <Sparkles className="h-10 w-10 text-white/80" />
          </motion.div>
        </motion.div>
        
        {/* Element that peeks up from bottom */}
        <motion.div 
          className="absolute bottom-0 left-1/3 w-72 h-72 opacity-70 z-0"
          style={{ 
            y: peekTwoY,
            opacity: peekTwoOpacity,
            scale: peekTwoScale,
            translateZ: 0,
            willChange: 'transform, opacity'
          }}
        >
          <div className="w-full h-full rounded-tr-full rounded-tl-full bg-primary/30 backdrop-blur-md flex items-center justify-center">
            <div className="bg-white p-4 rounded-full shadow-inner">
              <img 
                src={logoBgPath} 
                alt="Logo Peek" 
                className="w-20 h-20 object-contain rounded-full"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Original parallax circles with enhanced animations */}
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 opacity-15 z-0"
          style={{ y: imageThreeY, translateZ: 0 }}
        >
          <motion.div 
            className="w-full h-full rounded-full bg-primary"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      
        {/* Lazy-loaded Hero Section */}
        <Suspense fallback={<div className="min-h-[60vh] bg-gradient-to-r from-primary to-primary/80 animate-pulse flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-white" /></div>}>
          <LazyHeroSection 
            sassMode={sassMode} 
            heroRef={heroRef} 
            isHeroInView={isHeroInView} 
          />
        </Suspense>

        {/* Lazy-loaded Features Section */}
        <Suspense fallback={<div className="min-h-[40vh] bg-white animate-pulse flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
          <LazyFeaturesSection 
            sassMode={sassMode} 
            featuresRef={featuresRef} 
            isFeaturesInView={isFeaturesInView}
            peekOneScale={peekOneScale}
            peekOneOpacity={peekOneOpacity}
            peekOneRotate={peekOneRotate}
            peekFromSide={peekFromSide}
          />
        </Suspense>

        {/* Lazy-loaded Benefits Section */}
        <Suspense fallback={<div className="min-h-[40vh] bg-gray-50 animate-pulse flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
          <LazyBenefitsSection 
            sassMode={sassMode} 
            benefitsRef={benefitsRef} 
            isBenefitsInView={isBenefitsInView}
            peekTwoY={peekTwoY}
            peekTwoOpacity={peekTwoOpacity}
            peekTwoScale={peekTwoScale}
            imageThreeY={imageThreeY}
          />
        </Suspense>

        {/* Lazy-loaded CTA Section */}
        <Suspense fallback={<div className="min-h-[30vh] bg-primary/40 animate-pulse flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-white" /></div>}>
          <LazyCtaSection sassMode={sassMode} />
        </Suspense>
      </main>

      <Footer
        sassMode={sassMode}
        onToggleSassMode={() => setSassMode(!sassMode)}
      />
    </div>
  );
}