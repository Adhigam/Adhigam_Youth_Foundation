import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: "Empowering Communities \n Through Education",
    desc: "Building self-reliant, forward-thinking communities by equipping individuals with knowledge, tools, and support for sustainable growth.",
    bg: "/asset/main2.webp",
    primaryAction: { text: "Learn More", href: "#about" },
    secondaryAction: { text: "Donate Now", href: "#donate" }
  },
  {
    title: "Creative Learning & \n Skill Development",
    desc: "Weekly sessions using fun games, storytelling, and art activities to develop critical thinking and self-expression.",
    bg: "/asset/main1.webp",
    primaryAction: { text: "Our Programs", href: "#programs" },
    secondaryAction: { text: "View Gallery", href: "#gallery" }
  },
  {
    title: "Cultural Preservation \n Through Arts",
    desc: "Kathak dance and theatre groups helping children explore culture, build confidence, and develop communication skills.",
    bg: "/asset/main3.webp",
    primaryAction: { text: "Join Us", href: "#contact" },
    secondaryAction: { text: "Get Involved", href: "#events" }
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="absolute inset-0 bg-cover bg-center bg-fixed" 
               style={{ backgroundImage: `url(${slide.bg})` }}></div>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          <div className="relative cursor-default z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto pt-20">
            <img src="/Adhigam_Logo.jpg" alt="Adhigam Youth Foundation Logo" className="w-[30%] h-[20%] md:w-50 md:h-50 mb-8 rounded-full shadow-2xl transition-transform duration-500 hover:scale-110" />
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight whitespace-pre-line drop-shadow-xl translate-y-0 opacity-100 transition-all duration-700 delay-100">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl drop-shadow-md transition-all duration-700 delay-300">
              {slide.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500">
              <a href={slide.primaryAction.href} className="btn-primary px-8 py-4 text-lg">
                {slide.primaryAction.text}
              </a>
              <a href={slide.secondaryAction.href} className="btn-primary bg-white text-primary px-8 py-4 text-lg">
                {slide.secondaryAction.text}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black bg-opacity-20 text-white hover:bg-opacity-50 transition-all focus:outline-none hidden sm:block">
        <ChevronLeft size={32} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black bg-opacity-20 text-white hover:bg-opacity-50 transition-all focus:outline-none hidden sm:block">
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none ring-2 ring-transparent hover:ring-primary/50 ring-offset-2 ${index === currentSlide ? 'bg-primary w-10' : 'bg-white bg-opacity-50 hover:bg-opacity-100 w-3'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
