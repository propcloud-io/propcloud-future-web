
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-gray-medium mt-16">
      <div className="container py-10 flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between text-sm text-black">
        <nav className="flex gap-6 justify-center mb-2 md:mb-0">
          <a href="#home" className="hover:text-blue-600 transition font-semibold lowercase">
            home
          </a>
          <a href="#services" className="hover:text-blue-600 transition font-semibold lowercase">
            services
          </a>
          <a href="#how-it-works" className="hover:text-blue-600 transition font-semibold lowercase">
            how it works
          </a>
          <a href="#ai" className="hover:text-blue-600 transition font-semibold lowercase">
            ai
          </a>
          <a href="#testimonials" className="hover:text-blue-600 transition font-semibold lowercase">
            testimonials
          </a>
          <a href="#contact" className="hover:text-blue-600 transition font-semibold lowercase">
            contact
          </a>
          <Link to="/about" className="hover:text-blue-600 transition font-semibold lowercase">
            about us
          </Link>
        </nav>
        <div className="flex flex-col items-center md:items-end gap-1">
          <span>
            <a href="mailto:contact@propcloud.io" className="hover:text-blue-600 transition font-semibold lowercase">contact@propcloud.io</a>
          </span>
          <span className="text-xs text-blue-400 mt-1 lowercase">
            © propcloud inc. — all rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
