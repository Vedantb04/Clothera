import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  const footerLinks = {
    about: [
      { name: 'About Us', href: '#' },
      { name: 'Delivery Information', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Contact Us', href: '#' },
    ],
    account: [
      { name: 'Sign In', href: '#' },
      { name: 'View Cart', href: '#' },
      { name: 'My Wishlist', href: '#' },
      { name: 'Track My Order', href: '#' },
      { name: 'Help & Support', href: '#' },
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                Vedant's Store
              </h3>
              <p className="text-gray-300 mb-6">
                Your one-stop destination for premium quality clothing and accessories. 
                Experience fashion that defines your style.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">
                    562 Wellington Road, Street 32, San Francisco
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">+91 2222 365 / (+91) 2345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">contact@vedantstore.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">10:00 - 18:00, Mon - Sat</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
                             hover:bg-green-500 transition-colors duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">My Account</h4>
            <ul className="space-y-3">
              {footerLinks.account.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download & Payment */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Install App</h4>
            <p className="text-gray-300 mb-4">From App Store or Google Play</p>
            
            <div className="flex space-x-3 mb-6">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img
                  src="https://via.placeholder.com/120x40/000000/FFFFFF?text=App+Store"
                  alt="Download on App Store"
                  className="h-10 rounded-md"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img
                  src="https://via.placeholder.com/120x40/34A853/FFFFFF?text=Google+Play"
                  alt="Get it on Google Play"
                  className="h-10 rounded-md"
                />
              </a>
            </div>
            
            <div>
              <p className="text-gray-300 mb-3">Secured Payment Gateways</p>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-xs text-white">V</div>
                <div className="w-8 h-5 bg-red-600 rounded-sm flex items-center justify-center text-xs text-white">M</div>
                <div className="w-8 h-5 bg-yellow-500 rounded-sm flex items-center justify-center text-xs text-white">P</div>
                <div className="w-8 h-5 bg-green-600 rounded-sm flex items-center justify-center text-xs text-white">A</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} Vedant's Store. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;