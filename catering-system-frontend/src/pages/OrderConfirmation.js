import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('confirmedOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>No order found</h2>
          <button onClick={() => navigate('/services')} style={{ padding: '10px 20px', background: '#d4af37', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Book Now</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '700px', width: '100%' }}>
        
        {/* Success Animation */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '30px',
          padding: '50px',
          textAlign: 'center',
          animation: 'fadeInUp 0.6s ease-out'
        }}>
          
          {/* Green Tick Animation */}
          <div style={{
            width: '100px',
            height: '100px',
            background: '#4caf50',
            borderRadius: '50%',
            margin: '0 auto 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'scaleIn 0.5s ease-out'
          }}>
            <div style={{
              width: '50px',
              height: '25px',
              borderLeft: '5px solid white',
              borderBottom: '5px solid white',
              transform: 'rotate(-45deg)',
              marginTop: '-10px'
            }}></div>
          </div>

          <h1 style={{ color: '#4caf50', fontSize: '36px', marginBottom: '10px' }}>PAYMENT SUCCESSFUL!</h1>
          <p style={{ color: 'white', fontSize: '18px', marginBottom: '30px' }}>Your order has been confirmed successfully</p>

          {/* Order Details Card */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'left',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '20px', borderLeft: '3px solid #d4af37', paddingLeft: '15px' }}>📋 Order Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>ORDER ID</p>
                <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{order.orderId}</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>TRANSACTION ID</p>
                <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{order.transactionId}</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>PAYMENT METHOD</p>
                <p style={{ color: 'white' }}>{order.paymentMethod === 'card' ? '💳 Credit Card' : order.paymentMethod === 'upi' ? '📱 UPI' : '🏦 Net Banking'}</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>PAYMENT DATE</p>
                <p style={{ color: 'white' }}>{new Date(order.paidAt).toLocaleString()}</p>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>EVENT DETAILS</p>
              <p style={{ color: 'white' }}><strong>Package:</strong> {order.service?.name}</p>
              <p style={{ color: 'white' }}><strong>Customer:</strong> {order.customerInfo?.name}</p>
              <p style={{ color: 'white' }}><strong>Email:</strong> {order.customerInfo?.email}</p>
              <p style={{ color: 'white' }}><strong>Phone:</strong> {order.customerInfo?.phone}</p>
              <p style={{ color: 'white' }}><strong>Event Date:</strong> {order.customerInfo?.eventDate}</p>
              <p style={{ color: 'white' }}><strong>Number of Guests:</strong> {order.guestCount}</p>
              <p style={{ color: 'white' }}><strong>Venue:</strong> {order.customerInfo?.venue}</p>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>PAYMENT SUMMARY</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'white' }}>Subtotal:</span>
                <span style={{ color: 'white' }}>${order.subtotal?.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'white' }}>Tax (18%):</span>
                <span style={{ color: 'white' }}>${order.tax?.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #d4af37' }}>
                <span style={{ color: '#d4af37', fontSize: '18px', fontWeight: 'bold' }}>Total Amount Paid:</span>
                <span style={{ color: '#d4af37', fontSize: '24px', fontWeight: 'bold' }}>${order.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '12px 30px',
                background: '#d4af37',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate('/services')}
              style={{
                padding: '12px 30px',
                background: 'transparent',
                border: '2px solid #d4af37',
                borderRadius: '10px',
                fontSize: '16px',
                color: '#d4af37',
                cursor: 'pointer'
              }}
            >
              Book Another Event
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;