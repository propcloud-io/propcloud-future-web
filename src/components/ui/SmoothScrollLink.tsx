
import React from "react";

interface SmoothScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export default function SmoothScrollLink({ to, children, ...props }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const targetId = to.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        const headerHeight = 80; // Consistent with Header component
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop - headerHeight;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth"
        });
        
        // Update hash after scrolling
        setTimeout(() => {
          window.history.replaceState(null, "", to);
        }, 150);
      }
    }
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
