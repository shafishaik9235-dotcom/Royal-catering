import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      
      {/* Top Navigation */}
      <nav style={{
        background: 'rgba(0,0,0,0.8)',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(212,175,55,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <span style={{ color: '#d4af37', fontSize: '22px', fontWeight: 'bold' }}>🍽️ Royal Catering</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>Dashboard</button>
            <button onClick={() => navigate('/services')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>Services</button>
            <button onClick={() => navigate('/my-orders')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>My Orders</button>
            <button onClick={() => navigate('/profile')} style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>Profile</button>
          </div>
        </div>
        <button onClick={logout} style={{ background: 'rgba(244,67,54,0.2)', border: '1px solid #f44336', color: '#f44336', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer' }}>Logout</button>
      </nav>

      {/* Back Button */}
      <div style={{ padding: '20px 30px 0 30px' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'rgba(212,175,55,0.2)',
          border: '1px solid #d4af37',
          color: '#d4af37',
          padding: '8px 20px',
          borderRadius: '25px',
          cursor: 'pointer'
        }}>
          ← Back
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#d4af37', marginBottom: '30px' }}>👤 My Profile</h1>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'white' }}>Loading...</div>
        ) : (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '40px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ fontSize: '80px' }}>👤</div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '5px' }}>Full Name</label>
              <p style={{ color: 'white', fontSize: '18px', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>{user?.name || 'Not set'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '5px' }}>Email Address</label>
              <p style={{ color: 'white', fontSize: '18px', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>{user?.email || 'Not set'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '5px' }}>Phone Number</label>
              <p style={{ color: 'white', fontSize: '18px', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>{user?.phone || 'Not provided'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '5px' }}>Member Since</label>
              <p style={{ color: 'white', fontSize: '18px', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;