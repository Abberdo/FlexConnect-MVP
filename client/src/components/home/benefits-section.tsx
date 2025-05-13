import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { CheckCircle } from "lucide-react";
import logoBgPath from "@assets/Brand Logo-01.jpeg";

interface BenefitsSectionProps {
  sassMode: boolean;
  benefitsRef: React.RefObject<HTMLElement>;
  isBenefitsInView: boolean;
  peekTwoY: any;
  peekTwoOpacity: any;
  peekTwoScale: any;
  imageThreeY: any;
}

const BenefitsSection = ({ 
  sassMode, 
  benefitsRef, 
  isBenefitsInView,
  peekTwoY,
  peekTwoOpacity,
  peekTwoScale,
  imageThreeY
}: BenefitsSectionProps) => {
  const benefitControls = useAnimation();

  useEffect(() => {
    if (isBenefitsInView) {
      benefitControls.start({ opacity: 1, x: 0 });
    } else {
      benefitControls.start({ opacity: 0, x: -30 });
    }
  }, [isBenefitsInView, benefitControls]);

  return (
    <section 
      ref={benefitsRef} 
      className="py-16 md:py-24 bg-gray-50 relative z-10 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Peek-a-boo logo element that slides in from bottom */}
      <motion.div 
        className="absolute bottom-0 right-0 w-80 h-80 opacity-10 z-0 overflow-hidden"
        style={{ 
          y: imageThreeY,
          translateZ: 0
        }}
      >
        <img 
          src={logoBgPath} 
          alt="Logo Background" 
          className="w-full h-full object-contain"
        />
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <motion.h2 
              className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              {sassMode 
                ? "Why Deal With Our Sass?" 
                : "The SASSED Advantage"
              }
            </motion.h2>
            <motion.p 
              className="mt-3 max-w-3xl text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              {sassMode 
                ? "Because we've been there, done that, and we're tired of seeing talented people get underpaid and overworked."
                : "Our platform offers unique benefits that set us apart from traditional freelance marketplaces."
              }
            </motion.p>
            
            <div className="mt-8">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false }}
              >
                <motion.ul className="space-y-4">
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    viewport={{ once: false }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "No more lowball offers. We set minimum rates that actually respect your skills" 
                        : "AI-powered matching for higher quality project connections and better client fit"
                      }
                    </span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: false }}
                  >
                    <motion.div
                      whileHover={{ rotate: -15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "You don't have to pretend to be a robot. Be yourself, sass and all"
                        : "Personalized dashboard with analytics and insights to grow your business"
                      }
                    </span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    viewport={{ once: false }}
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
                    viewport={{ once: false }}
                  >
                    <motion.div
                      whileHover={{ rotate: -15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    </motion.div>
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Actually get paid on time. Revolutionary, we know"
                        : "Secure payment system with guaranteed on-time payments and dispute resolution"
                      }
                    </span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    viewport={{ once: false }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
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
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;