import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user info
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUser(data.user);
      })
      .catch(err => console.log(err));
    }

    // Fetch services
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const toggleMenu = (index) => {
    if (expandedMenu === index) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(index);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#d4af37', fontSize: '24px' }}>Loading delicious menu...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      
      {/* Top Navigation Bar */}
      <nav style={{
        background: 'rgba(0,0,0,0.8)',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(212,175,55,0.3)'
      }}>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <span style={{ color: '#d4af37', fontSize: '22px', fontWeight: 'bold' }}>🍽️ Royal Catering</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>Dashboard</button>
            <button onClick={() => navigate('/services')} style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>Services</button>
            <button onClick={() => navigate('/my-orders')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>My Orders</button>
            <button onClick={() => navigate('/profile')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>Profile</button>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'rgba(212,175,55,0.2)',
            border: '1px solid #d4af37',
            color: '#d4af37',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>←</button>
          
          {user && (
            <span style={{ color: '#d4af37', fontSize: '14px' }}>👋 {user.name}</span>
          )}
          
          <button onClick={logout} style={{
            background: 'rgba(244,67,54,0.2)',
            border: '1px solid #f44336',
            color: '#f44336',
            padding: '8px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ color: '#d4af37', textAlign: 'center', fontSize: '42px', marginBottom: '10px' }}>🍽️ Our Premium Menu</h1>
        <p style={{ color: 'white', textAlign: 'center', marginBottom: '40px', fontSize: '18px' }}>Choose from our exquisite catering packages</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
          {services.map((service, idx) => (
            <div key={service._id} style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '20px',
              overflow: 'hidden',
              transition: 'transform 0.3s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ padding: '25px' }}>
                <h2 style={{ color: '#d4af37', fontSize: '24px', marginBottom: '5px' }}>{service.name}</h2>
                <p style={{ color: '#ffd700', fontSize: '14px', marginBottom: '10px' }}>⭐ {service.rating} | 👥 {service.minGuests}-{service.maxGuests} guests</p>
                <p style={{ color: 'white', opacity: 0.8, marginBottom: '15px' }}>{service.description}</p>
                <p style={{ color: '#d4af37', fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>${service.pricePerPerson}<span style={{ fontSize: '14px', color: 'white' }}> / person</span></p>
                
                {/* Menu Button */}
                <button onClick={() => toggleMenu(idx)} style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(212,175,55,0.2)',
                  border: '1px solid #d4af37',
                  borderRadius: '10px',
                  color: '#d4af37',
                  cursor: 'pointer',
                  fontSize: '16px',
                  marginBottom: '15px'
                }}>
                  🍽️ {expandedMenu === idx ? 'Hide Full Menu' : 'View Full Menu'}
                </button>
                
                {/* Menu Items - FIXED with scroll and better visibility */}
                {expandedMenu === idx && service.menuItems && (
                  <div style={{
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '10px',
                    padding: '15px',
                    marginBottom: '15px',
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}>
                    <h4 style={{ color: '#d4af37', marginBottom: '15px', fontSize: '16px', borderBottom: '1px solid #d4af37', paddingBottom: '8px' }}>📋 Menu Includes:</h4>
                    {service.menuItems.map((item, i) => (
                      <div key={i} style={{ 
                        color: 'white', 
                        padding: '8px 0', 
                        borderBottom: '1px solid rgba(255,255,255,0.1)', 
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ fontSize: '18px' }}>🍽️</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <button onClick={() => navigate('/checkout', { state: { service } })} style={{
                  width: '100%',
                  padding: '15px',
                  background: '#d4af37',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '10px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#ffd700'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#d4af37'}>
                  📅 Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;