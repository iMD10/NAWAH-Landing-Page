/** Section title with a small numbered kicker above it. */
export default function SectionHeading({
  index,
  kicker,
  title,
  align = "center",
  className = "",
}: {
  index: string;
  kicker: string;
  title: string;
  align?: "center" | "start";
  className?: string;
}) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-start";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      <p
        className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.18em] mb-5"
        style={{ color: "var(--text-4)" }}
      >
        <span className="tabular-nums" style={{ color: "var(--accent)" }}>
          {index}
        </span>
        <span className="h-px w-6" style={{ background: "var(--border-strong)" }} aria-hidden="true" />
        {kicker}
      </p>
      <h2
        className="font-heading font-semibold tracking-[-0.04em] text-balance leading-[1.05]"
        style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.6rem)", color: "var(--text-1)" }}
      >
        {title}
      </h2>
    </div>
  );
}
