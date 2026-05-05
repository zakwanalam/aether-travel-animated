import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="luxury-footer">
      <div className="footer-grid">
        <div className="footer-column">
          <h2 style={{ fontSize: '2rem', letterSpacing: '8px', fontWeight: 300, marginBottom: '20px' }} className="lux-text-gradient">
            AETHER
          </h2>
          <p style={{ color: 'var(--color-text-dim)', fontSize: '0.8rem', lineHeight: '1.8', maxWidth: '300px' }}>
            Curating the world's most exclusive travel experiences for the discerning few. 
            Elevating the art of the journey.
          </p>
        </div>

        <div className="footer-column">
          <h4>Destinations</h4>
          <ul>
            <li><a href="#">Maldives</a></li>
            <li><a href="#">Swiss Alps</a></li>
            <li><a href="#">Bora Bora</a></li>
            <li><a href="#">Kyoto</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Experiences</h4>
          <ul>
            <li><a href="#">Private Aviation</a></li>
            <li><a href="#">Yacht Charters</a></li>
            <li><a href="#">Villa Retreats</a></li>
            <li><a href="#">Expeditions</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Connect</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">The Inner Circle</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          © 2026 AETHER LUXURY TRAVEL | ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
