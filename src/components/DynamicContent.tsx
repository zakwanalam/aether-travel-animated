import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DynamicContent: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Define opacity and y-offset animations for different scroll points
  const section1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const section1Y = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, -50]);

  const section2Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.5], [0, 1, 0]);
  const section2Y = useTransform(scrollYProgress, [0.25, 0.4, 0.5], [50, 0, -50]);

  const section3Opacity = useTransform(scrollYProgress, [0.7, 0.85, 0.95], [0, 1, 1]);
  const section3Y = useTransform(scrollYProgress, [0.7, 0.85, 0.95], [50, 0, 0]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {/* Section 1 - Intro */}
      <motion.div 
        style={{ 
          opacity: section1Opacity, 
          y: section1Y,
          position: 'absolute',
          top: '30%',
          left: '10%',
          maxWidth: '600px'
        }}
      >
        <h1 className="lux-text-gradient lux-text-shadow" style={{ fontSize: '5rem', lineHeight: 1, fontWeight: 300 }}>Aether<br/>Residency</h1>
        <p className="lux-text-shadow" style={{ marginTop: '20px', color: 'var(--color-text)', letterSpacing: '4px', fontSize: '14px', textTransform: 'uppercase' }}>
          Descending into paradise
        </p>
      </motion.div>

      {/* Section 2 - Transition */}
      <motion.div 
        style={{ 
          opacity: section2Opacity, 
          y: section2Y,
          position: 'absolute',
          top: '50%',
          right: '10%',
          textAlign: 'right',
          maxWidth: '500px'
        }}
      >
        <h2 className="lux-text-shadow" style={{ fontSize: '3.5rem', fontWeight: 400 }}>Horizon Unbound</h2>
        <p className="lux-text-shadow" style={{ marginTop: '20px', color: 'var(--color-text-dim)', letterSpacing: '2px', fontSize: '14px' }}>
          Your journey begins where the ocean meets the infinite sky.
        </p>
      </motion.div>

      {/* Section 3 - The Arrival */}
      <motion.div 
        style={{ 
          opacity: section3Opacity, 
          y: section3Y,
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '800px'
        }}
      >
        <h2 className="lux-text-shadow" style={{ fontSize: '4.5rem', fontWeight: 200, letterSpacing: '12px' }}>Welcome Home</h2>
        <div style={{ width: '40px', height: '1px', background: 'var(--color-accent)', margin: '40px auto' }} />
        <p className="lux-text-shadow" style={{ color: 'var(--color-text)', letterSpacing: '6px', fontSize: '16px', textTransform: 'uppercase' }}>
          Experience the pinnacle of coastal luxury
        </p>
      </motion.div>
    </div>
  );
};

export default DynamicContent;
