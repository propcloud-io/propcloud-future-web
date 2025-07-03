
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-16 relative z-50">
      <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between text-sm text-slate-300">
        <nav className="flex flex-wrap gap-6 justify-center mb-2 md:mb-0">
          <a href="#home" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            Home
          </a>
          <a href="#services" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            Services
          </a>
          <a href="#how-it-works" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            How It Works
          </a>
          <a href="#ai" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            AI
          </a>
          <a href="#testimonials" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            Contact
          </a>
          <Link to="/about" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            About Us
          </Link>
          <Link to="/blog" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            Blog
          </Link>
          <Link to="/privacy-policy" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">
            Terms of Service
          </Link>
        </nav>
        <div className="flex flex-col items-center md:items-end gap-1">
          <span>
            <a href="mailto:contact@propcloud.io" className="hover:text-teal-400 transition-colors duration-300 font-semibold text-slate-200">contact@propcloud.io</a>
          </span>
          <div className="text-xs text-slate-400 text-center md:text-right">
            <div className="mb-1">
              PropCloud Inc.<br />
              1111B S Governors Ave, Suite 34285<br />
              Dover, DE 19904, United States
            </div>
            <div className="mt-1">
              © propcloud Inc. — All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
