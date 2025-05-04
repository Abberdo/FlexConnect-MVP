import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import './tutorial-animations.css';

interface OnboardingContextType {
  showTutorial: (tutorialId: string) => void;
  completeTutorial: (tutorialId: string) => void;
  dismissTutorial: (tutorialId: string) => void;
  resetTutorials: () => void;
  isTutorialCompleted: (tutorialId: string) => boolean;
  currentTutorial: string | null;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

interface OnboardingProviderProps {
  children: ReactNode;
  initialTutorials?: string[];
}

export function OnboardingProvider({ 
  children, 
  initialTutorials = ['dashboard', 'profile', 'messaging', 'jobs']
}: OnboardingProviderProps) {
  // Store the status of tutorials
  const [completedTutorials, setCompletedTutorials] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('completed-tutorials');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch (e) {
      return new Set<string>();
    }
  });

  const [dismissedTutorials, setDismissedTutorials] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('dismissed-tutorials');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch (e) {
      return new Set<string>();
    }
  });

  const [currentTutorial, setCurrentTutorial] = useState<string | null>(null);

  // Save tutorial status when it changes
  useEffect(() => {
    localStorage.setItem('completed-tutorials', JSON.stringify(Array.from(completedTutorials)));
  }, [completedTutorials]);

  useEffect(() => {
    localStorage.setItem('dismissed-tutorials', JSON.stringify(Array.from(dismissedTutorials)));
  }, [dismissedTutorials]);

  // Functions to manage tutorials
  const showTutorial = (tutorialId: string) => {
    if (!completedTutorials.has(tutorialId) && !dismissedTutorials.has(tutorialId)) {
      setCurrentTutorial(tutorialId);
    }
  };

  const completeTutorial = (tutorialId: string) => {
    setCompletedTutorials(prev => {
      const updated = new Set(prev);
      updated.add(tutorialId);
      return updated;
    });
    setCurrentTutorial(null);
  };

  const dismissTutorial = (tutorialId: string) => {
    setDismissedTutorials(prev => {
      const updated = new Set(prev);
      updated.add(tutorialId);
      return updated;
    });
    setCurrentTutorial(null);
  };

  const resetTutorials = () => {
    setCompletedTutorials(new Set());
    setDismissedTutorials(new Set());
    setCurrentTutorial(null);
  };

  const isTutorialCompleted = (tutorialId: string) => {
    return completedTutorials.has(tutorialId);
  };

  return (
    <OnboardingContext.Provider 
      value={{
        showTutorial,
        completeTutorial,
        dismissTutorial,
        resetTutorials,
        isTutorialCompleted,
        currentTutorial
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}

// A component to show an onboarding prompt
export function OnboardingPrompt({ 
  tutorialId, 
  title, 
  description,
  placement = 'bottom'
}: { 
  tutorialId: string; 
  title: string; 
  description: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}) {
  const { showTutorial, completeTutorial, dismissTutorial, isTutorialCompleted, currentTutorial } = useOnboarding();
  
  useEffect(() => {
    // Check if this tutorial should be shown
    if (!isTutorialCompleted(tutorialId)) {
      showTutorial(tutorialId);
    }
  }, [tutorialId]);

  if (currentTutorial !== tutorialId) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 max-w-md"
      >
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => dismissTutorial(tutorialId)}>
            Skip
          </Button>
          <Button onClick={() => completeTutorial(tutorialId)}>
            Got it
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}