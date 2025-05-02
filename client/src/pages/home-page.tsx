import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, ArrowRight, Coffee, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const [sassMode, setSassMode] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const imageOneY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageTwoY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const imageThreeY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
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

  return (
    <div className="min-h-screen flex flex-col relative" ref={containerRef}>
      <Navbar />
      
      <main className="flex-1 relative overflow-hidden">
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
        
        {/* Parallax Background Images */}
        <motion.div 
          className="absolute top-40 -right-20 w-64 h-64 opacity-20 z-0"
          style={{ y: imageOneY }}
        >
          <div className="w-full h-full rounded-full bg-secondary"></div>
        </motion.div>
        
        <motion.div 
          className="absolute top-80 -left-32 w-96 h-96 opacity-10 z-0"
          style={{ y: imageTwoY }}
        >
          <div className="w-full h-full rounded-full bg-accent"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 opacity-15 z-0"
          style={{ y: imageThreeY }}
        >
          <div className="w-full h-full rounded-full bg-primary"></div>
        </motion.div>
      
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center md:text-left md:max-w-2xl lg:max-w-3xl">
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
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium">
                    {sassMode ? "Let's Do This" : "Get Started"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {sassMode ? "Convince Me First" : "Learn More"}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {sassMode ? "How This Thing Works" : "How It Works"}
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                {sassMode 
                  ? "We're cutting through the BS to get you working with people you actually want to work with. Novel concept, right?"
                  : "Our platform makes it easy to connect freelancers with clients who need their specific skills."
                }
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <motion.div 
                className="bg-gray-50 p-8 rounded-lg text-center"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {sassMode ? "Show Off (Create a Profile)" : "Create Your Profile"}
                </h3>
                <p className="mt-2 text-gray-600">
                  {sassMode 
                    ? "Brag about yourself in a way that actually gets you hired. No dusty resumes here."
                    : "Sign up and create a detailed profile showcasing your skills, experience, and portfolio."
                  }
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-50 p-8 rounded-lg text-center"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
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

              <motion.div 
                className="bg-gray-50 p-8 rounded-lg text-center"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {sassMode ? "Actually Get Stuff Done" : "Collaborate Seamlessly"}
                </h3>
                <p className="mt-2 text-gray-600">
                  {sassMode 
                    ? "Chat, handle money, and deliver work without wanting to throw your laptop out the window."
                    : "Communicate, manage projects, and handle payments all in one secure platform."
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-gray-50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  {sassMode ? "For the Freelance Hustlers" : "For Freelancers"}
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  {sassMode 
                    ? "Tired of feast-or-famine cycles and clients who disappear when it's time to pay? Yeah, we thought so."
                    : "Increase your visibility and access job opportunities that align with your unique skill set."
                  }
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Clients who actually know what they want and have the budget to pay for it"
                        : "Get matched with clients who need your specific skills"
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Show off your work without having to humble-brag at networking events"
                        : "Showcase your portfolio and expertise to potential clients"
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Less time panicking about where your next job is coming from"
                        : "Enjoy consistent work opportunities and reduced job insecurity"
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Reviews that actually mean something (not just from your mom)"
                        : "Build your reputation with client reviews and ratings"
                      }
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  {sassMode ? "For the Clients Who Mean Business" : "For Clients"}
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  {sassMode 
                    ? "Done with freelancers who ghost you halfway through the project? We've got pros who actually deliver."
                    : "Find skilled freelancers quickly and efficiently for your business projects."
                  }
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Find people who can actually do what they claim on their resume"
                        : "Access a pool of verified freelancers with proven skills"
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Skip the 47 back-and-forth emails with unqualified candidates"
                        : "Save time with our personalized matchmaking system"
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "Pay for quality, not overhyped promises and excuses"
                        : "Find cost-effective solutions for your business needs"
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">
                      {sassMode 
                        ? "All your project stuff in one place, not scattered across 12 apps"
                        : "Manage projects and communicate seamlessly on one platform"
                      }
                    </span>
                  </li>
                </ul>
              </div>
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
