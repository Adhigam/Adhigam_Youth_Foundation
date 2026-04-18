import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <>
      {/* Pre-Footer Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Address</h4>
                <p className="text-gray-600 text-sm leading-relaxed">IG Camp, Hari Nagar.<br/>Near- Sunlight Colony<br/>Ashram, Delhi 110014</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">HQ Address</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">308-C, BG- 6, Paschim Vihar<br/>Near Mohalla Clinic, 110063</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Phone</h4>
                <p className="text-gray-600 text-sm leading-relaxed">+91 63923 32324<br/>+91 93115 48596</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Email</h4>
                <a href="mailto:adhigamyouthfoundation@gmail.com" className="text-primary hover:underline text-sm break-all font-medium">adhigamyouthfoundation@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Working Hours</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Mon - Fri: 10:00 AM - 5:00 PM<br/>Sunday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src="/Adhigam_Logo.jpg" alt="Adhigam Logo" className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
                <h3 className="text-2xl font-bold tracking-wider">Adhigam</h3>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Empowering communities through education, awareness, and skill development. Building self-reliant, forward-thinking communities for a better tomorrow.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/adhigam_india?igsh=MTg2MWR4amlrM3E1eg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/adhigamyouthfoundation/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 pb-2 border-b border-white/10 inline-block">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'About', 'Programs', 'Impact', 'Events', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 pb-2 border-b border-white/10 inline-block">Our Programs</h4>
              <ul className="space-y-4">
                <li><a href="#programs" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Creative Learning</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Kathak Dance</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Theatre Group</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 pb-2 border-b border-white/10 inline-block">Get Involved</h4>
              <ul className="space-y-4">
                <li><a href="#donate" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Donate</a></li>
                <li><a href="#volunteer" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Volunteer</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Partner With Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Adhigam Youth Foundation. All rights reserved.</p>
            <p className="flex items-center gap-1">Designed with <Heart size={14} className="text-red-500 fill-red-500" /> for a better tomorrow</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
