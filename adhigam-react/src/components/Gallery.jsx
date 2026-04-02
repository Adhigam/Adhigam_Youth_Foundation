import React from 'react';

const Gallery = () => {
  const images = [
    {
      src: "/asset/creative_learn1.webp",
      title: "Creative Learning Session",
      desc: "Children engaged in art and craft activities"
    },
    {
      src: "/asset/kathak1.webp",
      title: "Kathak Performance",
      desc: "Students showcasing their dance skills"
    },
    {
      src: "/asset/theater1.webp",
      title: "Theatre Workshop",
      desc: "Drama and acting sessions"
    }
  ];

  return (
    <section id="gallery" className="py-20 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Our <span className="text-secondary">Gallery</span></h2>
          <p className="text-lg text-gray-600">
            Capturing moments of learning, growth, and community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {images.map((img, index) => (
            <div key={index} className="relative group rounded-3xl overflow-hidden shadow-lg h-80 w-full cursor-pointer">
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.title}
                </h3>
                <p className="text-gray-200 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {img.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
