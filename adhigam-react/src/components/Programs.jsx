import React from 'react';
import { Check } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      title: "Creative Learning & Skill-Building",
      age: "Ages 4–17 years",
      desc: "Weekly engagements using fun games, storytelling, and art & craft activities aimed at developing critical thinking, collaboration, and self-expression.",
      features: ["Fun games and activities", "Storytelling sessions", "Art & craft workshops", "Critical thinking development"],
      color: "primary"
    },
    {
      title: "Kathak Dance Group",
      age: "All ages welcome",
      desc: "A small but enthusiastic group exploring classical dance as a way to connect with culture and build confidence, discipline, and joy.",
      features: ["Classical dance training", "Cultural connection", "Confidence building", "Performance opportunities"],
      color: "primary"
    },
    {
      title: "Theatre Group",
      age: "Ages 8–17 years",
      desc: "Focused on performance, roleplay, and storytelling to help children explore emotions, social issues, and communication.",
      features: ["Performance training", "Roleplay activities", "Storytelling workshops", "Social issue awareness"],
      color: "primary"
    }
  ];

  return (
    <section id="programs" className="py-20 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Our <span className="text-primary">Programs</span></h2>
          <p className="text-lg text-gray-600">
            Empowering youth, women, and children through innovative education and skill development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
            >
              <div className={`h-3 w-full bg-${program.color}`}></div>
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 bg-${program.color}/10 text-${program.color}`}>
                  {program.age}
                </span>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                  {program.desc}
                </p>
                <div className="space-y-4 border-t border-gray-100 pt-6">
                  {program.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-${program.color}/10 flex items-center justify-center text-${program.color}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
