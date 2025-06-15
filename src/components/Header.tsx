
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, Home, Eye, Contact } from "lucide-react";

const navItems = [
  { name: "Home", to: "/" },
  { name: "AI Vision", to: "/ai-vision" },
  { name: "Contact", to: "mailto:contact@propcloud.io" }
];

export default function Header() {
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-primaryAccent text-xl tracking-tight hover:opacity-80 transition">{/* Logo could go here */}
          <span className="rounded bg-primaryAccent text-white px-2 py-1 font-extrabold text-lg">PropCloud</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-900">
          <NavLinks locationPath={location.pathname} />
        </div>
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
        <div className="md:hidden animate-fade-in bg-white shadow px-4 pb-4 border-b border-gray-100">
          <NavLinks locationPath={location.pathname} closeMenu={() => setShowMobileMenu(false)} />
        </div>
      )}
    </header>
  );
}

function NavLinks({
  locationPath,
  closeMenu,
}: {
  locationPath: string;
  closeMenu?: () => void;
}) {
  return (
    <>
      {navItems.map((item) =>
        item.to.startsWith("mailto:") ? (
          <a
            key={item.name}
            href={item.to}
            className="hover:text-primaryAccent transition"
          >
            {item.name}
          </a>
        ) : (
          <Link
            key={item.name}
            to={item.to}
            onClick={closeMenu}
            className={`transition px-1 py-0.5 ${
              locationPath === item.to
                ? "text-primaryAccent border-b-2 border-primaryAccent"
                : "hover:text-primaryAccent"
            }`}
          >
            {item.name}
          </Link>
        )
      )}
    </>
  );
}
