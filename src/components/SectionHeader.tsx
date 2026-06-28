type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
};

export function SectionHeader({ eyebrow, title, subtitle, centered }: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-muted ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
