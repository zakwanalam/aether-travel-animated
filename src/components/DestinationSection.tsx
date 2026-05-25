import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    title: 'Maldives',
    description: 'Overwater serenity',
    image: '/destinations/maldives.png',
  },
  {
    title: 'Switzerland',
    description: 'Alpine elegance',
    image: '/destinations/switzerland.png',
  },
  {
    title: 'Dubai',
    description: 'Modern luxury',
    image: '/destinations/dubai.png',
  },
  {
    title: 'Bali',
    description: 'Cultural escape',
    image: '/destinations/bali.png',
  },
];

const DestinationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useLayoutEffect(() => {
    if (!wheelRef.current || !sectionRef.current) return;

    // Register inside to be safe with HMR
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(wheelRef.current,
        { rotation: 25 },
        {
          rotation: -25,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.trajectory-container',
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="destination-section">
      <div className="trajectory-container">
        <div className="trajectory-header">
          <h2 style={{ fontSize: '3rem', marginBottom: '32px' }} className="lux-text-gradient">
            Destinations Worth the Journey
          </h2>
          <p style={{ color: 'var(--color-text-dim)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '12px' }}>
            Handpicked locations designed for unforgettable experiences.
          </p>
        </div>

        <div ref={wheelRef} className="trajectory-wheel">
          {destinations.map((dest, i) => {
            // Distribute cards along the wheel - wider angle on mobile to avoid congestion
            const angleStep = isMobile ? 32 : 12;
            const angle = (i - (destinations.length - 1) / 2) * angleStep;
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
      </div>
    </section>
  );
};

export default DestinationSection;
