
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import SmoothScrollLink from "@/components/ui/SmoothScrollLink";

const navItems = [
  { label: "Home", to: "#home" },
  { label: "Services", to: "#services" },
  { label: "How It Works", to: "#how-it-works" },
  { label: "AI", to: "#ai" },
  { label: "Testimonials", to: "#testimonials" },
  { label: "Contact", to: "#contact" },
];

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Listen to scroll for header transparency
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll now unified via SmoothScrollLink for anchors
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 
        ${scrolled ? "bg-white/90 shadow-sm backdrop-blur" : "bg-white/95 border-b border-gray-medium"}
      `}
      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
    >
      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" aria-label="propcloud homepage" className="flex items-center min-w-fit">
          <Logo size="text-2xl md:text-3xl" />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium text-propcloud-800">
          {navItems.map((item) => (
            <SmoothScrollLink
              key={item.label}
              to={item.to}
              className="transition text-propcloud-800 hover:bg-gradient-to-r hover:from-propcloud-700 hover:to-accent-600 hover:bg-clip-text hover:text-transparent px-2 py-1 font-semibold text-base"
            >
              {item.label}
            </SmoothScrollLink>
          ))}
        </div>
        {/* About Us Button */}
        <Link
          to="/about"
          className="hidden md:inline-block bg-gradient-to-r from-propcloud-700 to-accent-600 px-6 py-2 rounded-lg text-white font-semibold text-base shadow-soft hover:brightness-110 hover:scale-105 transition duration-200 ml-6"
        >
          About Us
        </Link>
        {/* Mobile Menu Button */}
        <button
          className="flex md:hidden p-2 rounded hover:bg-propcloud-50 transition"
          aria-label="Open navigation menu"
          onClick={() => setShowMobileMenu((v) => !v)}
        >
          <Menu size={24} />
        </button>
      </nav>
      {/* Mobile Slide-down Menu */}
      {showMobileMenu && (
        <div className="md:hidden animate-fade-in bg-white shadow px-4 pb-4 border-b border-gray-medium flex flex-col gap-2">
          {navItems.map((item, idx) => (
            <SmoothScrollLink
              key={item.label}
              to={item.to}
              className="text-lg p-2 font-semibold hover:bg-gradient-to-r hover:from-propcloud-700 hover:to-accent-600 hover:bg-clip-text hover:text-transparent transition"
              style={{ animation: `fade-up 0.3s cubic-bezier(.4,0,.2,1) ${0.04 * idx}s both` }}
              onClick={() => setShowMobileMenu(false)}
            >
              {item.label}
            </SmoothScrollLink>
          ))}
          <Link
            to="/about"
            className="mt-2 inline-block bg-gradient-to-r from-propcloud-700 to-accent-600 text-white py-2 px-4 rounded-lg font-semibold text-base shadow hover:brightness-110 transition"
            onClick={() => setShowMobileMenu(false)}
          >
            About Us
          </Link>
        </div>
      )}
    </header>
  );
}
