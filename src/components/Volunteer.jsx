import React from 'react';
import { Heart, Users, GraduationCap, HandHeart, ArrowRight } from 'lucide-react';

const Volunteer = () => {
  const benefits = [
    {
      icon: <Heart size={32} />,
      title: "Hands on field exposure",
      desc: "Step in and be part of real stories of change. Every moment in the field is a chance to learn and make a difference."
    },
    {
      icon: <Users size={32} />,
      title: "Lead & Learn",
      desc: "Discover your strengths, build new skills, and grow into a leader-while creating impact that lasts."
    },
    {
      icon: <GraduationCap size={32} />,
      title: "Mentorship & Collaboration",
      desc: "Embark on your growth journey with experienced mentors and collaborate with energetic peers who inspire, support, and learn alongside you."
    },
    {
      icon: <HandHeart size={32} />,
      title: "Network of young energy",
      desc: "Be a part of a vibrant, energetic community of young changemakers-full of ideas, creativity, laughter and passion-where your presence truly matters."
    }
  ];

  return (
    <section id="volunteer" className="py-20 md:py-20 bg-gray-100 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Why <span className="text-primary">Volunteer</span> With Us?</h2>
          <p className="text-lg text-gray-600">
            Make a difference by volunteering with Adhigam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((b, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {b.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{b.title}</h4>
              <p className="text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-3xl p-10 md:p-16 text-center shadow-xl border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative z-10">Apply to Volunteer</h3>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto relative z-10 text-lg">Join our community of changemakers and contribute to building a more self-reliant society.</p>
            
            <a 
              href="https://forms.gle/KRyeSJgKBx8kgmCF9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative z-10"
            >
              Join Us <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
