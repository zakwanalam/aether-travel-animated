import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Blur Reveal Animation
      gsap.to(imageRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });

      // Image Parallax
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Text Stagger Reveal
      const items = itemsRef.current;
      gsap.to([titleRef.current, ...items], {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="experience-section">
      <div className="experience-grid">
        <div className="experience-content">
          <h2 ref={titleRef} className="experience-title lux-text-gradient" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            Travel, Redefined
          </h2>
          
          <div ref={(el) => (itemsRef.current[0] = el!)} className="experience-item">
            <h3>Private Escapes</h3>
            <p>Exclusive resorts and villas tailored to your privacy.</p>
          </div>

          <div ref={(el) => (itemsRef.current[1] = el!)} className="experience-item">
            <h3>Seamless Journeys</h3>
            <p>From takeoff to touchdown, every detail handled.</p>
          </div>

          <div ref={(el) => (itemsRef.current[2] = el!)} className="experience-item">
            <h3>Curated Experiences</h3>
            <p>Adventure, culture, and relaxation—perfectly balanced.</p>
          </div>
        </div>

        <div className="experience-image-container">
          <img 
            ref={imageRef}
            src="/destinations/experience.png" 
            alt="Luxury Experience" 
            className="experience-image"
            style={{ opacity: 0, filter: 'blur(20px)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
