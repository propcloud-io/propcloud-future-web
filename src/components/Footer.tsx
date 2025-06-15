
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-medium mt-16">
      <div className="container py-10 flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between text-sm text-propcloud-900">
        <nav className="flex gap-6 justify-center mb-2 md:mb-0">
          <a href="#home" className="hover:text-propcloud-500 transition font-semibold">
            Home
          </a>
          <Link to="/about" className="hover:text-propcloud-500 transition font-semibold">
            About Us
          </Link>
          <a href="mailto:contact@propcloud.io" className="hover:text-propcloud-500 transition font-semibold">
            Contact
          </a>
        </nav>
        <div className="flex flex-col items-center md:items-end gap-1">
          <span>
            <a href="mailto:contact@propcloud.io" className="hover:text-propcloud-600 transition font-semibold">contact@propcloud.io</a>
          </span>
          <span className="text-xs text-propcloud-400 mt-1">
            © PropCloud Inc. — All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
