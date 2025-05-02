import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  status: "in-progress" | "review" | "completed";
  dueDate: string;
  budget: number;
  client: {
    id: number;
    name: string;
    avatarUrl?: string;
  };
}

interface ActiveProjectsProps {
  projects: Project[];
  className?: string;
}

export function ActiveProjects({ projects, className }: ActiveProjectsProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "in-progress":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">In Progress</Badge>;
      case "review":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Review</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <section className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Your Active Projects</h2>
        <Link href="/projects" className="text-sm font-medium text-primary hover:text-primary/80">
          View all <span aria-hidden="true">→</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="px-4 pt-5 pb-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-foreground">{project.title}</h3>
                  <div>{getStatusBadge(project.status)}</div>
                </div>
                <p className={cn("mt-1 text-sm text-muted-foreground line-clamp-2")}>
                  {project.description}
                </p>
              </div>
              <div className="px-4 py-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Due: <span className="font-medium text-foreground">{project.dueDate}</span></span>
                  <span className="text-muted-foreground">Budget: <span className="font-medium text-foreground">${project.budget.toLocaleString()}</span></span>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-border flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    {project.client.avatarUrl && (
                      <AvatarImage src={project.client.avatarUrl} alt={project.client.name} />
                    )}
                    <AvatarFallback className="bg-muted">{getInitials(project.client.name)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-2 text-sm font-medium text-muted-foreground">{project.client.name}</div>
                </div>
                <Button size="sm">
                  Message
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-4">You don't have any active projects yet.</p>
              <Link href="/jobs">
                <Button variant="outline">Find Work</Button>
              </Link>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
