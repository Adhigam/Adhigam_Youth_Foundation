import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Adhigam Youth Foundation is doing incredible work in giving children opportunities they might not otherwise have. Through storytelling, art and craft, stage performances, dance, and communication activities, they help children express themselves, build confidence, and explore their creativity.",
      name: "Monika Gupta",
      role: "Parent",
      img: "/asset/img1.webp"
    },
    {
      quote: "I visited Adhigam Youth Foundation for just one day, but the experience left a lasting impression on me. The warmth, energy, and creativity I witnessed among the children and the team were truly inspiring. It was wonderful to see how beautifully Adhigam is nurturing young minds.",
      name: "Soni Mishra",
      role: "Volunteer",
      img: "/asset/img2.webp"
    },
    {
      quote: "I initially joined Adhigam on a friend's suggestion, thinking it would just be for fun. However, my experience turned out to be so much more meaningful. During my time here, I learned the value of teamwork, gained new experiences, and had the opportunity to interact directly with children.",
      name: "Saloni Thakur",
      role: "Ex-Volunteer",
      img: "/asset/img3.webp"
    }
  ];

  return (
    <section className="py-20 md:py-20 bg-white relative overflow-hidden">
      {/* Decorative quotes background */}
      <Quote size={400} className="absolute text-gray-50 opacity-50 -top-10 -left-10 z-0 rotate-12" />
      <Quote size={300} className="absolute text-gray-50 opacity-50 -bottom-10 -right-10 z-0 rotate-12" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">What People <span className="text-primary">Say</span></h2>
          <p className="text-lg text-gray-600">
            Testimonials from our community members and supporters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col justify-between">
              <div>
                <Quote size={40} className="text-primary/20 mb-6" />
                <p className="text-gray-600 leading-relaxed italic mb-8 font-medium">"{t.quote}"</p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                  <span className="text-sm text-primary font-semibold">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
