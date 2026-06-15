import React from 'react';
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import {
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterModern = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lost Items', path: '/lostItems' },
    { name: 'Found Items', path: '/founditems' },
    { name: 'Post Item', path: '/postitem' },
  ];

  const resources = [
    { name: 'My Listings', path: '/mylistings' },
    { name: 'How It Works', path: '/' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <Facebook className="w-5 h-5" />, 
      url: 'https://facebook.com',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'X', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      url: 'https://x.com',
      color: 'hover:text-gray-300'
    },
    { 
      name: 'Instagram', 
      icon: <Instagram className="w-5 h-5" />, 
      url: 'https://instagram.com',
      color: 'hover:text-pink-400'
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="w-5 h-5" />, 
      url: 'https://linkedin.com',
      color: 'hover:text-blue-500'
    },
  ];

  return (
    <footer className="relative text-gray-300 w-full" style={{
      background: 'linear-gradient(135deg, rgb(17 24 39), rgb(31 41 55), rgb(17 24 39))'
    }}>
      {/* Top Shadow/Border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgb(75 85 99), transparent)'
      }}></div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{
                background: 'linear-gradient(135deg, rgb(59 130 246), rgb(37 99 235))',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
              }}>
                <MapPinIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Lost & Found
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Helping people reunite with their lost belongings through our trusted community platform. 
              Together, we make finding easier.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <HeartIcon className="w-4 h-4 text-red-400" />
              <span>Made with care for the community</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12" style={{
                height: '2px',
                background: 'linear-gradient(to right, rgb(59 130 246), transparent)'
              }}></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-px bg-blue-500 transition-all duration-300"></span>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Resources
              <span className="absolute -bottom-2 left-0 w-12" style={{
                height: '2px',
                background: 'linear-gradient(to right, rgb(59 130 246), transparent)'
              }}></span>
            </h4>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-px bg-blue-500 transition-all duration-300"></span>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Connect With Us
              <span className="absolute -bottom-2 left-0 w-12" style={{
                height: '2px',
                background: 'linear-gradient(to right, rgb(59 130 246), transparent)'
              }}></span>
            </h4>
            
            {/* Contact Info */}
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-gray-400">
                <EnvelopeIcon className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                <a 
                  href="mailto:support@lostandfound.com" 
                  className="hover:text-white transition-colors duration-300"
                >
                  support@lostandfound.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <PhoneIcon className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className="hover:text-white transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div>
              <p className="text-sm text-gray-500 mb-3">Follow us on social media</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-8">
          <div className="h-px" style={{
            background: 'linear-gradient(to right, transparent, rgb(55 65 81), transparent)'
          }}></div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-gray-500 text-sm text-center">
            &copy; {currentYear} Lost & Found. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="h-1" style={{
        background: 'linear-gradient(to right, rgb(37 99 235), rgb(59 130 246), rgb(37 99 235))'
      }}></div>
    </footer>
  );
};

export default FooterModern;
