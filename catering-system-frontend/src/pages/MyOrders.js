import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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

    // Load all orders from localStorage
    const savedOrders = localStorage.getItem('allOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    setLoading(false);
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
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <span style={{ color: '#d4af37', fontSize: '22px', fontWeight: 'bold' }}>🍽️ Royal Catering</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>Dashboard</button>
            <button onClick={() => navigate('/services')} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer' }}>Services</button>
            <button onClick={() => navigate('/my-orders')} style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>My Orders</button>
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
            fontSize: '18px'
          }}>←</button>
          {user && <span style={{ color: '#d4af37' }}>👋 {user.name}</span>}
          <button onClick={logout} style={{ background: 'rgba(244,67,54,0.2)', border: '1px solid #f44336', color: '#f44336', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer' }}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#d4af37', marginBottom: '10px' }}>📋 My Orders</h1>
        <p style={{ color: 'white', marginBottom: '30px' }}>View all your catering orders</p>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'white' }}>Loading...</div>
        ) : orders.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '60px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>📦</div>
            <h2 style={{ color: 'white' }}>No Orders Yet</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '30px' }}>You haven't placed any orders yet. Book your first catering service!</p>
            <button onClick={() => navigate('/services')} style={{
              background: '#d4af37',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>Browse Services →</button>
          </div>
        ) : (
          <div>
            {orders.map((order, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '25px',
                marginBottom: '20px',
                transition: 'transform 0.3s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '10px' }}>
                  <div>
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '18px' }}>Order ID: {order.orderId}</span>
                  </div>
                  <span style={{
                    background: order.paymentStatus === 'completed' ? 'rgba(76,175,80,0.2)' : 'rgba(255,193,7,0.2)',
                    color: order.paymentStatus === 'completed' ? '#4caf50' : '#ffc107',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {order.paymentStatus === 'completed' ? '✅ PAID' : '⏳ PENDING'}
                  </span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '5px' }}>PACKAGE</p>
                    <p style={{ color: 'white', fontWeight: 'bold' }}>{order.service?.name}</p>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '5px' }}>EVENT DATE</p>
                    <p style={{ color: 'white' }}>{order.customerInfo?.eventDate}</p>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '5px' }}>GUESTS</p>
                    <p style={{ color: 'white' }}>{order.guestCount} people</p>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '5px' }}>STAFF</p>
                    <p style={{ color: 'white' }}>👨‍💼 {order.managerCount || 0} Manager | 👨‍🍳 {order.servantCount || 0} Servants</p>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '5px' }}>TOTAL AMOUNT</p>
                    <p style={{ color: '#d4af37', fontSize: '24px', fontWeight: 'bold' }}>${order.total?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '5px' }}>PAYMENT METHOD</p>
                    <p style={{ color: 'white' }}>
                      {order.paymentMethod === 'card' ? '💳 Credit Card' : 
                       order.paymentMethod === 'upi' ? '📱 UPI' : '🏦 Net Banking'}
                    </p>
                  </div>
                </div>
                
                <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                    📅 Ordered on: {new Date(order.paidAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;