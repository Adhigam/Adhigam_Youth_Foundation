import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Impact from './components/Impact';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Volunteer from './components/Volunteer';
import Donate from './components/Donate';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Impact />
      <Events />
      <Gallery />
      <Testimonials />
      <Volunteer />
      <Donate />
      <Footer />
    </div>
  );
}

export default App;
