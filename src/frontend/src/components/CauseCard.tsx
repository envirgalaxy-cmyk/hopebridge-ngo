import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import { Clock, Users } from "lucide-react";
import type { Cause } from "../types";

const categoryColors: Record<Cause["category"], string> = {
  education: "bg-secondary/15 text-secondary-foreground border-secondary/30",
  environment: "bg-primary/15 text-primary border-primary/30",
  healthcare: "bg-accent/15 text-accent-foreground border-accent/30",
  water: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  disaster:
    "bg-destructive/15 text-destructive-foreground border-destructive/30",
};

const categoryLabels: Record<Cause["category"], string> = {
  education: "Education",
  environment: "Environment",
  healthcare: "Healthcare",
  water: "Clean Water",
  disaster: "Disaster Relief",
};

interface CauseCardProps {
  cause: Cause;
  index?: number;
}

export default function CauseCard({ cause, index = 1 }: CauseCardProps) {
  const progress = Math.round((cause.raised / cause.goal) * 100);

  return (
    <Card
      className="group overflow-hidden border border-border shadow-card hover:shadow-md transition-shadow duration-300"
      data-ocid={`causes.item.${index}`}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={cause.image}
          alt={cause.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${categoryColors[cause.category]}`}
          >
            {categoryLabels[cause.category]}
          </span>
        </div>
        {cause.daysLeft <= 10 && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="text-xs font-semibold">
              Urgent
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="font-display font-semibold text-base text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {cause.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {cause.tagline}
        </p>

        <div className="mb-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span className="font-semibold text-foreground">
              ${cause.raised.toLocaleString()} raised
            </span>
            <span>
              {progress}% of ${cause.goal.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {cause.donors} donors
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {cause.daysLeft} days left
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            to="/causes/$id"
            params={{ id: cause.id }}
            className="flex-1"
            data-ocid={`causes.detail_link.${index}`}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full border-border hover:border-primary hover:text-primary transition-smooth"
            >
              Learn More
            </Button>
          </Link>
          <Link
            to="/donations"
            search={{ cause: cause.id }}
            className="flex-1"
            data-ocid={`causes.donate_link.${index}`}
          >
            <Button
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-smooth"
            >
              Donate
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
