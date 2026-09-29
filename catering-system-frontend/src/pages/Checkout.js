import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state || {};
  const [guestCount, setGuestCount] = useState(service?.minGuests || 50);
  const [managerCount, setManagerCount] = useState(1);
  const [servantCount, setServantCount] = useState(2);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    venue: ''
  });

  // Prices
  const MANAGER_PRICE = 200;
  const SERVANT_PRICE = 100;

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <h2>No service selected</h2>
          <button onClick={() => navigate('/services')} style={{ padding: '10px 20px', background: '#d4af37', border: 'none', borderRadius: '10px', marginTop: '20px', cursor: 'pointer' }}>Browse Services</button>
        </div>
      </div>
    );
  }

  const subtotal = service.pricePerPerson * guestCount;
  const managerTotal = managerCount * MANAGER_PRICE;
  const servantTotal = servantCount * SERVANT_PRICE;
  const tax = (subtotal + managerTotal + servantTotal) * 0.18;
  const total = subtotal + managerTotal + servantTotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const orderDetails = {
      service,
      guestCount,
      managerCount,
      servantCount,
      customerInfo,
      subtotal,
      managerTotal,
      servantTotal,
      tax,
      total,
      orderId: 'ORD-' + Date.now()
    };
    
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
    navigate('/payment');
    setLoading(false);
  };

  // Plus/Minus button component
  const CounterButton = ({ label, count, setCount, min = 0, max = 20, price }) => (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '15px',
      padding: '15px',
      marginBottom: '15px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <span style={{ fontSize: '24px', marginRight: '10px' }}>{label === 'Manager' ? '👨‍💼' : '👨‍🍳'}</span>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>{label}</span>
          <span style={{ color: '#d4af37', marginLeft: '10px', fontSize: '14px' }}>(${price}/each)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            type="button"
            onClick={() => setCount(Math.max(min, count - 1))}
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              border: 'none',
              background: '#d4af37',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            −
          </button>
          <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>{count}</span>
          <button
            type="button"
            onClick={() => setCount(Math.min(max, count + 1))}
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              border: 'none',
              background: '#d4af37',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            +
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
        <span>Total {label}s: {count}</span>
        <span>${(count * price).toLocaleString()}</span>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#d4af37', fontSize: '42px', margin: 0 }}>📋 Event Checkout</h1>
          <p style={{ color: 'white' }}>Complete your booking details</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side - Form */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '30px'
          }}>
            <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>Event Details</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d4af37', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Email *</label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d4af37', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Phone *</label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d4af37', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Event Date *</label>
                <input
                  type="date"
                  required
                  value={customerInfo.eventDate}
                  onChange={(e) => setCustomerInfo({...customerInfo, eventDate: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d4af37', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Venue Address</label>
                <input
                  type="text"
                  value={customerInfo.venue}
                  onChange={(e) => setCustomerInfo({...customerInfo, venue: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d4af37', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Number of Guests *</label>
                <input
                  type="number"
                  required
                  min={service.minGuests}
                  max={service.maxGuests}
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d4af37', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
                <small style={{ color: 'white', opacity: 0.7 }}>Min: {service.minGuests} | Max: {service.maxGuests}</small>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: loading ? '#666' : '#d4af37',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '20px'
                }}
              >
                {loading ? 'Processing...' : 'Proceed to Payment →'}
              </button>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '30px',
            height: 'fit-content'
          }}>
            <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>Order Summary</h2>
            
            <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              <h3 style={{ color: 'white' }}>{service.name}</h3>
              <p style={{ color: 'white', opacity: 0.8 }}>{service.description}</p>
            </div>

            {/* Staff Selection with Plus/Minus */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>👥 Staff Selection</h3>
              
              <CounterButton 
                label="Manager" 
                count={managerCount} 
                setCount={setManagerCount} 
                price={MANAGER_PRICE}
                min={0}
                max={10}
              />
              
              <CounterButton 
                label="Servant" 
                count={servantCount} 
                setCount={setServantCount} 
                price={SERVANT_PRICE}
                min={0}
                max={30}
              />
            </div>

            {/* Price Breakdown */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'white' }}>
                <span>Food ({guestCount} guests × ${service.pricePerPerson})</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'white' }}>
                <span>👨‍💼 Manager ({managerCount} × ${MANAGER_PRICE})</span>
                <span>${managerTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'white' }}>
                <span>👨‍🍳 Servants ({servantCount} × ${SERVANT_PRICE})</span>
                <span>${servantTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'white' }}>
                <span>Tax (18%)</span>
                <span>${tax.toLocaleString()}</span>
              </div>
            </div>

            <div style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '2px solid #d4af37',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              <span style={{ color: 'white' }}>Total:</span>
              <span style={{ color: '#d4af37' }}>${total.toLocaleString()}</span>
            </div>

            <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(212,175,55,0.1)', borderRadius: '10px' }}>
              <p style={{ color: '#d4af37', fontSize: '14px', margin: 0 }}>
                💡 Each manager handles event coordination<br/>
                💡 Each servant serves 25-30 guests
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;