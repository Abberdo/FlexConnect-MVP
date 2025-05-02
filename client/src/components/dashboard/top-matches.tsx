import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { Link } from "wouter";

interface Freelancer {
  id: number;
  name: string;
  title: string;
  matchPercentage: number;
  rating: number;
  avatarUrl?: string;
}

interface TopMatchesProps {
  freelancers: Freelancer[];
}

export function TopMatches({ freelancers }: TopMatchesProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle className="text-lg font-medium">Top Matches For You</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ul role="list" className="divide-y divide-border">
          {freelancers.length > 0 ? (
            freelancers.map((freelancer) => (
              <li key={freelancer.id} className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      {freelancer.avatarUrl && (
                        <AvatarImage src={freelancer.avatarUrl} alt={freelancer.name} />
                      )}
                      <AvatarFallback className="bg-muted">{getInitials(freelancer.name)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {freelancer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {freelancer.title} • {freelancer.matchPercentage}% Match
                    </p>
                    <div className="flex items-center text-xs mt-1">
                      <Rating value={freelancer.rating} size="sm" />
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-primary border-primary hover:bg-primary hover:text-white"
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-8 text-center">
              <p className="text-sm text-muted-foreground">No matches found</p>
            </li>
          )}
        </ul>
      </CardContent>
      {freelancers.length > 0 && (
        <CardFooter className="px-6 py-3 bg-muted/50">
          <Link href="/freelancers" className="text-sm font-medium text-primary hover:text-primary/80 ml-auto">
            View all matches <span aria-hidden="true">→</span>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
