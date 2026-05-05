import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Map, Globe, PhoneCall, ShieldCheck } from 'lucide-react';

const trustPoints = [
  {
    title: 'Personalized Itineraries',
    description: 'Every journey is uniquely yours',
    icon: <Map className="trust-card-icon" />,
  },
  {
    title: 'Luxury Partnerships',
    description: 'Access to world-class brands',
    icon: <Globe className="trust-card-icon" />,
  },
  {
    title: '24/7 Concierge',
    description: 'Support wherever you go',
    icon: <PhoneCall className="trust-card-icon" />,
  },
  {
    title: 'Seamless Planning',
    description: 'Stress-free from start to finish',
    icon: <ShieldCheck className="trust-card-icon" />,
  },
];

const TrustSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="trust-section">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '20px' }} className="lux-text-gradient">
          Crafted for the Discerning Traveler
        </h2>
      </div>

      <div className="trust-grid">
        {trustPoints.map((point, i) => (
          <div
            key={point.title}
            ref={(el) => (cardsRef.current[i] = el!)}
            className="trust-card lux-glass"
            style={{ opacity: 0, transform: 'translateY(40px)', filter: 'blur(20px)' }}
          >
            <div style={{ marginBottom: '10px' }}>{point.icon}</div>
            <h3>{point.title}</h3>
            <p>{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
