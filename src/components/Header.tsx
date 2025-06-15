
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Home", to: "#home" },
  { label: "Services", to: "#services" },
  { label: "How It Works", to: "#how-it-works" },
  { label: "AI", to: "#ai" },
  { label: "Contact", to: "#contact" },
];

export default function Header() {
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Smooth scroll handler for anchor links
  const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, to: string) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(to);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setShowMobileMenu(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-primaryAccent text-xl tracking-tight hover:opacity-80 transition">
          <span className="rounded bg-primaryAccent text-white px-2 py-1 font-extrabold text-lg">PropCloud</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12 font-medium text-gray-900">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.to}
              onClick={(e) => onAnchorClick(e, item.to)}
              className="hover:text-primaryAccent transition px-1 py-0.5"
            >
              {item.label}
            </a>
          ))}
        </div>
        {/* About Us Button */}
        <Link to="/about" className="hidden md:inline-block bg-primaryAccentGreen px-5 py-2 rounded-lg text-white font-semibold text-base shadow-soft hover:bg-primaryAccentGreen/90 transition ml-6">About Us</Link>
        {/* Mobile Menu Button */}
        <button
          className="flex md:hidden p-2 rounded hover:bg-gray-50"
          aria-label="Open navigation menu"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Menu size={24} />
        </button>
      </nav>
      {/* Mobile Slide-down Menu */}
      {showMobileMenu && (
        <div className="md:hidden animate-fade-in bg-white shadow px-4 pb-4 border-b border-gray-100 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.to}
              onClick={(e) => onAnchorClick(e, item.to)}
              className="text-lg hover:text-primaryAccent transition"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/about"
            className="mt-2 inline-block bg-primaryAccentGreen text-white py-2 px-4 rounded-lg font-semibold text-base shadow hover:bg-primaryAccentGreen/90 transition"
            onClick={() => setShowMobileMenu(false)}
          >
            About Us
          </Link>
        </div>
      )}
    </header>
  );
}
