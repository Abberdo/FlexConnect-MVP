import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Activity {
  id: string;
  type: "message" | "job" | "project";
  title: string;
  description: string;
  timeAgo: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-primary" />;
      case "job":
        return <FileText className="h-5 w-5 text-secondary" />;
      case "project":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="px-6">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-hidden">
          <ul role="list" className="divide-y divide-border">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <li key={activity.id} className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.description}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{activity.timeAgo}</div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-6 py-8 text-center">
                <p className="text-sm text-muted-foreground">No recent activity</p>
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
