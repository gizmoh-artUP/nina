import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Menu, X, ArrowRight, Mail, Instagram, ShoppingBag, Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function NinaBussjaegerPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [activeLegalPage, setActiveLegalPage] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [randomHeroImage, setRandomHeroImage] = useState(null);

  // Artworks - define early so it can be used in useEffect
  const artworks = useMemo(() => [
    { 
      id: 1, 
      title: 'Eschbach', 
      year: 2024, 
      price: '3,800 €', 
      sold: false,
      image: 'https://res.cloudinary.com/dsktnxayr/image/upload/v1771581089/nina_art_1_pxbvav.jpg'
    },
    { 
      id: 2, 
      title: 'Fragments of Memory', 
      year: 2024, 
      price: '2,800 €', 
      sold: false,
      image: 'https://res.cloudinary.com/dsktnxayr/image/upload/v1771581088/nina_art_4_vzqhgu.jpg'
    },
    { 
      id: 3, 
      title: 'Urban Pulse', 
      year: 2023, 
      price: 'Sold', 
      sold: true,
      image: 'https://res.cloudinary.com/dsktnxayr/image/upload/v1771581088/nina_art_3_uveqo0.jpg'
    },
    { 
      id: 4, 
      title: 'Ethereal Depths', 
      year: 2024, 
      price: '3,200 €', 
      sold: false,
      image: 'https://res.cloudinary.com/dsktnxayr/image/upload/v1771581088/nina_art_2_px4ajk.jpg'
    },
    { 
      id: 5, 
      title: 'Wild Gestures', 
      year: 2023, 
      price: '2,100 €', 
      sold: false
    },
    { 
      id: 6, 
      title: 'Silent Scream', 
      year: 2024, 
      price: '2,800 €', 
      sold: false
    },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      // Track active section based on scroll position
      const sections = ['home', 'work', 'events', 'about', 'shop', 'contact'];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user has already made a cookie decision
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      setShowCookieBanner(false);
    }
  }, []);

  useEffect(() => {
    // Set a random hero image when artworks are loaded
    if (artworks && artworks.length > 0) {
      const randomIndex = Math.floor(Math.random() * artworks.length);
      setRandomHeroImage(artworks[randomIndex].image);
    }
  }, [artworks]);

  const handleCookieConsent = (accepted) => {
    const consentValue = accepted ? 'accepted' : 'rejected';
    localStorage.setItem('cookieConsent', consentValue);
    setShowCookieBanner(false);
  };

  // Events data
  const events = [
    {
      id: 1,
      title: 'Solo Exhibition: Emotional Landscapes',
      type: 'Solo Show',
      location: 'Galerie Zimmermann, Vienna',
      address: 'Schleifmühlgasse 12, 1040 Wien',
      date: '2026-04-15',
      endDate: '2026-05-30',
      time: 'Opening: 18:00 - 22:00',
      description: 'A comprehensive showcase of new works exploring the intersection of urban life and emotional states through bold color and gestural abstraction.',
      upcoming: true
    },
    {
      id: 2,
      title: 'Art Vienna Contemporary',
      type: 'Art Fair',
      location: 'Marx Halle, Vienna',
      address: 'Karl-Farkas-Gasse 19, 1030 Wien',
      date: '2026-03-05',
      endDate: '2026-03-08',
      time: '11:00 - 19:00 daily',
      description: 'Presenting new works at Art Vienna with Galerie Zimmermann.',
      upcoming: true
    },
    {
      id: 3,
      title: 'Artist Talk: The Power of Color',
      type: 'Talk',
      location: 'Kunsthalle Wien',
      address: 'Museumsplatz 1, 1070 Wien',
      date: '2026-02-28',
      endDate: '2026-02-28',
      time: '19:00',
      description: 'An intimate conversation about color theory, emotional expression, and the evolution of contemporary painting.',
      upcoming: true
    },
    {
      id: 4,
      title: 'Group Show: New Voices',
      type: 'Group Show',
      location: 'Belvedere 21, Vienna',
      address: 'Arsenalstraße 1, 1030 Wien',
      date: '2025-11-10',
      endDate: '2026-01-15',
      time: 'Gallery hours',
      description: 'Featured alongside emerging Austrian contemporary artists.',
      upcoming: false
    }
  ];

  const upcomingEvents = events.filter(e => e.upcoming);
  const pastEvents = events.filter(e => !e.upcoming);

  const navigateLightbox = useCallback((direction) => {
    if (selectedWork === null) return;
    
    const currentIndex = artworks.findIndex(w => w.id === selectedWork.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === artworks.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedWork(artworks[newIndex]);
  }, [selectedWork, artworks]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedWork === null) return;
      
      if (e.key === 'Escape') {
        setSelectedWork(null);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWork, navigateLightbox]);

  return (
    <div className="bg-cream text-navy font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Archivo:wght@300;400;600;700&display=swap');
        
        :root {
          --navy: #1a1a3e;
          --magenta: #ff006e;
          --saffron: #ffbe0b;
          --cream: #faf9f6;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .bg-navy { background-color: var(--navy); }
        .bg-magenta { background-color: var(--magenta); }
        .bg-saffron { background-color: var(--saffron); }
        .bg-cream { background-color: var(--cream); }
        .text-navy { color: var(--navy); }
        .text-magenta { color: var(--magenta); }
        .text-saffron { color: var(--saffron); }
        .text-cream { color: var(--cream); }
        
        .font-display { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Archivo', sans-serif; }
        
        .grain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          z-index: 9999;
          mix-blend-mode: multiply;
        }
        
        .hero-title {
          font-size: clamp(3rem, 12vw, 10rem);
          line-height: 0.9;
          letter-spacing: -0.04em;
        }
        
        .slide-in {
          animation: slideIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .artwork-card {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .artwork-card:hover {
          transform: scale(1.02) translateY(-8px);
        }
        
        .artwork-img {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .artwork-card:hover .artwork-img {
          transform: scale(1.05);
        }
        
        .menu-overlay {
          transition: opacity 0.4s ease, visibility 0.4s ease;
        }
        
        .menu-item {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s;
        }
        
        .menu-item:hover {
          transform: translateX(20px);
          color: var(--magenta);
        }
        
        .parallax {
          transition: transform 0.1s ease-out;
        }
        
        .accent-block {
          position: absolute;
          z-index: -1;
          opacity: 0.85;
        }
        
        .hover-magenta:hover {
          color: var(--magenta);
          transition: color 0.3s ease;
        }
        
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26, 26, 62, 0.97);
          z-index: 9998;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 0, 110, 0.9);
          border: none;
          color: var(--cream);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }
        
        .lightbox-nav:hover {
          background: var(--magenta);
          transform: translateY(-50%) scale(1.1);
        }
        
        .lightbox-nav.prev {
          left: -80px;
        }
        
        .lightbox-nav.next {
          right: -80px;
        }
        
        .lightbox-close {
          position: absolute;
          top: -60px;
          right: 0;
          background: transparent;
          border: none;
          color: var(--cream);
          cursor: pointer;
          transition: color 0.3s ease;
        }
        
        .lightbox-close:hover {
          color: var(--magenta);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @media (max-width: 768px) {
          .lightbox-nav.prev {
            left: 10px;
          }
          .lightbox-nav.next {
            right: 10px;
          }
          .lightbox-nav {
            width: 50px;
            height: 50px;
          }
        }
        
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--navy);
          color: var(--cream);
          padding: 1.5rem;
          z-index: 10000;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s ease;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .legal-page-overlay {
          position: fixed;
          inset: 0;
          background: var(--cream);
          z-index: 9999;
          overflow-y: auto;
          animation: fadeIn 0.3s ease;
        }
        
        .legal-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .legal-content h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        
        .legal-content h2 {
          font-size: 1.8rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .legal-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        
        .legal-content ul {
          margin-left: 2rem;
          margin-bottom: 1rem;
        }
        
        .legal-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>

      {/* Grain Texture */}
      <div className="grain" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center bg-cream border-b border-navy border-opacity-10">
        <div className="font-display text-2xl md:text-3xl font-bold text-navy tracking-tight">
          Nina Bussjäger
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['Work', 'Events', 'About', 'Shop', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveSection(item.toLowerCase());
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`font-sans font-semibold transition-all duration-300 relative pb-2 ${
                activeSection === item.toLowerCase()
                  ? 'text-magenta'
                  : 'text-navy hover:text-magenta'
              }`}
            >
              {item}
              {activeSection === item.toLowerCase() && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-magenta" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-navy hover:text-magenta transition-colors duration-300"
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`menu-overlay fixed inset-0 bg-navy z-40 flex items-center justify-center md:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="space-y-8 text-center">
          {['Work', 'Events', 'About', 'Shop', 'Contact'].map((item, i) => (
            <div
              key={item}
              className="menu-item font-display text-5xl md:text-7xl font-bold text-cream cursor-pointer hover:text-magenta transition-colors"
              onClick={() => {
                setMenuOpen(false);
                setActiveSection(item.toLowerCase());
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: randomHeroImage ? `url(${randomHeroImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* White Overlay - 70% opacity */}
        <div className="absolute inset-0 bg-white opacity-30 z-0" />
        
        <div className="relative z-10 text-center max-w-6xl">
          <h1 className="hero-title font-display font-black text-navy slide-in mb-8" style={{ transform: 'translateY(60px)' }}>
            Bold.<br/>Expressive.<br/>Unapologetic.
          </h1>
          <p className="text-xl md:text-2xl font-sans font-light text-navy max-w-2xl mx-auto slide-in" 
             style={{ transform: 'translateY(60px)', animationDelay: '0.2s' }}>
            Contemporary paintings that challenge perception and celebrate raw emotion
          </p>
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-12 px-8 py-4 bg-navy text-cream font-sans font-semibold text-lg hover:bg-magenta transition-all duration-300 flex items-center gap-3 mx-auto slide-in"
            style={{ transform: 'translateY(60px)', animationDelay: '0.4s' }}
          >
            Explore Work
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6 md:px-12 bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-navy mb-4">Selected Work</h2>
          <div className="h-2 w-32 bg-magenta mb-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {artworks.map((work, index) => (
              <div
                key={work.id}
                className="artwork-card cursor-pointer"
                onClick={() => setSelectedWork(work)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden bg-navy aspect-[3/4] mb-4">
                  {work.image ? (
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="artwork-img w-full h-full object-cover"
                    />
                  ) : (
                    /* Placeholder gradient */
                    <div
                      className="artwork-img w-full h-full"
                      style={{
                        background: `linear-gradient(${135 + index * 30}deg, 
                          ${['#ff006e', '#ffbe0b', '#1a1a3e', '#ff006e88'][index % 4]}, 
                          ${['#ffbe0b', '#1a1a3e', '#ff006e', '#ffbe0b88'][index % 4]})`,
                      }}
                    />
                  )}
                  {work.sold && (
                    <div className="absolute top-4 right-4 bg-magenta text-cream px-4 py-2 font-sans font-semibold text-sm">
                      SOLD
                    </div>
                  )}
                </div>
                <h3 className="font-display text-2xl font-bold text-navy mb-1 hover-magenta">
                  {work.title}
                </h3>
                <p className="font-sans text-navy opacity-70">{work.year}</p>
                <p className="font-sans text-lg font-semibold text-navy mt-2">{work.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-6 md:px-12 bg-navy text-cream relative overflow-hidden">
        <div className="accent-block bg-magenta w-[600px] h-[600px] rounded-full blur-3xl -bottom-40 -right-60" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-5xl md:text-7xl font-bold">Exhibitions & Events</h2>
            <Calendar className="text-saffron" size={56} />
          </div>
          <div className="h-2 w-32 bg-saffron mb-16" />
          
          {/* Upcoming Events */}
          <div className="mb-20">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-8 text-saffron">Upcoming</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className="bg-navy bg-opacity-40 backdrop-blur-sm border-2 border-cream border-opacity-30 p-6 hover:border-magenta hover:border-opacity-70 transition-all duration-500 flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <div className="inline-block bg-magenta text-cream px-3 py-1 font-sans text-xs font-semibold mb-3 uppercase tracking-wider">
                      {event.type}
                    </div>
                    <h4 className="font-display text-xl md:text-2xl font-bold mb-3 text-cream">{event.title}</h4>
                    <div className="space-y-2 font-sans text-cream text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-saffron flex-shrink-0 mt-1" />
                        <div className="text-cream">
                          <div className="font-semibold">{event.location}</div>
                          <div className="text-xs opacity-70">{event.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-saffron flex-shrink-0" />
                        <div className="text-cream text-xs">
                          {new Date(event.date).toLocaleDateString('de-DE', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                          {event.endDate !== event.date && (
                            <> — {new Date(event.endDate).toLocaleDateString('de-DE', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}</>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="text-saffron flex-shrink-0" />
                        <div className="text-cream text-xs">{event.time}</div>
                      </div>
                    </div>
                    <p className="font-sans text-cream text-sm leading-relaxed mt-4 mb-4">
                      {event.description}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-saffron text-navy font-sans font-semibold hover:bg-magenta hover:text-cream transition-colors duration-300 text-sm w-full">
                    Add to Calendar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Past Events Toggle */}
          {pastEvents.length > 0 && (
            <div>
              <button
                onClick={() => setShowPastEvents(!showPastEvents)}
                className="font-display text-2xl md:text-3xl font-bold mb-8 text-cream hover:text-magenta transition-colors duration-300 flex items-center gap-3"
              >
                Past Events & Exhibitions
                <ArrowRight 
                  size={28} 
                  className={`transform transition-transform duration-300 ${showPastEvents ? 'rotate-90' : ''}`}
                />
              </button>
              
              {showPastEvents && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {pastEvents.map((event, index) => (
                    <div 
                      key={event.id} 
                      className="bg-navy bg-opacity-30 backdrop-blur-sm border border-cream border-opacity-20 p-6 hover:border-opacity-40 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="inline-block bg-cream bg-opacity-20 text-cream px-3 py-1 font-sans text-xs font-semibold mb-3 uppercase tracking-wider">
                        {event.type}
                      </div>
                      <h4 className="font-display text-lg md:text-xl font-bold mb-2 text-cream">{event.title}</h4>
                      <div className="font-sans text-cream text-sm mb-3">
                        {event.location} • {new Date(event.date).toLocaleDateString('de-DE', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                      <p className="font-sans text-cream text-xs leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-12 bg-navy text-cream relative overflow-hidden">
        <div className="accent-block bg-saffron w-96 h-96 rounded-full blur-3xl -top-20 -right-40" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-16">About Nina</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src="https://res.cloudinary.com/dsktnxayr/image/upload/v1771445769/nina_4_5_90_avkuzm.jpg"
                alt="Nina Bussjäger Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <p className="font-sans text-lg md:text-xl leading-relaxed">
                Nina Bussjäger ist eine zeitgenössische Künstlerin aus Speyer, deren Werk die Spannung zwischen klassischer Maltechnik und modernem konzeptionellem Denken auslotet. Ihre Gemälde sind intensive Untersuchungen von Gesellschaft, sozialen Strukturen und den vielfältigen Identitäten, die wir bewohnen—ein visuelles Hinterfragen der Rollen, die uns prägen und begrenzen.
              </p>
              <p className="font-sans text-lg md:text-xl leading-relaxed">
                Mit gestischer Kraft und psychologischer Tiefe schafft Bussjäger Arbeiten, die nicht nur sehen, sondern fühlen lassen. Sie malt nicht, um zu dekorieren, sondern um zu durchdringen: gesellschaftliche Normen zu hinterfragen, verborgene Wahrheiten sichtbar zu machen und dem Betrachter einen Spiegel vorzuhalten. Ihre Farben sind nicht harmonisch—sie sind ehrlich, manchmal schmerzhaft, immer authentisch.
              </p>
              <p className="font-sans text-lg md:text-xl leading-relaxed">
                Die Werke von Nina Bussjäger wurden vielfach national und international ausgestellt. Es ist Kunst, die unbequem sein darf, die bleiben soll.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 px-6 md:px-12 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-bold text-navy mb-4">Shop</h2>
              <div className="h-2 w-32 bg-saffron" />
            </div>
            <ShoppingBag className="text-navy" size={48} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-navy text-cream p-8 md:p-12">
              <h3 className="font-display text-3xl font-bold mb-4">Original Works</h3>
              <p className="font-sans text-lg mb-6 opacity-90">
                All pieces are original acrylic and mixed media on canvas. Each work is signed and comes with a certificate of authenticity.
              </p>
              <p className="font-sans text-lg mb-6 opacity-90">
                Prices range from €1,800 to €5,500 depending on size and complexity.
              </p>
              <button className="px-6 py-3 bg-magenta text-cream font-sans font-semibold hover:bg-saffron hover:text-navy transition-colors duration-300">
                View Available Works
              </button>
            </div>
            
            <div className="bg-saffron text-navy p-8 md:p-12">
              <h3 className="font-display text-3xl font-bold mb-4">Prints & Commissions</h3>
              <p className="font-sans text-lg mb-6">
                Limited edition prints are available for select works. Commission requests are welcome for custom pieces.
              </p>
              <p className="font-sans text-lg mb-6">
                Prints start at €150. Commission pricing varies based on size and scope.
              </p>
              <button className="px-6 py-3 bg-navy text-cream font-sans font-semibold hover:bg-magenta transition-colors duration-300">
                Inquire About Commissions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-12 bg-navy text-cream relative overflow-hidden">
        <div className="accent-block bg-magenta w-[500px] h-[500px] rounded-full blur-3xl -bottom-40 -left-40" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-16">Get in Touch</h2>
          
          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-transparent border-b-2 border-cream py-4 px-0 font-sans text-lg text-cream placeholder-cream placeholder-opacity-50 focus:outline-none focus:border-magenta transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent border-b-2 border-cream py-4 px-0 font-sans text-lg text-cream placeholder-cream placeholder-opacity-50 focus:outline-none focus:border-magenta transition-colors"
              />
            </div>
            
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full bg-transparent border-2 border-cream p-6 font-sans text-lg text-cream placeholder-cream placeholder-opacity-50 focus:outline-none focus:border-magenta transition-colors resize-none"
            />
            
            <button
              type="submit"
              className="px-8 py-4 bg-magenta text-cream font-sans font-semibold text-lg hover:bg-saffron hover:text-navy transition-all duration-300 flex items-center gap-3"
            >
              Send Message
              <Mail size={20} />
            </button>
          </form>
          
          <div className="mt-16 flex gap-8">
            <a href="https://instagram.com/ninabussjaeger" target="_blank" rel="noopener noreferrer" className="text-cream hover:text-magenta transition-colors duration-300 flex items-center gap-3 font-sans text-lg">
              <Instagram size={24} />
              @ninabussjaeger
            </a>
            <a href="mailto:hello@ninabussjaeger.com" className="text-cream hover:text-magenta transition-colors duration-300 flex items-center gap-3 font-sans text-lg">
              <Mail size={24} />
              hello@ninabussjaeger.com
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedWork && (
        <div 
          className="lightbox-overlay" 
          onClick={() => setSelectedWork(null)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="lightbox-close"
              onClick={() => setSelectedWork(null)}
              aria-label="Close"
            >
              <X size={40} />
            </button>

            {/* Previous Button */}
            <button 
              className="lightbox-nav prev"
              onClick={() => navigateLightbox('prev')}
              aria-label="Previous artwork"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button 
              className="lightbox-nav next"
              onClick={() => navigateLightbox('next')}
              aria-label="Next artwork"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image */}
            <div className="relative">
              {selectedWork.image ? (
                <img 
                  src={selectedWork.image} 
                  alt={selectedWork.title}
                  className="max-w-full max-h-[80vh] object-contain mx-auto"
                />
              ) : (
                <div 
                  className="w-[70vw] h-[70vh] mx-auto"
                  style={{
                    background: `linear-gradient(${135 + selectedWork.id * 30}deg, 
                      ${['#ff006e', '#ffbe0b', '#1a1a3e', '#ff006e88'][selectedWork.id % 4]}, 
                      ${['#ffbe0b', '#1a1a3e', '#ff006e', '#ffbe0b88'][selectedWork.id % 4]})`,
                  }}
                />
              )}
            </div>

            {/* Artwork Details */}
            <div className="absolute bottom-0 left-0 right-0 bg-navy bg-opacity-95 p-6 md:p-8 text-cream">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold mb-2">
                      {selectedWork.title}
                    </h3>
                    <p className="font-sans text-lg text-cream opacity-80">
                      {selectedWork.year}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-2xl md:text-3xl font-bold text-saffron">
                      {selectedWork.price}
                    </p>
                    {selectedWork.sold && (
                      <div className="inline-block bg-magenta text-cream px-4 py-2 font-sans font-semibold text-sm mt-2">
                        SOLD
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-cream border-opacity-20">
                  <p className="font-sans text-sm text-cream opacity-60">
                    Acrylic and mixed media on canvas • Click arrows or use keyboard to navigate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 bg-cream text-navy">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="font-display text-2xl font-bold mb-2">Nina Bussjäger</div>
              <p className="font-sans text-sm opacity-70">Contemporary Artist</p>
            </div>
            
            <div className="flex gap-6">
              <a href="https://instagram.com/ninabussjaeger" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-magenta transition-colors duration-300 flex items-center gap-2 font-sans text-sm">
                <Instagram size={20} />
                Instagram
              </a>
              <a href="mailto:hello@ninabussjaeger.com" className="text-navy hover:text-magenta transition-colors duration-300 flex items-center gap-2 font-sans text-sm">
                <Mail size={20} />
                Email
              </a>
            </div>
          </div>
          
          <div className="border-t border-navy border-opacity-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-sm opacity-70 text-center md:text-left">
              © 2026 Nina Bussjäger. Alle Rechte vorbehalten.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 font-sans text-sm">
              <button 
                onClick={() => setActiveLegalPage('impressum')}
                className="hover:text-magenta transition-colors duration-300"
              >
                Impressum
              </button>
              <span className="opacity-30">|</span>
              <button 
                onClick={() => setActiveLegalPage('datenschutz')}
                className="hover:text-magenta transition-colors duration-300"
              >
                Datenschutz
              </button>
              <span className="opacity-30">|</span>
              <button 
                onClick={() => setActiveLegalPage('agb')}
                className="hover:text-magenta transition-colors duration-300"
              >
                AGB
              </button>
              <span className="opacity-30">|</span>
              <button 
                onClick={() => setShowCookieBanner(true)}
                className="hover:text-magenta transition-colors duration-300"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="cookie-banner">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold mb-2">Cookie-Hinweis</h3>
                <p className="font-sans text-sm text-cream opacity-90 leading-relaxed">
                  Diese Website verwendet nur technisch notwendige Cookies für die Grundfunktionalität. 
                  Wir setzen keine Tracking- oder Marketing-Cookies ein. Ihre Daten werden nicht an Dritte weitergegeben. 
                  Mehr Informationen finden Sie in unserer{' '}
                  <button 
                    onClick={() => {
                      setActiveLegalPage('datenschutz');
                      setShowCookieBanner(false);
                    }}
                    className="underline hover:text-magenta transition-colors"
                  >
                    Datenschutzerklärung
                  </button>.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleCookieConsent(false)}
                  className="px-6 py-3 bg-transparent border-2 border-cream text-cream font-sans font-semibold hover:bg-cream hover:text-navy transition-all duration-300"
                >
                  Ablehnen
                </button>
                <button
                  onClick={() => handleCookieConsent(true)}
                  className="px-6 py-3 bg-magenta text-cream font-sans font-semibold hover:bg-saffron hover:text-navy transition-all duration-300"
                >
                  Akzeptieren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Pages Overlay */}
      {activeLegalPage && (
        <div className="legal-page-overlay">
          <div className="sticky top-0 bg-cream border-b-2 border-navy border-opacity-10 px-6 py-4 flex justify-between items-center z-10">
            <div className="font-display text-2xl font-bold text-navy">
              {activeLegalPage === 'impressum' && 'Impressum'}
              {activeLegalPage === 'datenschutz' && 'Datenschutzerklärung'}
              {activeLegalPage === 'agb' && 'Allgemeine Geschäftsbedingungen'}
            </div>
            <button
              onClick={() => setActiveLegalPage(null)}
              className="text-navy hover:text-magenta transition-colors"
            >
              <X size={32} />
            </button>
          </div>

          <div className="legal-content font-sans text-navy py-8">
            {activeLegalPage === 'impressum' && (
              <div>
                <h1 className="font-display font-bold">Impressum</h1>
                
                <h2 className="font-display font-bold">Angaben gemäß § 5 TMG</h2>
                <p>
                  Nina Bussjäger<br />
                  [Straße und Hausnummer]<br />
                  [PLZ] [Ort]<br />
                  Österreich
                </p>

                <h2 className="font-display font-bold">Kontakt</h2>
                <p>
                  E-Mail: hello@ninabussjaeger.com<br />
                  Telefon: [Telefonnummer]
                </p>

                <h2 className="font-display font-bold">Umsatzsteuer-ID</h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  [USt-IdNr. eintragen, falls vorhanden]
                </p>

                <h2 className="font-display font-bold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <p>
                  Nina Bussjäger<br />
                  [Adresse]
                </p>

                <h2 className="font-display font-bold">Streitschlichtung</h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  https://ec.europa.eu/consumers/odr/<br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            )}

            {activeLegalPage === 'datenschutz' && (
              <div>
                <h1 className="font-display font-bold">Datenschutzerklärung</h1>

                <h2 className="font-display font-bold">1. Datenschutz auf einen Blick</h2>
                
                <h3 className="font-sans font-semibold text-lg mt-4 mb-2">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                  Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit 
                  denen Sie persönlich identifiziert werden können.
                </p>

                <h3 className="font-sans font-semibold text-lg mt-4 mb-2">Datenerfassung auf dieser Website</h3>
                <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                  können Sie dem Impressum dieser Website entnehmen.
                </p>

                <p><strong>Wie erfassen wir Ihre Daten?</strong></p>
                <p>
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
                  z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p>
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                  IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem 
                  oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese 
                  Website betreten.
                </p>

                <h2 className="font-display font-bold">2. Hosting</h2>
                <p>
                  Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                </p>
                <p>
                  [Hosting-Provider Name und Adresse eintragen]<br />
                  Die Verwendung des Hosting-Providers erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                </p>

                <h2 className="font-display font-bold">3. Allgemeine Hinweise und Pflichtinformationen</h2>
                
                <h3 className="font-sans font-semibold text-lg mt-4 mb-2">Datenschutz</h3>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln 
                  Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften 
                  sowie dieser Datenschutzerklärung.
                </p>

                <h3 className="font-sans font-semibold text-lg mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
                <p>
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p>
                  Nina Bussjäger<br />
                  [Adresse]<br />
                  E-Mail: hello@ninabussjaeger.com
                </p>

                <h2 className="font-display font-bold">4. Datenerfassung auf dieser Website</h2>
                
                <h3 className="font-sans font-semibold text-lg mt-4 mb-2">Cookies</h3>
                <p>
                  Diese Website verwendet nur technisch notwendige Cookies. Diese sind erforderlich, um die 
                  Funktionalität der Website zu gewährleisten (z.B. Speicherung Ihrer Cookie-Einstellungen). 
                  Diese Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert.
                </p>

                <h3 className="font-sans font-semibold text-lg mt-4 mb-2">Kontaktformular</h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                  Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der 
                  Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>

                <h2 className="font-display font-bold">5. Ihre Rechte</h2>
                <p>Sie haben folgende Rechte:</p>
                <ul>
                  <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
                  <li>Recht auf Berichtigung unrichtiger Daten</li>
                  <li>Recht auf Löschung Ihrer Daten</li>
                  <li>Recht auf Einschränkung der Datenverarbeitung</li>
                  <li>Recht auf Datenübertragbarkeit</li>
                  <li>Widerspruchsrecht gegen die Datenverarbeitung</li>
                  <li>Beschwerderecht bei einer Aufsichtsbehörde</li>
                </ul>

                <p className="mt-4">
                  <strong>Stand:</strong> Februar 2024
                </p>
              </div>
            )}

            {activeLegalPage === 'agb' && (
              <div>
                <h1 className="font-display font-bold">Allgemeine Geschäftsbedingungen</h1>

                <h2 className="font-display font-bold">1. Geltungsbereich</h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über den Verkauf von 
                  Kunstwerken zwischen Nina Bussjäger (im Folgenden "Verkäufer") und Käufern.
                </p>

                <h2 className="font-display font-bold">2. Vertragsschluss</h2>
                <p>
                  Die Präsentation der Kunstwerke auf dieser Website stellt kein bindendes Angebot dar. 
                  Der Vertrag kommt erst durch die Annahme der Bestellung durch den Verkäufer zustande.
                </p>

                <h2 className="font-display font-bold">3. Preise und Zahlung</h2>
                <p>
                  Alle Preise sind in Euro angegeben und verstehen sich inklusive der gesetzlichen Mehrwertsteuer, 
                  sofern anwendbar. Versandkosten werden gesondert berechnet und dem Käufer vor Vertragsschluss 
                  mitgeteilt.
                </p>
                <p>
                  Zahlungsmöglichkeiten: Banküberweisung, nach individueller Vereinbarung
                </p>

                <h2 className="font-display font-bold">4. Lieferung</h2>
                <p>
                  Die Lieferzeit beträgt in der Regel 2-4 Wochen nach Zahlungseingang. Große Formate können 
                  längere Lieferzeiten erfordern. Der Versand erfolgt versichert.
                </p>

                <h2 className="font-display font-bold">5. Widerrufsrecht</h2>
                <p>
                  Verbraucher haben ein 14-tägiges Widerrufsrecht. Die Widerrufsfrist beträgt vierzehn Tage ab 
                  dem Tag, an dem der Käufer oder ein von ihm benannter Dritter das Kunstwerk in Besitz genommen hat.
                </p>
                <p>
                  Um das Widerrufsrecht auszuüben, muss der Verkäufer mittels einer eindeutigen Erklärung (z. B. 
                  per E-Mail) über den Entschluss zum Widerruf informiert werden.
                </p>

                <h2 className="font-display font-bold">6. Eigentumsvorbehalt</h2>
                <p>
                  Die Kunstwerke bleiben bis zur vollständigen Bezahlung Eigentum des Verkäufers.
                </p>

                <h2 className="font-display font-bold">7. Urheberrecht</h2>
                <p>
                  Mit dem Verkauf eines Kunstwerks erwirbt der Käufer das Eigentumsrecht am physischen Objekt. 
                  Die Urheberrechte verbleiben beim Künstler. Eine Vervielfältigung, Veröffentlichung oder 
                  kommerzielle Nutzung bedarf der ausdrücklichen Zustimmung des Künstlers.
                </p>

                <h2 className="font-display font-bold">8. Gewährleistung</h2>
                <p>
                  Es gelten die gesetzlichen Gewährleistungsrechte. Bei berechtigten Mängeln kann der Käufer 
                  nach seiner Wahl Nacherfüllung in Form von Nachbesserung oder Ersatzlieferung verlangen.
                </p>

                <h2 className="font-display font-bold">9. Schlussbestimmungen</h2>
                <p>
                  Es gilt das Recht der Republik Österreich unter Ausschluss des UN-Kaufrechts. Bei Verträgen 
                  mit Verbrauchern gilt diese Rechtswahl nur, soweit hierdurch der durch zwingende Bestimmungen 
                  des Rechts des Staates des gewöhnlichen Aufenthaltes des Verbrauchers gewährte Schutz nicht 
                  entzogen wird.
                </p>

                <p className="mt-4">
                  <strong>Stand:</strong> Februar 2024
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
