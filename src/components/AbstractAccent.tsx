
/**
 * Subtle SVG background accent for clean tech look.
 * Usage: <AbstractAccent position="top" color="blue" />
 */
export default function AbstractAccent({ position = "top", color = "blue", className = "" }: { position?: "top" | "bottom", color?: "blue" | "green", className?: string; }) {
  const gradient = color === "blue"
    ? "linear-gradient(99deg, rgba(30,58,138,0.10) 0%, rgba(59,130,246,0.08) 100%)"
    : "linear-gradient(111deg, rgba(5,150,105,0.13) 0%, rgba(236,255,243,0.05) 100%)";

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
