import React from 'react';
import { Eye, Target, Heart, CheckCircle2 } from 'lucide-react';

const About = () => {
  const values = [
    "Integrity", "Transparency", "Accountability", "Sustainability", 
    "Inclusivity", "Compassion", "Empathy", "Trust"
  ];

  return (
    <section id="about" className="py-20 md:py-20 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">About <span className="text-primary">Adhigam</span></h2>
          <p className="text-lg text-gray-600">
            Empowering communities through education, awareness, and skill development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Vision */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 transform group-hover:-translate-y-2">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              We envision a community that is empowered, self-sustaining, and resilient—thriving through its 
              own resources and ingenuity. By nurturing independence and long-term growth, we aim to inspire 
              individuals to take ownership of their futures and become catalysts for enduring, positive 
              transformation.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300 transform group-hover:-translate-y-2">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to cultivate a self-reliant, forward-thinking community by equipping individuals 
              with the tools, knowledge, and support needed to fuel sustainable growth. We champion 
              resilience, spark innovation, and foster collaborative spirit.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300 transform group-hover:-translate-y-2">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Our Values</h3>
            <div className="flex flex-wrap gap-3">
              {values.map((value, index) => (
                <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-sm font-medium text-gray-700 border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-default">
                  <CheckCircle2 size={14} className="text-primary" />
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
