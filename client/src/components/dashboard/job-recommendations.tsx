import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Building, DollarSign, Calendar, Zap } from "lucide-react";

interface JobRecommendation {
  id: number;
  title: string;
  company: string;
  budget: string;
  duration: string;
  location: "Remote" | "Flexible" | "On-site";
  matchPercentage: number;
  skills: string[];
}

interface JobRecommendationsProps {
  jobs: JobRecommendation[];
  className?: string;
}

export function JobRecommendations({ jobs, className }: JobRecommendationsProps) {
  const getLocationBadge = (location: JobRecommendation["location"]) => {
    switch (location) {
      case "Remote":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Remote</Badge>;
      case "Flexible":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Flexible</Badge>;
      case "On-site":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">On-site</Badge>;
      default:
        return <Badge variant="outline">{location}</Badge>;
    }
  };

  return (
    <section className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Job Recommendations</h2>
        <Link href="/jobs" className="text-sm font-medium text-primary hover:text-primary/80">
          View all <span aria-hidden="true">→</span>
        </Link>
      </div>
      
      <Card className="overflow-hidden">
        <ul role="list" className="divide-y divide-border">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <li key={job.id}>
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <div className="flex text-sm">
                        <Link href={`/jobs/${job.id}`} className="font-medium text-primary truncate hover:underline">
                          {job.title}
                        </Link>
                        <p className="ml-1 flex-shrink-0 font-normal text-muted-foreground">
                          {getLocationBadge(job.location)}
                        </p>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building className="flex-shrink-0 mr-1.5 h-4 w-4 text-muted-foreground" />
                          <p>{job.company}</p>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-muted-foreground" />
                          <p>{job.budget}</p>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-muted-foreground" />
                          <p>{job.duration}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center text-sm">
                          <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium text-foreground">{job.matchPercentage}% Match</span>
                        </span>
                        <Button size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-8 text-center">
              <p className="text-muted-foreground mb-4">No job recommendations found.</p>
              <Link href="/profile/skills">
                <Button variant="outline">Update Skills</Button>
              </Link>
            </li>
          )}
        </ul>
      </Card>
    </section>
  );
}
