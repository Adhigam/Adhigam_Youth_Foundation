import React from 'react';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

const Events = () => {
  const events = [
    {
      date: { day: '16', month: 'Nov' },
      title: "Children's Day Event",
      time: "10:00 AM - 12:00 PM",
      location: "Community Center, IG Camp Ashram",
      desc: "Celebrate the spirit of childhood with us this Children's Day! Join us for a day full of fun, learning, and unforgettable memories.",
      link: null
    },
    {
      date: { day: 'Every', month: 'Sun' },
      title: "Creative Learning Sessions",
      time: "10:00 AM - 2:00 PM",
      location: "Community Center, IG Camp Ashram",
      desc: "Witness the beautiful performances by our Kathak dance students showcasing their skills.",
      link: "https://forms.gle/KRyeSJgKBx8kgmCF9"
    }
  ];

  return (
    <section id="events" className="py-20 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Upcoming <span className="text-primary">Events</span></h2>
          <p className="text-lg text-gray-600">
            Join us in our community activities and programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <div key={index} className="flex bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1">
              {/* Date Box */}
              <div className="w-1/3 md:w-1/4 bg-primary text-white p-6 flex flex-col items-center justify-center text-center group-hover:bg-primary/90 transition-colors">
                <span className="text-3xl md:text-4xl font-black mb-1">{event.date.day}</span>
                <span className="text-lg md:text-xl font-medium uppercase tracking-wider opacity-90">{event.date.month}</span>
              </div>
              
              {/* Content */}
              <div className="w-2/3 md:w-3/4 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                
                <div className="space-y-2 mb-6 text-gray-600">
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" /> 
                    <span className="font-medium">{event.time}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" /> 
                    <span className="font-medium">{event.location}</span>
                  </p>
                </div>
                
                <p className="text-gray-600 mb-6 flex-grow">{event.desc}</p>
                
                {event.link && (
                  <a href={event.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors uppercase tracking-wider text-sm mt-auto">
                    Register Now <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
