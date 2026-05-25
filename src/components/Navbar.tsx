import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ['Resorts', 'Private Jet', 'Experience', 'Concierge'];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="lux-glass luxury-nav"
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
        
        {/* Desktop Links */}
        <div className="nav-links" style={{ display: 'flex', gap: '40px' }}>
          {menuItems.map((item) => (
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
            className="nav-inquire-btn"
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

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              display: 'none',
              padding: '5px'
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lux-glass mobile-menu-overlay"
            style={{
              position: 'fixed',
              top: '100px',
              left: '20px',
              right: '20px',
              zIndex: 999,
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              borderRadius: '2px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '18px',
                  textTransform: 'uppercase',
                  letterSpacing: '4px',
                  fontWeight: 300
                }}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
