
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                <div className="absolute w-6 h-6 bg-white rounded-full animate-pulse-soft"></div>
                <div className="relative z-10 text-white font-bold">SJ</div>
              </div>
              <span className="text-xl font-semibold text-gray-900">SkyJourney</span>
            </Link>
            <p className="text-gray-600 mb-6">
              Experience seamless flight booking with SkyJourney's intuitive platform. Your journey begins here.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-sky-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-sky-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-sky-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-sky-500 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-sky-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/flights" className="text-gray-600 hover:text-sky-500 transition-colors">Flights</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-sky-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-sky-500 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-sky-500 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-sky-500 transition-colors">Register</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-sky-500 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/services/baggage" className="text-gray-600 hover:text-sky-500 transition-colors">Baggage Information</Link>
              </li>
              <li>
                <Link to="/services/special" className="text-gray-600 hover:text-sky-500 transition-colors">Special Assistance</Link>
              </li>
              <li>
                <Link to="/services/meals" className="text-gray-600 hover:text-sky-500 transition-colors">In-flight Meals</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-sky-500 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-sky-500 transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <span className="text-gray-600">123 SkyJourney Avenue, Cloud City, CA 90210</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <span className="text-gray-600">support@skyjourney.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SkyJourney. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
