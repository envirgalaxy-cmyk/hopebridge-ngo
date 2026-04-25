interface StatBadgeProps {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  light?: boolean;
}

export default function StatBadge({
  value,
  label,
  description,
  icon,
  light = false,
}: StatBadgeProps) {
  return (
    <div
      className={`flex flex-col gap-1 p-5 rounded-xl ${light ? "bg-primary-foreground/10" : "bg-card border border-border shadow-sm"}`}
    >
      {icon && (
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${light ? "bg-primary-foreground/20" : "bg-primary/10"}`}
        >
          <span className={light ? "text-primary-foreground" : "text-primary"}>
            {icon}
          </span>
        </div>
      )}
      <span
        className={`font-display text-3xl font-bold leading-none ${light ? "text-primary-foreground" : "text-primary"}`}
      >
        {value}
      </span>
      <span
        className={`font-semibold text-sm ${light ? "text-primary-foreground" : "text-foreground"}`}
      >
        {label}
      </span>
      {description && (
        <p
          className={`text-xs leading-snug ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
