import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { TopMatches } from "@/components/dashboard/top-matches";
import { ActiveProjects } from "@/components/dashboard/active-projects";
import { JobRecommendations } from "@/components/dashboard/job-recommendations";
import { Users, Briefcase, CheckCircle, Star, HelpCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { DashboardTutorial, TutorialTrigger } from "@/components/onboarding/dashboard-tutorial";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  // Demo data - in a real app this would come from the API
  const activities = [
    {
      id: "1",
      type: "message",
      title: "New message from Sarah Johnson",
      description: "Hi, I'm interested in discussing the project details further...",
      timeAgo: "2h ago"
    },
    {
      id: "2",
      type: "job",
      title: "New job proposal received",
      description: "Website Redesign for Small Business from Tech Solutions Inc.",
      timeAgo: "Yesterday"
    },
    {
      id: "3",
      type: "project",
      title: "Project completed",
      description: "Logo Design for Startup has been marked as complete",
      timeAgo: "2 days ago"
    }
  ];

  const topFreelancers = [
    {
      id: 1,
      name: "Jessica Williams",
      title: "UI/UX Designer",
      matchPercentage: 98,
      rating: 4.5
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Web Developer",
      matchPercentage: 95,
      rating: 5.0
    },
    {
      id: 3,
      name: "Amanda Rodriguez",
      title: "Content Writer",
      matchPercentage: 92,
      rating: 4.0
    }
  ];

  const activeProjects = [
    {
      id: 1,
      title: "Website Redesign",
      description: "Redesigning company website with modern UI/UX practices, implementing responsive design, and improving user engagement metrics.",
      status: "in-progress" as const,
      dueDate: "Sep 30, 2023",
      budget: 2500,
      client: {
        id: 101,
        name: "Tech Solutions Inc."
      }
    },
    {
      id: 2,
      title: "Content Creation",
      description: "Creating blog posts, social media content, and email newsletters focused on digital marketing strategies and industry trends.",
      status: "review" as const,
      dueDate: "Oct 15, 2023",
      budget: 1800,
      client: {
        id: 102,
        name: "Digital Marketeers"
      }
    },
    {
      id: 3,
      title: "Mobile App UI Design",
      description: "Designing user interface for a health & fitness tracking mobile application with emphasis on user experience and engagement.",
      status: "in-progress" as const,
      dueDate: "Nov 5, 2023",
      budget: 3200,
      client: {
        id: 103,
        name: "FitTech Startup"
      }
    }
  ];

  const jobRecommendations = [
    {
      id: 1,
      title: "UX/UI Designer Needed for E-commerce Site Redesign",
      company: "Global Retail Co.",
      budget: "$3,000 - $5,000",
      duration: "2-3 months",
      location: "Remote" as const,
      matchPercentage: 94,
      skills: ["UI Design", "E-commerce", "Figma"]
    },
    {
      id: 2,
      title: "Frontend Developer for SaaS Dashboard",
      company: "Tech Innovations LLC",
      budget: "$4,500 - $6,000",
      duration: "3-4 months",
      location: "Remote" as const,
      matchPercentage: 88,
      skills: ["React", "JavaScript", "Dashboard"]
    },
    {
      id: 3,
      title: "Content Marketing Specialist for Blog Series",
      company: "GreenLife Organics",
      budget: "$2,500 - $3,500",
      duration: "Ongoing",
      location: "Flexible" as const,
      matchPercentage: 76,
      skills: ["SEO", "Content Writing", "Marketing"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-tutorial="dashboard-overview">
          {/* Welcome section */}
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-foreground sm:text-3xl sm:truncate">
                Welcome Back, {user?.name}!
              </h2>
              <p className="mt-1 text-muted-foreground">Here's your freelancer connect dashboard</p>
            </div>
            <div className="mt-4 flex items-center gap-3 md:mt-0">
              <TutorialTrigger label="Dashboard Tour" />
              <Button>
                Create Job Posting
              </Button>
            </div>
          </div>
          
          {/* Dashboard tutorial component */}
          <DashboardTutorial />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8" data-tutorial="stats-cards">
            <StatCard 
              icon={Users} 
              title="Total Matches" 
              value="24" 
              colorScheme="primary" 
            />
            <StatCard 
              icon={Briefcase} 
              title="Active Projects" 
              value="3" 
              colorScheme="secondary" 
            />
            <StatCard 
              icon={CheckCircle} 
              title="Completed Jobs" 
              value="12" 
              colorScheme="success" 
            />
            <StatCard 
              icon={Star} 
              title="Average Rating" 
              value="4.8" 
              colorScheme="warning" 
            />
          </div>

          {/* Activity & Matches */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div data-tutorial="activity-feed" className="lg:col-span-2">
              <ActivityFeed activities={activities as any} className="h-full" />
            </div>
            <div data-tutorial="recommendation-engine">
              <TopMatches freelancers={topFreelancers} />
            </div>
          </div>

          {/* Active Projects & Job Recommendations */}
          <div className="grid grid-cols-1 gap-8">
            <div data-tutorial="active-projects">
              <ActiveProjects projects={activeProjects} />
            </div>
            <div data-tutorial="job-listings">
              <JobRecommendations jobs={jobRecommendations} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
