
import React from "react";

interface SmoothScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export default function SmoothScrollLink({ to, children, ...props }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(to);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Optional: update hash
        window.history.replaceState(null, "", to);
      }
    }
  };
  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
