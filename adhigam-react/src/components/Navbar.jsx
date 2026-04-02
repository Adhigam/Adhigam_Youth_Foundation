import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Impact', href: '#impact' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass shadow-md py-1' : 'bg-gradient-to-b from-black/80 to-transparent pt-6 pb-8'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3">
          <img src="/Adhigam_Logo.jpg" alt="Adhigam Logo" className="w-30 h-20 rounded-full" />
          <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-primary' : 'text-primary md:text-white drop-shadow-md'}`}>Adhigam</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className={`relative group px-4 py-2 font-medium rounded-t-md transition-all duration-300 ${scrolled ? 'hover:bg-[#136a8a]/10 hover:text-[#136a8a] text-gray-700' : 'hover:bg-white/20 text-white drop-shadow-md'}`}>
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[3px] scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left ${scrolled ? 'bg-[#136a8a]' : 'bg-white'}`}></span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#donate" className="btn-primary shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ring-2 ring-transparent hover:ring-primary/50 ring-offset-2">
            Donate
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={scrolled ? 'text-gray-800' : 'text-white'} size={28} /> : <Menu className={scrolled ? 'text-gray-800' : 'text-white'} size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full glass shadow-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen py-6' : 'max-h-0 py-0'}`}>
        <ul className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="text-gray-800 font-medium text-lg hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#donate" className="btn-primary mt-2" onClick={() => setIsOpen(false)}>Donate</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
