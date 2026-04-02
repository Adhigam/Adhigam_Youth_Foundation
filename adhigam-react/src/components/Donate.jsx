import React, { useState } from 'react';
import { GraduationCap, Heart, HandHeart, X } from 'lucide-react';

const Donate = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  return (
    <section id="donate" className="py-20 md:py-20 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Support Our <span className="text-secondary">Mission</span></h2>
          <p className="text-lg text-gray-600">
            Your donation helps us continue our work in empowering communities
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Info Side */}
          <div className="lg:w-1/2">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 h-full shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Donate?</h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Education Access</h4>
                    <p className="text-gray-600">Help provide quality education to underprivileged children</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <HandHeart size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Community Development</h4>
                    <p className="text-gray-600">Support programs that strengthen communities</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Sustainable Impact</h4>
                    <p className="text-gray-600">Create lasting positive change in society</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-8">
                <div className="text-center">
                  <h4 className="text-2xl font-black text-primary mb-1">500+</h4>
                  <p className="text-xs text-gray-600 font-medium uppercase tracking-wider">Children Helped</p>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <h4 className="text-2xl font-black text-secondary mb-1">₹20K+</h4>
                  <p className="text-xs text-gray-600 font-medium uppercase tracking-wider">Funds Raised</p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-black text-primary mb-1">25+</h4>
                  <p className="text-xs text-gray-600 font-medium uppercase tracking-wider">Volunteers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-8 relative z-10">Make a Donation</h3>
              
              <form onSubmit={handleDonateSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input type="text" placeholder="Full Name" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700" />
                  </div>
                  <div>
                    <input type="email" placeholder="Email Address" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input type="tel" placeholder="Phone Number" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700" />
                  </div>
                  <div>
                    <input type="number" placeholder="Amount (₹)" min="100" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 font-medium" />
                  </div>
                </div>
                
                <div>
                  <select required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 appearance-none">
                    <option value="" disabled selected>Select Purpose</option>
                    <option value="education">Education Programs</option>
                    <option value="cultural">Cultural Activities</option>
                    <option value="community">Community Development</option>
                    <option value="general">General Support</option>
                  </select>
                </div>
                
                <div>
                  <textarea placeholder="Message (Optional)" rows="3" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 resize-none"></textarea>
                </div>
                
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Heart size={20} className="fill-current" /> Donate Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Dialog Modal */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDialog(false)}></div>
          <div className="relative bg-white rounded-3xl p-8 md:p-12 text-center max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowDialog(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Heart size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature Coming Soon!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Please Contact <strong className="text-gray-900 border-b-2 border-primary/30 pb-0.5">+91 63923 32324</strong> to make a Donation.</p>
            <button 
              onClick={() => setShowDialog(false)}
              className="w-full btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Donate;
