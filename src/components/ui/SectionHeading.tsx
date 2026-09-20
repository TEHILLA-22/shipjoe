type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-stone-500">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-[-0.06em] text-stone-900 sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-7 text-stone-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}
