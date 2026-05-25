import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    title: 'Maldives',
    description: 'Overwater serenity',
    image: '/destinations/maldives.webp',
  },
  {
    title: 'Switzerland',
    description: 'Alpine elegance',
    image: '/destinations/switzerland.webp',
  },
  {
    title: 'Dubai',
    description: 'Modern luxury',
    image: '/destinations/dubai.webp',
  },
  {
    title: 'Bali',
    description: 'Cultural escape',
    image: '/destinations/bali.webp',
  },
];

const DestinationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Register inside to be safe with HMR
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Desktop Wheel Animation (Pinning only on Desktop)
      if (!isMobile) {
        if (!wheelRef.current) return;
        gsap.fromTo(wheelRef.current,
          { rotation: 25 },
          {
            rotation: -25,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              pin: containerRef.current,
              pinSpacing: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          }
        );
      }
      // Mobile uses standard CSS scroll snapping (no GSAP needed for movement)
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const track = mobileTrackRef.current;
    if (!track) return;
    
    const cards = Array.from(track.querySelectorAll('.mobile-destination-card')) as HTMLElement[];
    if (cards.length === 0) return;

    // Center of the track's scroll viewport
    const trackScrollCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    // Find which card is currently closest to the center
    cards.forEach((card, index) => {
      // Card's center relative to the track's scrollable content
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - trackScrollCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    // Determine target index
    let targetIndex = direction === 'left' ? closestIndex - 1 : closestIndex + 1;
    targetIndex = Math.max(0, Math.min(targetIndex, cards.length - 1));

    // Get the target card and calculate precise scrollLeft to center it
    const targetCard = cards[targetIndex];
    const targetScroll = targetCard.offsetLeft - (track.clientWidth - targetCard.clientWidth) / 2;

    track.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={sectionRef} className="destination-section">
      <div ref={containerRef} className="trajectory-container">
        <div className="trajectory-header">
          <h2 style={{ fontSize: '3rem', marginBottom: '32px' }} className="lux-text-gradient">
            Destinations Worth the Journey
          </h2>
          <p style={{ color: 'var(--color-text-dim)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '12px' }}>
            Handpicked locations designed for unforgettable experiences.
          </p>
        </div>

        {/* Desktop View: Interactive GSAP Wheel */}
        {!isMobile && (
          <div ref={wheelRef} className="trajectory-wheel">
            {destinations.map((dest, i) => {
              const angle = (i - (destinations.length - 1) / 2) * 12;
              return (
                <div
                  key={dest.title}
                  className="trajectory-card"
                  style={{
                    transform: `translateX(-50%) rotate(${angle}deg)`
                  }}
                >
                  <img src={dest.image} alt={dest.title} className="trajectory-card-img" />
                  <div className="trajectory-card-overlay">
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '8px', letterSpacing: '4px' }} className="lux-text-shadow">
                      {dest.title}
                    </h3>
                    <p style={{ color: 'var(--color-accent)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px' }}>
                      {dest.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile View: Standard Horizontal Carousel */}
        {isMobile && (
          <>
            <div ref={mobileTrackRef} className="mobile-horizontal-track">
              {destinations.map((dest) => (
                <div key={dest.title} className="mobile-destination-card">
                  <div className="mobile-card-inner lux-glass">
                    <img src={dest.image} alt={dest.title} className="mobile-card-img" />
                    <div className="mobile-card-content">
                      <h3 className="lux-text-gradient">{dest.title}</h3>
                      <p>{dest.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mobile-carousel-controls">
              <button 
                className="mobile-arrow-btn lux-glass" 
                onClick={() => scrollCarousel('left')}
                aria-label="Previous destination"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button 
                className="mobile-arrow-btn lux-glass" 
                onClick={() => scrollCarousel('right')}
                aria-label="Next destination"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DestinationSection;
