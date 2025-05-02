import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function Rating({ 
  value, 
  max = 5, 
  size = "md", 
  showValue = true,
  className 
}: RatingProps) {
  // Calculate full and half stars
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;
  
  // Size classes
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };
  
  const starClass = sizeClasses[size];
  
  // Generate stars
  const stars = [];
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className={cn(starClass, "fill-warning text-warning")} />
    );
  }
  
  // Half star if needed
  if (hasHalfStar && fullStars < max) {
    stars.push(
      <StarHalf key="half" className={cn(starClass, "fill-warning text-warning")} />
    );
  }
  
  // Empty stars
  const emptyStarsCount = max - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStarsCount; i++) {
    stars.push(
      <Star key={`empty-${i}`} className={cn(starClass, "text-warning/40")} />
    );
  }
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">{stars}</div>
      {showValue && (
        <span className={cn(
          "ml-1 text-muted-foreground",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base",
        )}>
          ({value.toFixed(1)})
        </span>
      )}
    </div>
  );
}
