
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="container py-8 flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between text-sm text-gray-500">
        <nav className="flex gap-6 justify-center mb-3 md:mb-0">
          <a href="#home" className="hover:text-primaryAccent transition">Home</a>
          <Link to="/about" className="hover:text-primaryAccent transition">About Us</Link>
          <a href="mailto:contact@propcloud.io" className="hover:text-primaryAccent transition">Contact</a>
        </nav>
        <div className="flex flex-col items-center md:items-end gap-1">
          <span>
            <a href="mailto:contact@propcloud.io" className="hover:text-gray-700 transition">contact@propcloud.io</a>
          </span>
          <span className="text-xs text-gray-400 mt-1">
            © PropCloud Inc. — All rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}
