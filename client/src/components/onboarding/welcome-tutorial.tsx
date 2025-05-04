import { useTutorial, TutorialStep } from './use-tutorial';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

// Define the tutorial steps
const welcomeSteps: TutorialStep[] = [
  {
    element: 'body', // Target the whole page first
    popover: {
      title: 'Welcome to SASSED! 👋',
      description: 'Let\'s get you started with a quick tour of our platform. Savigail, your digital concierge, will guide you through the key features.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tutorial="profile-setup"]',
    popover: {
      title: 'Complete Your Profile',
      description: 'Your first step is to complete your profile. Add your skills, experience, and portfolio to help us match you with the perfect opportunities.',
      position: 'right'
    }
  },
  {
    element: '[data-tutorial="find-work"]',
    popover: {
      title: 'Find Work',
      description: 'Browse available projects and job postings that match your skills. Our AI-powered recommendation engine will suggest the best opportunities for you.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tutorial="messaging"]',
    popover: {
      title: 'Secure Messaging',
      description: 'Connect with clients and communicate about projects through our secure messaging system.',
      position: 'left'
    }
  },
  {
    element: '[data-tutorial="sass-toggle"]',
    popover: {
      title: 'Meet Savigail',
      description: 'Toggle Savigail\'s sass mode on or off. She\'s your digital concierge who helps you navigate the platform with a bit of attitude, if you\'re into that sort of thing.',
      position: 'bottom'
    }
  },
  {
    element: 'body',
    popover: {
      title: 'You\'re All Set!',
      description: 'You\'re now ready to start your journey with SASSED! Remember, our goal is to help you thrive as a freelancer by connecting you with quality clients and projects.',
      position: 'bottom'
    }
  }
];

// Define the tutorial for clients
const welcomeClientSteps: TutorialStep[] = [
  {
    element: 'body', // Target the whole page first
    popover: {
      title: 'Welcome to SASSED! 👋',
      description: 'Let\'s get you started with a quick tour of our platform. Savigail, your digital concierge, will guide you through the key features.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tutorial="profile-setup"]',
    popover: {
      title: 'Complete Your Client Profile',
      description: 'Fill out your company profile to help us match you with the right freelancers for your projects.',
      position: 'right'
    }
  },
  {
    element: '[data-tutorial="post-job"]',
    popover: {
      title: 'Post a Job',
      description: 'Create your first job posting to start attracting qualified freelancers. Be specific about your requirements to find the best match.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tutorial="browse-freelancers"]',
    popover: {
      title: 'Browse Freelancers',
      description: 'Explore our diverse pool of talented freelancers or let our AI matching system suggest the perfect candidates for your project.',
      position: 'top'
    }
  },
  {
    element: '[data-tutorial="messaging"]',
    popover: {
      title: 'Secure Messaging',
      description: 'Connect with freelancers and discuss project details through our secure messaging system.',
      position: 'left'
    }
  },
  {
    element: '[data-tutorial="sass-toggle"]',
    popover: {
      title: 'Meet Savigail',
      description: 'Toggle Savigail\'s sass mode on or off. She\'s your digital concierge who helps you navigate the platform with a bit of attitude, if you\'re into that sort of thing.',
      position: 'bottom'
    }
  },
  {
    element: 'body',
    popover: {
      title: 'You\'re All Set!',
      description: 'You\'re now ready to start finding freelancers for your projects. Our goal is to help you connect with high-quality professionals who can bring your vision to life!',
      position: 'bottom'
    }
  }
];

export function WelcomeTutorial() {
  const { user } = useAuth();
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const isClient = user?.userType === 'client';
  
  const steps = isClient ? welcomeClientSteps : welcomeSteps;
  const { startTutorial } = useTutorial(steps);
  
  useEffect(() => {
    // Check if it's the user's first login
    const firstLoginFlag = localStorage.getItem('first-login-completed');
    if (!firstLoginFlag && user) {
      setIsFirstLogin(true);
      localStorage.setItem('first-login-completed', 'true');
    }
  }, [user]);
  
  // Start the tutorial automatically after a short delay
  useEffect(() => {
    if (isFirstLogin) {
      const timer = setTimeout(() => {
        startTutorial();
      }, 1500); // Short delay to let the page render fully
      
      return () => clearTimeout(timer);
    }
  }, [isFirstLogin, startTutorial]);
  
  // Don't render anything visible, this component just handles the tutorial logic
  return null;
}

// A component to trigger the welcome tutorial manually
export function WelcomeTutorialTrigger() {
  const { user } = useAuth();
  const isClient = user?.userType === 'client';
  const steps = isClient ? welcomeClientSteps : welcomeSteps;
  const { startTutorial } = useTutorial(steps);
  
  return (
    <Button 
      onClick={startTutorial} 
      variant="outline" 
      size="sm"
      className="flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
      Welcome Tour
    </Button>
  );
}