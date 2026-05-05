import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Julian Montgomery',
    role: 'CEO, Global Fintech',
    text: '"The level of detail in our Maldives arrival was beyond expectations. A truly seamless transition into paradise."',
  },
  {
    name: 'Elena Rossi',
    role: 'Fashion Designer',
    text: '"Every villa and every meal felt hand-picked for my aesthetic. This is how travel should always feel."',
  },
  {
    name: 'Aiden Chen',
    role: 'Venture Capitalist',
    text: '"Privacy is my greatest luxury. Aether provided it in abundance without sacrificing world-class service."',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Philanthropist',
    text: '"From the private jet to the overwater villa, every moment was choreographed to perfection."',
  },
  {
    name: 'Marcus Thorne',
    role: 'Tech Founder',
    text: '"I wanted adventure with zero friction. They delivered a Swiss Alps experience that was both rugged and refined."',
  },
  {
    name: 'Isabella Vane',
    role: 'Luxury Consultant',
    text: '"As someone who critiques travel, I am silenced. Aether is the new gold standard for bespoke journeys."',
  },
];

const Testimonials: React.FC = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const row1Items = testimonials.slice(0, 3);
  const row2Items = testimonials.slice(3);

  useLayoutEffect(() => {
    const setupMarquee = (row: HTMLElement | null, reversed: boolean) => {
      if (!row) return;
      const content = row.firstElementChild as HTMLElement;
      const clone = content.cloneNode(true) as HTMLElement;
      row.appendChild(clone);

      const speed = 40;
      const totalWidth = content.offsetWidth;
      const duration = totalWidth / speed;

      gsap.to([content, clone], {
        x: reversed ? `+=${totalWidth}` : `-=${totalWidth}`,
        ease: 'none',
        duration: duration,
        repeat: -1,
        // Start reversed row at the appropriate offset
        modifiers: reversed ? {
          x: (x) => `${parseFloat(x) % totalWidth - totalWidth}px`
        } : undefined
      });
    };

    setupMarquee(row1Ref.current, false);
    setupMarquee(row2Ref.current, true);
  }, []);

  return (
    <section className="testimonial-section">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 200 }} className="lux-text-gradient">
          Voices of the Discerning
        </h2>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />
        
        {/* Row 1 */}
        <div ref={row1Ref} className="marquee-container">
          <div className="marquee-content">
            {row1Items.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div ref={row2Ref} className="marquee-container">
          <div className="marquee-content" style={{ transform: 'translateX(-100%)' }}>
            {row2Items.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ t }: { t: any }) => (
  <div className="testimonial-card lux-glass">
    <Quote className="testimonial-card-quote" />
    <p style={{ fontStyle: 'italic', color: 'var(--color-text)', fontSize: '1.2rem', lineHeight: '1.6', fontWeight: 300 }}>
      {t.text}
    </p>
    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ color: 'var(--color-accent)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
        {t.name}
      </div>
      <div style={{ color: 'var(--color-text-dim)', fontSize: '0.7rem', letterSpacing: '1px' }}>
        {t.role}
      </div>
    </div>
  </div>
);

export default Testimonials;
