import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Coffee, CheckCircle } from "lucide-react";

interface FeaturesSectionProps {
  sassMode: boolean;
  featuresRef: React.RefObject<HTMLElement>;
  isFeaturesInView: boolean;
  peekOneScale: any;
  peekOneOpacity: any;
  peekOneRotate: any;
  peekFromSide: any;
}

const FeaturesSection = ({ 
  sassMode, 
  featuresRef, 
  isFeaturesInView,
  peekOneScale,
  peekOneOpacity,
  peekOneRotate,
  peekFromSide
}: FeaturesSectionProps) => {
  const featureControls = useAnimation();

  useEffect(() => {
    if (isFeaturesInView) {
      featureControls.start({ opacity: 1, y: 0 });
    } else {
      featureControls.start({ opacity: 0, y: 30 });
    }
  }, [isFeaturesInView, featureControls]);

  return (
    <section 
      ref={featuresRef} 
      className="py-16 md:py-24 bg-white relative z-10 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Peek-a-boo circle elements */}
      <motion.div 
        className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-primary/5 z-0"
        style={{ 
          scale: peekOneScale,
          opacity: peekOneOpacity,
          rotate: peekOneRotate,
          translateZ: 0
        }}
      />
      
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
          <Coffee className="h-10 w-10 text-white/80" />
        </motion.div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
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
            className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {sassMode 
              ? "We're cutting through the BS to get you working with people you actually want to work with. Novel concept, right?"
              : "Our platform makes it easy to connect freelancers with clients who need their specific skills."
            }
          </motion.p>
        </div>

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
            style={{ boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            whileHover={{ y: -10 }}
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
            <h3 className="mt-6 text-lg font-medium text-gray-900">
              {sassMode ? "Create Your Profile" : "Sign Up"}
            </h3>
            <p className="mt-2 text-gray-600">
              {sassMode 
                ? "Show off your skills without all the fake reviews and ratings nonsense."
                : "Create a detailed profile highlighting your skills, experience, and portfolio."
              }
            </p>
          </motion.div>

          {/* Second feature card */}
          <motion.div 
            className="bg-gray-50 p-8 rounded-lg text-center relative z-10"
            style={{ boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            whileHover={{ y: -10 }}
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
            style={{ boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            whileHover={{ y: -10 }}
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
              className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-secondary/10 z-0"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            
            <motion.div 
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary relative z-10"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">
              {sassMode ? "Get That Money" : "Collaborate & Earn"}
            </h3>
            <p className="mt-2 text-gray-600">
              {sassMode 
                ? "Spend less time hunting for clients and more time doing the work you actually enjoy."
                : "Work seamlessly with clients through our platform with secure payments and communication tools."
              }
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;