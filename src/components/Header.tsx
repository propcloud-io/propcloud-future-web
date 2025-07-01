
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Logo from "./Logo";

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
  const location = useLocation();
  const navigate = useNavigate();

  // Listen to scroll for header transparency
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Function to handle smooth navigation with consistent offset
  const handleNavigation = (to: string) => {
    const targetId = to.substring(1); // Remove the # symbol
    
    if (location.pathname !== '/') {
      // If we're not on the index page, navigate to index first with smooth transition
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerHeight = 80;
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - headerHeight;
          
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth"
          });
          
          setTimeout(() => {
            window.history.replaceState(null, "", to);
          }, 150);
        }
      }, 100);
      return;
    }

    // If we're on index page, use smooth scroll with consistent offset
    const scrollToElement = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const headerHeight = 80; // Fixed header height
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop - headerHeight;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth"
        });
        
        // Update URL hash after a brief delay
        setTimeout(() => {
          window.history.replaceState(null, "", to);
        }, 150);
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(scrollToElement, 50);
  };

  // Handle hash navigation on page load
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const targetId = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerHeight = 80;
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - headerHeight;
          
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 
        ${scrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-white/98 border-b border-gray-200"}
      `}
      style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
    >
      <nav className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link to="/" aria-label="propcloud homepage" className="flex items-center min-w-fit transition-transform hover:scale-105">
          <Logo size="text-2xl md:text-3xl" />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 font-medium text-propcloud-800">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.to)}
              className="relative transition-all duration-200 text-propcloud-800 hover:bg-gradient-to-r hover:from-propcloud-700 hover:to-accent-600 hover:bg-clip-text hover:text-transparent px-3 py-2 font-semibold text-sm bg-transparent border-none cursor-pointer whitespace-nowrap rounded-lg hover:bg-propcloud-50/50 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-propcloud-700 to-accent-600 transition-all duration-200 group-hover:w-full"></span>
            </button>
          ))}
        </div>
        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/app"
            className="relative text-propcloud-800 hover:bg-gradient-to-r hover:from-propcloud-700 hover:to-accent-600 hover:bg-clip-text hover:text-transparent px-4 py-2 font-semibold text-sm transition-all duration-200 whitespace-nowrap rounded-lg hover:bg-propcloud-50/50 group"
          >
            App
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-propcloud-700 to-accent-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            to="/about"
            className="bg-gradient-to-r from-propcloud-700 to-accent-600 px-5 py-2.5 rounded-lg text-white font-semibold text-sm shadow-soft hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-200 whitespace-nowrap"
          >
            About Us
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="flex lg:hidden p-2 rounded-lg hover:bg-propcloud-50 transition-all duration-200 hover:scale-105"
          aria-label="Open navigation menu"
          onClick={() => setShowMobileMenu((v) => !v)}
        >
          <Menu size={24} />
        </button>
      </nav>
      {/* Mobile Slide-down Menu */}
      {showMobileMenu && (
        <div className="lg:hidden animate-fade-in bg-white/98 backdrop-blur-md shadow-lg px-4 pb-4 border-b border-gray-200 flex flex-col gap-2">
          {navItems.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => {
                handleNavigation(item.to);
                setShowMobileMenu(false);
              }}
              className="text-lg p-3 font-semibold hover:bg-gradient-to-r hover:from-propcloud-700 hover:to-accent-600 hover:bg-clip-text hover:text-transparent transition-all duration-200 text-left bg-transparent border-none cursor-pointer rounded-lg hover:bg-propcloud-50/50"
              style={{ animation: `fade-up 0.3s cubic-bezier(.4,0,.2,1) ${0.04 * idx}s both` }}
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/app"
            className="text-lg p-3 font-semibold hover:bg-gradient-to-r hover:from-propcloud-700 hover:to-accent-600 hover:bg-clip-text hover:text-transparent transition-all duration-200 text-left rounded-lg hover:bg-propcloud-50/50"
            onClick={() => setShowMobileMenu(false)}
          >
            App
          </Link>
          <Link
            to="/about"
            className="mt-2 inline-block bg-gradient-to-r from-propcloud-700 to-accent-600 text-white py-3 px-5 rounded-lg font-semibold text-base shadow-soft hover:brightness-110 hover:scale-105 transition-all duration-200"
            onClick={() => setShowMobileMenu(false)}
          >
            About Us
          </Link>
        </div>
      )}
    </header>
  );
}
