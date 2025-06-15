
/**
 * Subtle SVG background accent for clean tech look.
 * Usage: <AbstractAccent position="top" color="blue" />
 */
export default function AbstractAccent({ position = "top", color = "blue", className = "" }: { position?: "top" | "bottom", color?: "blue" | "green", className?: string; }) {
  const gradient = color === "blue"
    ? "linear-gradient(99deg, rgba(15,23,42,0.06) 0%, rgba(71,85,105,0.04) 100%)"
    : "linear-gradient(111deg, rgba(20,184,166,0.08) 0%, rgba(248,250,252,0.02) 100%)";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${position === "top" ? "top-0 left-0 w-full h-64" : "bottom-0 left-0 w-full h-40"} overflow-hidden z-0 ${className}`}
      style={{
        background: gradient,
        filter: "blur(32px)",
      }}
    ></div>
  );
}
