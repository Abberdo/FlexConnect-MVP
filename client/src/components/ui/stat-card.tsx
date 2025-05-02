import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  colorScheme?: "primary" | "secondary" | "success" | "warning";
  className?: string;
}

export function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  colorScheme = "primary", 
  className 
}: StatCardProps) {
  const colorClasses = {
    primary: {
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    secondary: {
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    success: {
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    warning: {
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  };

  const { iconBg, iconColor } = colorClasses[colorScheme];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", iconBg)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-muted-foreground truncate">{title}</dt>
              <dd>
                <div className="text-lg font-semibold text-foreground">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
