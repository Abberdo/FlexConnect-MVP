import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, ArrowRight, Coffee, X, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import logoBgPath from "@assets/Brand Logo-01.jpeg";

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
    offset: ["start start", "end end"]
  });
  
  // Parallax effects: elements move at different speeds while scrolling
  const imageOneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageTwoY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageThreeY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  
  // Peek-a-boo effects: images that reveal as you scroll (with smoother values)
  const peekOneScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const peekOneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 0.6, 0.8]);
  const peekOneRotate = useTransform(scrollYProgress, [0, 0.5], [-5, 5]);
  
  // Smoothed animations for peek-from-bottom effect with better values
  const peekTwoY = useTransform(scrollYProgress, [0.2, 0.5], [60, -25]);
  const peekTwoOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 0.9]);
  const peekTwoScale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1.05]);
  
  // Animation for element that peeks in from the side (smoother)
  const peekFromSide = useTransform(scrollYProgress, [0.4, 0.7], [60, -10]);
  
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
      
      <main className="flex-1 relative overflow-hidden" style={{ position: 'relative' }}>
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
          style={{ y: imageTwoY }}
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
          style={{ x: peekFromSide }}
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
            scale: peekTwoScale
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
          style={{ y: imageThreeY }}
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
      
        {/* Hero Section with Peek-a-boo Effect */}
        <section 
          ref={heroRef}
          className="bg-gradient-to-r from-primary to-primary/80 text-white relative z-10 overflow-hidden"
          style={{ position: 'relative' }}
        >
          {/* Peek-a-boo diagonal image container */}
          <motion.div 
            className="absolute -bottom-16 -right-16 w-96 h-96 origin-bottom-right rotate-12 opacity-20 z-0"
            style={{
              scale: peekOneScale,
              opacity: peekOneOpacity,
            }}
          >
            <img 
              src={logoBgPath} 
              alt="Decorative Background" 
              className="w-full h-full object-cover rounded-tl-3xl blur-sm"
            />
          </motion.div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
            <motion.div 
              className="text-center md:text-left md:max-w-2xl lg:max-w-3xl"
              animate={heroControls}
              initial={{ opacity: 0, y: 50 }}
            >
              <motion.div 
                className="inline-block relative mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <motion.div 
                  className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-secondary/20"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0] 
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              
              <motion.h1 
                className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {sassMode 
                  ? <span>Make money or find someone who will. <span className="text-secondary">Finally.</span></span>
                  : <span>Connect with the right talent <span className="text-secondary">instantly</span></span>
                }
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-xl text-white/90 max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {sassMode 
                  ? "Look, Savigail's sick of watching you struggle. Get matched with people who don't suck at what you need, or find clients who'll actually pay you what you're worth."
                  : "SASSED's Freelancer Connect Concierge helps businesses find the perfect freelancers and helps freelancers find their ideal clients through personalized matching."
                }
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
                    {sassMode ? "Convince Me First" : "Learn More"}
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with animations */}
        <section 
          ref={featuresRef} 
          className="py-16 md:py-24 bg-white relative z-10 overflow-hidden"
          style={{ position: 'relative' }}
        >
          {/* Peek-a-boo circle elements */}
          <motion.div 
            className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-primary/5 z-0"
            style={{ 
              x: peekFromSide,
              rotate: peekOneRotate
            }}
          />
          <motion.div 
            className="absolute -left-16 bottom-16 w-60 h-60 rounded-full bg-secondary/5 z-0"
            style={{ y: peekTwoY }}
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={featureControls}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl relative inline-block">
                  {sassMode ? "How This Thing Works" : "How It Works"}
                  
                  {/* Decorative underline that animates */}
                  <motion.div 
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  />
                </h2>
              </motion.div>
              
              <motion.p 
                className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {sassMode 
                  ? "We're cutting through the BS to get you working with people you actually want to work with. Novel concept, right?"
                  : "Our platform makes it easy to connect freelancers with clients who need their specific skills."
                }
              </motion.p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 relative">
              {/* Connecting line animation for desktop */}
              <motion.div 
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 hidden md:block z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              
              {/* First feature card with peek-a-boo animation */}
              <motion.div 
                className="bg-gray-50 p-8 rounded-lg text-center relative z-10 overflow-hidden"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  delay: 0.1
                }}
              >
                {/* Peek-a-boo background element */}
                <motion.div 
                  className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-primary/10 z-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                
                <motion.div 
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary relative z-10"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.div>
                <h3 className="mt-6 text-lg font-medium text-gray-900 relative z-10">
                  {sassMode ? "Show Off (Create a Profile)" : "Create Your Profile"}
                </h3>
                <p className="mt-2 text-gray-600 relative z-10">
                  {sassMode 
                    ? "Brag about yourself in a way that actually gets you hired. No dusty resumes here."
                    : "Sign up and create a detailed profile showcasing your skills, experience, and portfolio."
                  }
                </p>
              </motion.div>

              {/* Second feature card */}
              <motion.div 
                className="bg-gray-50 p-8 rounded-lg text-center relative z-10"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  delay: 0.2
                }}
              >
                <motion.div 
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {sassMode ? "Meet Your Match" : "Get Matched"}
                </h3>
                <p className="mt-2 text-gray-600">
                  {sassMode 
                    ? "Our algorithm is like Tinder, but for work and without all the red flags. Usually."
                    : "Our smart algorithm matches freelancers with clients based on skills, experience, and project needs."
                  }
                </p>
              </motion.div>

              {/* Third feature card with peek-a-boo animation */}
              <motion.div 
                className="bg-gray-50 p-8 rounded-lg text-center relative z-10 overflow-hidden"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  delay: 0.3
                }}
              >
                {/* Peek-a-boo background element */}
                <motion.div 
                  className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-secondary/10 z-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
                
                <motion.div 
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary relative z-10"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h3 className="mt-6 text-lg font-medium text-gray-900 relative z-10">
                  {sassMode ? "Actually Get Stuff Done" : "Collaborate Seamlessly"}
                </h3>
                <p className="mt-2 text-gray-600 relative z-10">
                  {sassMode 
                    ? "Chat, handle money, and deliver work without wanting to throw your laptop out the window."
                    : "Communicate, manage projects, and handle payments all in one secure platform."
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section with Peek-a-boo elements */}
        <section 
          ref={benefitsRef} 
          className="py-16 md:py-24 bg-gray-50 relative z-10 overflow-hidden"
          style={{ position: 'relative' }}
        >
          {/* Peek-a-boo logo element that slides in from bottom */}
          <motion.div 
            className="absolute bottom-0 right-0 w-80 h-80 opacity-10 z-0 overflow-hidden"
            style={{ 
              y: peekTwoY,
              scale: peekTwoScale
            }}
          >
            <div className="w-full h-full">
              <img 
                src={logoBgPath} 
                alt="SASSED Background" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          {/* Background decorative elements */}
          <motion.div 
            className="absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
              {/* Freelancer benefits column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={benefitControls}
                className="relative"
              >
                {/* Peek-a-boo corner element */}
                <motion.div 
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-br-3xl bg-primary/5 z-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2,
                    type: "spring"
                  }}
                />
                
                <motion.h2 
                  className="text-3xl font-bold tracking-tight text-gray-900 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {sassMode ? "For the Freelance Hustlers" : "For Freelancers"}
                  
                  {/* Animated underline */}
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-1 bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </motion.h2>
                
                <motion.p 
                  className="mt-6 text-lg text-gray-600 relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {sassMode 
                    ? "Tired of feast-or-famine cycles and clients who disappear when it's time to pay? Yeah, we thought so."
                    : "Increase your visibility and access job opportunities that align with your unique skill set."
                  }
                </motion.p>
                
                <motion.ul 
                  className="mt-8 space-y-4 relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                >
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Clients who actually know what they want and have the budget to pay for it"
                        : "Get matched with clients who need your specific skills"
                      }
                    </span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Show off your work without having to humble-brag at networking events"
                        : "Showcase your portfolio and expertise to potential clients"
                      }
                    </span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Less time panicking about where your next job is coming from"
                        : "Enjoy consistent work opportunities and reduced job insecurity"
                      }
                    </span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Reviews that actually mean something (not just from your mom)"
                        : "Build your reputation with client reviews and ratings"
                      }
                    </span>
                  </motion.li>
                </motion.ul>
              </motion.div>
              
              {/* Client benefits column with peek-a-boo effect */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={benefitControls}
                className="relative"
              >
                {/* Peek-a-boo corner element */}
                <motion.div 
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-tl-3xl bg-secondary/5 z-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4,
                    type: "spring"
                  }}
                />
                
                <motion.h2 
                  className="text-3xl font-bold tracking-tight text-gray-900 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {sassMode ? "For the Clients Who Mean Business" : "For Clients"}
                  
                  {/* Animated underline */}
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-1 bg-secondary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.h2>
                
                <motion.p 
                  className="mt-6 text-lg text-gray-600 relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {sassMode 
                    ? "Done with freelancers who ghost you halfway through the project? We've got pros who actually deliver."
                    : "Find skilled freelancers quickly and efficiently for your business projects."
                  }
                </motion.p>
                
                <motion.ul 
                  className="mt-8 space-y-4 relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
                >
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ rotate: -15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Find people who can actually do what they claim on their resume"
                        : "Access a pool of verified freelancers with proven skills"
                      }
                    </span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ rotate: -15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Skip the 47 back-and-forth emails with unqualified candidates"
                        : "Save time with our personalized matchmaking system"
                      }
                    </span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <motion.div
                      whileHover={{ rotate: -15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Pay for quality, not overhyped promises and excuses"
                        : "Find cost-effective solutions for your business needs"
                      }
                    </span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ rotate: -15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "All your project stuff in one place, not scattered across 12 apps"
                        : "Manage projects and communicate seamlessly on one platform"
                      }
                    </span>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-primary text-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {sassMode ? "Done with the freelance drama?" : "Ready to transform how you work?"}
            </h2>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              {sassMode 
                ? "Join the platform where Savigail makes sure everyone behaves and gets paid. Revolutionary, right?"
                : "Join thousands of freelancers and businesses already using SASSED to connect, collaborate, and succeed."
              }
            </p>
            <div className="mt-10">
              <Link href="/auth">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  {sassMode ? "Let's Get This Bread" : "Get Started Today"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
