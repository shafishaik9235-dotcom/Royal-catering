import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    const savedOrder = localStorage.getItem('currentOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Create confirmed order with all details
      const confirmedOrder = {
        orderId: 'ORD-' + Date.now(),
        transactionId: 'TXN-' + Date.now() + Math.random().toString(36).substr(2, 6).toUpperCase(),
        paymentStatus: 'completed',
        paymentMethod: paymentMethod,
        paidAt: new Date().toISOString(),
        service: order?.service,
        customerInfo: order?.customerInfo,
        guestCount: order?.guestCount,
        managerCount: order?.managerCount || 0,
        servantCount: order?.servantCount || 0,
        subtotal: order?.subtotal,
        managerTotal: order?.managerTotal || 0,
        servantTotal: order?.servantTotal || 0,
        tax: order?.tax,
        total: order?.total,
        status: 'Confirmed'
      };
      
      // Save to localStorage for My Orders
      const existingOrders = localStorage.getItem('allOrders');
      let ordersList = [];
      if (existingOrders) {
        ordersList = JSON.parse(existingOrders);
      }
      ordersList.unshift(confirmedOrder); // Add new order at the beginning
      localStorage.setItem('allOrders', JSON.stringify(ordersList));
      
      // Also save as current confirmed order
      localStorage.setItem('confirmedOrder', JSON.stringify(confirmedOrder));
      
      setProcessing(false);
      navigate('/order-confirmation');
    }, 2000);
  };

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>No order found</h2>
          <button onClick={() => navigate('/services')} style={{ padding: '10px 20px', background: '#d4af37', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Browse Services</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#d4af37', fontSize: '42px', margin: 0 }}>💳 Payment</h1>
          <p style={{ color: 'white' }}>Complete your booking payment securely</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side - Payment Methods */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '30px'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '20px' }}>Select Payment Method</h3>
            
            <div style={{ marginBottom: '30px' }}>
              <div 
                onClick={() => setPaymentMethod('card')}
                style={{
                  background: paymentMethod === 'card' ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)',
                  border: paymentMethod === 'card' ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '15px',
                  marginBottom: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <div style={{ fontSize: '30px' }}>💳</div>
                <div>
                  <div style={{ color: 'white', fontWeight: 'bold' }}>Credit / Debit Card</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Visa, MasterCard, RuPay, Amex</div>
                </div>
                {paymentMethod === 'card' && <div style={{ marginLeft: 'auto', color: '#d4af37' }}>✓</div>}
              </div>

              <div 
                onClick={() => setPaymentMethod('upi')}
                style={{
                  background: paymentMethod === 'upi' ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)',
                  border: paymentMethod === 'upi' ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '15px',
                  marginBottom: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <div style={{ fontSize: '30px' }}>📱</div>
                <div>
                  <div style={{ color: 'white', fontWeight: 'bold' }}>UPI / BHIM</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Google Pay, PhonePe, Paytm</div>
                </div>
                {paymentMethod === 'upi' && <div style={{ marginLeft: 'auto', color: '#d4af37' }}>✓</div>}
              </div>

              <div 
                onClick={() => setPaymentMethod('netbanking')}
                style={{
                  background: paymentMethod === 'netbanking' ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)',
                  border: paymentMethod === 'netbanking' ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '15px',
                  marginBottom: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <div style={{ fontSize: '30px' }}>🏦</div>
                <div>
                  <div style={{ color: 'white', fontWeight: 'bold' }}>Net Banking</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>All major banks</div>
                </div>
                {paymentMethod === 'netbanking' && <div style={{ marginLeft: 'auto', color: '#d4af37' }}>✓</div>}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div>
                <h4 style={{ color: '#d4af37', marginBottom: '15px' }}>Card Details</h4>
                <input
                  type="text"
                  placeholder="Card Number"
                  defaultValue="4242 4242 4242 4242"
                  style={{
                    width: '100%',
                    padding: '15px',
                    marginBottom: '15px',
                    borderRadius: '10px',
                    border: '1px solid #d4af37',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/28"
                    style={{ flex: 1, padding: '15px', borderRadius: '10px', border: '1px solid #d4af37', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    defaultValue="123"
                    style={{ flex: 1, padding: '15px', borderRadius: '10px', border: '1px solid #d4af37', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <h4 style={{ color: '#d4af37', marginBottom: '15px' }}>UPI ID</h4>
                <input
                  type="text"
                  placeholder="yourname@okhdfcbank"
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid #d4af37',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div>
                <h4 style={{ color: '#d4af37', marginBottom: '15px' }}>Select Bank</h4>
                <select style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid #d4af37',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  fontSize: '16px'
                }}>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Yes Bank</option>
                </select>
              </div>
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '30px'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '20px' }}>📋 Order Summary</h3>
            
            <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <p><strong style={{ color: '#d4af37' }}>Package:</strong> <span style={{ color: 'white' }}>{order.service?.name}</span></p>
              <p><strong style={{ color: '#d4af37' }}>Customer:</strong> <span style={{ color: 'white' }}>{order.customerInfo?.name}</span></p>
              <p><strong style={{ color: '#d4af37' }}>Event Date:</strong> <span style={{ color: 'white' }}>{order.customerInfo?.eventDate}</span></p>
              <p><strong style={{ color: '#d4af37' }}>Guests:</strong> <span style={{ color: 'white' }}>{order.guestCount}</span></p>
              <p><strong style={{ color: '#d4af37' }}>Venue:</strong> <span style={{ color: 'white' }}>{order.customerInfo?.venue}</span></p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'white' }}>Food ({order.guestCount} guests × ${order.service?.pricePerPerson})</span>
                <span style={{ color: '#d4af37' }}>${order.subtotal?.toLocaleString()}</span>
              </div>
              {order.managerCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: 'white' }}>Manager ({order.managerCount} × $200)</span>
                  <span style={{ color: '#d4af37' }}>${order.managerTotal?.toLocaleString()}</span>
                </div>
              )}
              {order.servantCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: 'white' }}>Servants ({order.servantCount} × $100)</span>
                  <span style={{ color: '#d4af37' }}>${order.servantTotal?.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'white' }}>Tax (18%)</span>
                <span style={{ color: '#d4af37' }}>${order.tax?.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #d4af37' }}>
                <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Total:</span>
                <span style={{ color: '#d4af37', fontSize: '24px', fontWeight: 'bold' }}>${order.total?.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              style={{
                width: '100%',
                padding: '18px',
                background: processing ? '#666' : '#d4af37',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: processing ? 'not-allowed' : 'pointer',
                marginTop: '30px'
              }}
            >
              {processing ? 'Processing...' : `Pay $${order.total?.toLocaleString()}`}
            </button>
            
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginTop: '20px', fontSize: '12px' }}>
              🔒 Secure payment. Your order will be saved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;