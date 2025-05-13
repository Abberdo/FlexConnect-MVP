import { useState, useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export type TutorialStep = {
  element: string;
  popover: {
    title: string;
    description: string;
    position?: 'top' | 'right' | 'bottom' | 'left';
  };
};

export function useTutorial(steps: TutorialStep[], options?: { autoStart?: boolean }) {
  const [driverObj, setDriverObj] = useState<any>(null);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState<boolean>(() => {
    return localStorage.getItem('has-completed-tutorial') === 'true';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const driverInstance = driver({
      showProgress: true,
      steps: steps,
      onDestroyStarted: () => {
        if (window.confirm('Are you sure you want to exit the tutorial?')) {
          driverInstance.destroy();
        }
      },
      onDestroyed: () => {
        localStorage.setItem('has-completed-tutorial', 'true');
        setHasCompletedTutorial(true);
      },
      onHighlighted: (element) => {
        // Add animation classes if needed
        if (typeof element === 'string') {
          const el = document.querySelector(element);
          if (el && window.getComputedStyle(el).position === 'static') {
            (el as HTMLElement).style.position = 'relative';
          }
        }
      },
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: 'Next',
      prevBtnText: 'Previous',
      doneBtnText: 'Done',
      progressText: '{{current}} of {{total}}',
      animate: true,
      overlayColor: 'rgba(0, 0, 0, 0.6)',
      stagePadding: 5,
      // Add our custom class to the driver instance
      popoverClass: 'custom-animated-tooltip',
    });

    setDriverObj(driverInstance);

    if (options?.autoStart && !hasCompletedTutorial) {
      driverInstance.drive();
    }

    return () => {
      if (driverInstance) {
        driverInstance.destroy();
      }
    };
  }, [steps]);

  const startTutorial = () => {
    if (driverObj) {
      driverObj.drive();
    }
  };

  const resetTutorial = () => {
    localStorage.removeItem('has-completed-tutorial');
    setHasCompletedTutorial(false);
  };

  return {
    startTutorial,
    resetTutorial,
    hasCompletedTutorial
  };
}