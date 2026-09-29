import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUser(data.user);
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
        {/* Left side - Logo & Navigation */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <span style={{ color: '#d4af37', fontSize: '22px', fontWeight: 'bold' }}>🍽️ Royal Catering</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '14px', cursor: 'pointer' }}>Dashboard</button>
            <button onClick={() => navigate('/services')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>Services</button>
            <button onClick={() => navigate('/my-orders')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>My Orders</button>
            <button onClick={() => navigate('/profile')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>Profile</button>
          </div>
        </div>
        
        {/* Right side - Back Arrow + User/Login/Signup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Back Arrow */}
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
          
          {/* User Info or Login/Signup */}
          {user ? (
            <>
              <span style={{ color: '#d4af37' }}>👋 {user.name}</span>
              <button onClick={logout} style={{ background: 'rgba(244,67,54,0.2)', border: '1px solid #f44336', color: '#f44336', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => navigate('/login')} style={{ background: '#d4af37', border: 'none', color: '#000', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
              <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer' }}>Sign Up</button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <h1 style={{ color: '#d4af37', fontSize: '36px', margin: 0 }}>Executive Dashboard</h1>
          <p style={{ color: 'white', opacity: 0.7, marginTop: '10px' }}>Live Catering Management System</p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px' }}>📦</div>
            <h3 style={{ color: 'white', margin: '10px 0' }}>Total Orders</h3>
            <p style={{ color: '#d4af37', fontSize: '36px', fontWeight: 'bold', margin: 0 }}>156</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px' }}>💰</div>
            <h3 style={{ color: 'white', margin: '10px 0' }}>Total Revenue</h3>
            <p style={{ color: '#d4af37', fontSize: '36px', fontWeight: 'bold', margin: 0 }}>$28,450</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px' }}>🍽️</div>
            <h3 style={{ color: 'white', margin: '10px 0' }}>Active Services</h3>
            <p style={{ color: '#d4af37', fontSize: '36px', fontWeight: 'bold', margin: 0 }}>12</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px' }}>⭐</div>
            <h3 style={{ color: 'white', margin: '10px 0' }}>Satisfaction</h3>
            <p style={{ color: '#d4af37', fontSize: '36px', fontWeight: 'bold', margin: 0 }}>98%</p>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '25px' }}>
          <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>📋 Recent Orders</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#d4af37' }}>Order ID</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#d4af37' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#d4af37' }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#d4af37' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#d4af37' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '12px', color: '#d4af37' }}>ORD-001</td>
                <td style={{ padding: '12px', color: 'white' }}>John Smith</td>
                <td style={{ padding: '12px', color: 'white' }}>$3,250</td>
                <td style={{ padding: '12px' }}><span style={{ background: 'rgba(76,175,80,0.2)', color: '#4caf50', padding: '5px 12px', borderRadius: '20px' }}>completed</span></td>
                <td style={{ padding: '12px', color: 'white' }}>10:30 AM</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '12px', color: '#d4af37' }}>ORD-002</td>
                <td style={{ padding: '12px', color: 'white' }}>Emma Wilson</td>
                <td style={{ padding: '12px', color: 'white' }}>$1,875</td>
                <td style={{ padding: '12px' }}><span style={{ background: 'rgba(255,193,7,0.2)', color: '#ffc107', padding: '5px 12px', borderRadius: '20px' }}>preparing</span></td>
                <td style={{ padding: '12px', color: 'white' }}>11:15 AM</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', color: '#d4af37' }}>ORD-003</td>
                <td style={{ padding: '12px', color: 'white' }}>Michael Brown</td>
                <td style={{ padding: '12px', color: 'white' }}>$5,600</td>
                <td style={{ padding: '12px' }}><span style={{ background: 'rgba(33,150,243,0.2)', color: '#2196f3', padding: '5px 12px', borderRadius: '20px' }}>confirmed</span></td>
                <td style={{ padding: '12px', color: 'white' }}>1:00 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;