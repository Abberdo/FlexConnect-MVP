import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { OnboardingProvider } from "@/components/onboarding/onboarding-provider";
import { WelcomeTutorial } from "@/components/onboarding/welcome-tutorial";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

// Import page components normally
import HomePage from "@/pages/home-page";
import DashboardPage from "@/pages/dashboard-page";
import AuthPage from "@/pages/auth-page";

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-2 text-primary">
      <Loader2 className="h-10 w-10 animate-spin" />
      <p className="text-sm font-medium">Loading content...</p>
    </div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={HomePage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OnboardingProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <WelcomeTutorial />
          </TooltipProvider>
        </OnboardingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
