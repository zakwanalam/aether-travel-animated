import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="lux-glass"
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        right: '20px',
        height: '70px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        borderRadius: '2px'
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 300, letterSpacing: '8px' }}>
        AETHER
      </div>
      
      <div style={{ display: 'flex', gap: '40px' }}>
        {['Resorts', 'Private Jet', 'Experience', 'Concierge'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ scale: 1.05, color: 'var(--color-accent)' }}
            style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 400,
              transition: 'color 0.3s'
            }}
          >
            {item}
          </motion.a>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
        style={{
          background: 'transparent',
          border: '1px solid white',
          color: 'white',
          padding: '10px 25px',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        Inquire
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;
