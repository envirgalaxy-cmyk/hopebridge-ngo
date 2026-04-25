interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 ${centered ? "text-center" : ""} max-w-2xl ${centered ? "mx-auto" : ""}`}
    >
      {label && (
        <span
          className={`inline-block text-xs font-semibold uppercase tracking-widest mb-2 ${light ? "text-primary-foreground/70" : "text-primary"}`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl font-bold leading-tight mb-3 ${light ? "text-primary-foreground" : "text-foreground"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base leading-relaxed ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
