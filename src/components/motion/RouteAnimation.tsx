export function RouteAnimation({
  className = "",
  compact = false,
  dark = false,
}: {
  className?: string;
  compact?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={className} aria-label="Route illustration showing movement between Nigeria and the UK">
      <svg viewBox="0 0 560 220" className={`h-auto w-full ${compact ? "max-w-[420px]" : "max-w-[620px]"}`}>
        <path data-route-line d="M 20 110 C 120 80, 210 70, 270 110 S 440 150, 540 108" fill="none" stroke={dark ? "#93c5fd" : "#57534e"} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        <circle data-route-marker cx="40" cy="106" r="7" fill={dark ? "#e0f2fe" : "#1c1917"} />
        <circle data-route-marker cx="520" cy="108" r="7" fill={dark ? "#e0f2fe" : "#1c1917"} />
        <circle data-route-dot cx="40" cy="106" r="5" fill="#f59e0b" />
        <g data-route-marker>
          <circle cx="40" cy="106" r="16" fill="none" stroke="#1c1917" strokeOpacity="0.2" />
        </g>
        <g data-route-marker>
          <circle cx="520" cy="108" r="16" fill="none" stroke="#1c1917" strokeOpacity="0.2" />
        </g>
      </svg>
    </div>
  );
}
