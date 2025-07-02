
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-medium mt-16">
      <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between text-sm text-propcloud-800">
        <nav className="flex flex-wrap gap-6 justify-center mb-2 md:mb-0">
          <a href="#home" className="hover:text-accent-600 transition font-semibold">
            Home
          </a>
          <a href="#services" className="hover:text-accent-600 transition font-semibold">
            Services
          </a>
          <a href="#how-it-works" className="hover:text-accent-600 transition font-semibold">
            How It Works
          </a>
          <a href="#ai" className="hover:text-accent-600 transition font-semibold">
            AI
          </a>
          <a href="#testimonials" className="hover:text-accent-600 transition font-semibold">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-accent-600 transition font-semibold">
            Contact
          </a>
          <Link to="/about" className="hover:text-accent-600 transition font-semibold">
            About Us
          </Link>
          <Link to="/blog" className="hover:text-accent-600 transition font-semibold">
            Blog
          </Link>
          <Link to="/privacy-policy" className="hover:text-accent-600 transition font-semibold">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-accent-600 transition font-semibold">
            Terms of Service
          </Link>
        </nav>
        <div className="flex flex-col items-center md:items-end gap-1">
          <span>
            <a href="mailto:contact@propcloud.io" className="hover:text-propcloud-600 transition font-semibold">contact@propcloud.io</a>
          </span>
          <div className="text-xs text-accent-700 text-center md:text-right">
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
