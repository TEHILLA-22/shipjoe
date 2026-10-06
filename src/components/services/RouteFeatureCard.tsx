type RouteFeatureCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  delay?: number;
};

export function RouteFeatureCard({
  title,
  subtitle,
  description,
  icon,
  delay = 0,
}: RouteFeatureCardProps) {
  return (
    <article
      className="group rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)] sm:p-7"
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
          {subtitle}
        </p>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-xl">
          {icon}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.06em] text-stone-900">
        {title}
      </h3>
      <p className="mt-3 text-base leading-7 text-stone-600">{description}</p>
    </article>
  );
}
