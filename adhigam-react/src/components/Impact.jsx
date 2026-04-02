import React, { useState, useEffect, useRef } from 'react';
import { Users, Calendar, GraduationCap, HeartHandshake, X, BookOpen } from 'lucide-react';

const CountUp = ({ end, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let observer;
    let startTime;
    let animationFrame;

    const startAnimation = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - percentage, 3); // cubic ease out
      setCount(Math.floor(end * easeOut));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(startAnimation);
      } else {
        setCount(end);
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrame = requestAnimationFrame(startAnimation);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Impact = () => {
  const [activeStory, setActiveStory] = useState(null);

  const stats = [
    { icon: <Users size={32} />, count: 200, suffix: "+", label: "Children Empowered" },
    { icon: <Calendar size={32} />, count: 50, suffix: "+", label: "Weekly Sessions" },
    { icon: <GraduationCap size={32} />, count: 3, suffix: "+", label: "Active Programs" },
    { icon: <HeartHandshake size={32} />, count: 20, suffix: "+", label: "Volunteers" }
  ];

  const stories = [
    {
      id: "Mukul",
      name: "Mukul's transformation",
      title: "Unlocking Confidence",
      excerpt: "\"When we first met Mukul, he was a very reserved child. He rarely spoke to anyone outside his small circle of close friends...\"",
      image: "/asset/yusuf.webp",
      fullText: (
        <>
          <p className="mb-4">When we first met Mukul, he was a very reserved child. He rarely spoke to anyone outside his small circle of close friends. During our visits, he would quietly observe us from a distance but never join in the games or activities.</p>
          <p className="mb-4">But change takes just a spark of connection. As we slowly began talking to him, listening to him, and encouraging him, Mukul started opening up. Step by step, he began engaging with us, sharing his thoughts, and taking part in group activities.</p>
          <p>Today, Mukul is not only an active participant but also a proud member of our theatre group. He is learning, performing, and improving his acting skills every single day. His journey from silence to expression is an inspiring reminder that with the right support and safe space, every child has the power to shine.</p>
        </>
      )
    },
    {
      id: "ritu",
      name: "Ritu's Journey",
      title: "Finding Purpose",
      excerpt: "\"Ritu, a passionate member of our Community Engagement Team, is a wonderful example of how life can change when you find the right purpose.\"",
      image: "/asset/ritu.webp",
      fullText: (
        <>
          <p className="mb-4">Just a year before joining Adhigam, Ritu faced one of the toughest phases of her life. Her childhood dream was to become an air hostess, but due to personal and family reasons, that dream could not come true. The setback left her broken and disappointed. But instead of giving up, she chose a new direction. Ritu completed her B.Ed. degree last year and began her training in the teaching field.</p>
          <p className="mb-4">It was through Nidhi, our founder, that Ritu first came to know about Adhigam. At the beginning, she thought of visiting "just once" to see how it works. But when she came for the very first time and met the children, she instantly felt a deep connection. That day she realized this is not something temporary—this is something she wanted to continue and grow with.</p>
          <p className="mb-4">With the support of her parents and encouragement from the Adhigam family, Ritu started engaging with children and youth in the community. She discovered a new kind of joy in working with them—helping them grow, guiding them, and empowering them with confidence.</p>
          <p>Ritu often says that Adhigam has given her not just a platform, but also a family where she feels supported and encouraged. Today, Ritu dreams of being with Adhigam for a lifetime, working for the cause of making children and youth self-reliant.</p>
        </>
      )
    }
  ];

  return (
    <section id="impact" className="py-20 md:py-20 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Stats Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Our <span className="text-secondary">Impact</span></h2>
          <p className="text-lg text-gray-600">Transforming lives and building stronger communities</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-100 rounded-2xl p-6 md:p-8 text-center shadow-md border border-gray-100 hover:border-secondary hover:-translate-y-2 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                <CountUp end={stat.count} suffix={stat.suffix} />
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Stories Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Success <span className="text-primary">Stories</span></h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-10 max-w-6xl mx-auto">
          {stories.map(story => (
            <div key={story.id} className="group relative flex flex-col w-full max-w-[480px] min-h-[480px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-gray-50">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[200px] h-[190px] rounded-md overflow-hidden border-4 border-white shadow-[0_4px_6px_rgba(0,0,0,0.2)] bg-gray-50 z-10">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-110" />
              </div>
              <div className="flex-1 flex flex-col pt-[230px] p-6 text-center">
                <h4 className="text-[18px] font-bold text-[#136a8a] mb-4">{story.title}: {story.name}</h4>
                <p className="text-[14px] text-gray-800 mb-2 flex-1 px-2">{story.excerpt}</p>
                
                <div className="flex justify-center pb-2">
                  <button 
                    onClick={() => setActiveStory(story)}
                    className="group/btn inline-flex items-center gap-2 text-[#136a8a] font-bold uppercase tracking-wide text-[13px] transition-all duration-300 hover:text-[#267871]"
                  >
                    <BookOpen size={16} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:text-[#267871]" /> 
                    <span className="relative">
                      Read Full Story
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#267871] transition-all duration-300 group-hover/btn:w-full"></span>
                    </span>
                    <svg className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveStory(null)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setActiveStory(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">{activeStory.title}: {activeStory.name}</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                {activeStory.fullText}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Impact;
