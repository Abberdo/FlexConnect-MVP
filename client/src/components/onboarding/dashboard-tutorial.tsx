import { useTutorial, TutorialStep } from './use-tutorial';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const dashboardSteps: TutorialStep[] = [
  {
    element: '[data-tutorial="dashboard-overview"]',
    popover: {
      title: 'Welcome to your Dashboard!',
      description: 'This is your command center where you can manage all your activities on SASSED. Let\'s take a quick tour to show you around.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tutorial="stats-cards"]',
    popover: {
      title: 'Performance at a Glance',
      description: 'These cards show your key metrics and activities. Track your earnings, active projects, job applications, and messages all in one place.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tutorial="active-projects"]',
    popover: {
      title: 'Your Active Projects',
      description: 'Keep track of all your ongoing work. You can see deadlines, budgets, and client information for each project.',
      position: 'right'
    }
  },
  {
    element: '[data-tutorial="activity-feed"]',
    popover: {
      title: 'Activity Feed',
      description: 'Stay updated with the latest notifications, messages, and updates on your projects and applications.',
      position: 'left'
    }
  },
  {
    element: '[data-tutorial="recommendation-engine"]',
    popover: {
      title: 'Smart Recommendations',
      description: 'Savigail\'s AI-powered recommendation engine matches you with jobs that fit your skills, experience, and preferences.',
      position: 'top'
    }
  },
  {
    element: '[data-tutorial="navigation"]',
    popover: {
      title: 'Easy Navigation',
      description: 'Use the navigation menu to browse jobs, update your profile, check messages, and more!',
      position: 'bottom'
    }
  }
];

export function DashboardTutorial() {
  const { startTutorial, resetTutorial, hasCompletedTutorial } = useTutorial(dashboardSteps);

  return (
    <>
      {!hasCompletedTutorial && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
          style={{ position: 'fixed' }} // Ensure the position is explicitly set
        >
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 max-w-md">
            <h3 className="text-lg font-bold mb-2">New to SASSED?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Would you like Savigail to give you a quick tour of your dashboard?
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetTutorial}>
                Skip
              </Button>
              <Button onClick={startTutorial} className="relative overflow-hidden group">
                <span className="relative z-10">Start Tour</span>
                <span className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

// Tutorial Trigger Component
interface TutorialTriggerProps {
  label?: string;
}

export function TutorialTrigger({ label = "Take the tour" }: TutorialTriggerProps) {
  const { startTutorial, resetTutorial } = useTutorial(dashboardSteps);

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={startTutorial}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12" y2="17"></line>
        </svg>
        {label}
      </Button>
      <Button
        onClick={resetTutorial}
        variant="ghost"
        size="sm"
      >
        Reset
      </Button>
    </div>
  );
}