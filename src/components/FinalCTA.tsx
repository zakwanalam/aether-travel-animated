import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Floating particles
      particlesRef.current.forEach((el) => {
        gsap.to(el, {
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          duration: 3 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="cta-section">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el!)}
          className="floating-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5,
          }}
        />
      ))}

      <div style={{ zIndex: 10 }}>
        <h2 style={{ fontSize: '4rem', fontWeight: 200, marginBottom: '20px' }} className="lux-text-gradient">
          Your Next Journey Begins Here
        </h2>
        <p style={{ color: 'var(--color-text-dim)', fontSize: '1.2rem', letterSpacing: '2px', maxWidth: '600px', margin: '0 auto' }}>
          Let us craft an experience tailored just for you.
        </p>
        <button className="cta-button">
          Plan My Trip
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
