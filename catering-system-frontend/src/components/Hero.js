import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a2a 0%, #1a1a3a 50%, #2a1a3a 100%)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d4af37'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '40px'
      }} />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        
        {/* Brand Label */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(212,175,55,0.2)',
          border: '1px solid #d4af37',
          borderRadius: '50px',
          padding: '8px 24px',
          marginBottom: '30px',
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{ color: '#d4af37', fontSize: '14px', letterSpacing: '2px' }}>
            ✨ ROYAL CATERING EST. 2024 ✨
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: '72px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '20px',
          lineHeight: '1.2',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          BOOK DELICIOUS
          <br />
          <span style={{ color: '#d4af37' }}>CATERING FOR YOUR</span>
          <br />
          SPECIAL EVENT
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '40px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Experience luxury catering with our exquisite menu, professional service, 
          and unforgettable dining experiences for weddings, corporate events, and private parties.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              const token = localStorage.getItem('token');
              if (token) {
                navigate('/services');
              } else {
                navigate('/login');
              }
            }}
            style={{
              background: '#d4af37',
              border: 'none',
              padding: '16px 40px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#000',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(212,175,55,0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 25px rgba(212,175,55,0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(212,175,55,0.3)';
            }}
          >
            📅 BOOK NOW
          </button>
          
          <button
            onClick={() => {
              const token = localStorage.getItem('token');
              if (token) {
                navigate('/services');
              } else {
                navigate('/login');
              }
            }}
            style={{
              background: 'transparent',
              border: '2px solid #d4af37',
              padding: '16px 40px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#d4af37',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(212,175,55,0.1)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'scale(1)';
            }}
          >
            📖 VIEW MENU
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '50px',
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(212,175,55,0.2)'
        }}>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d4af37' }}>500+</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Events Catered</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d4af37' }}>50+</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Menu Options</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d4af37' }}>98%</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;