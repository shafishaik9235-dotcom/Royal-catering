import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const API_URL = 'http://localhost:5000';
      let url = '';
      let body = {};
      
      if (isLogin) {
        url = `${API_URL}/api/auth/login`;
        body = { email, password };
      } else {
        url = `${API_URL}/api/auth/register`;
        body = { name, email, password, phone };
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setMessage(isLogin ? 'Login successful!' : 'Account created!');
        setTimeout(() => navigate('/services'), 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Cannot connect to server. Please make sure backend is running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("https://i.pinimg.com/1200x/7d/d8/66/7dd866f939cd7b7ab37229c897bb949c.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      {/* Dark Overlay for better text visibility */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.55)',
        zIndex: 0
      }}></div>
      
      {/* Login Form - Reduced Size */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '16px',
        padding: '30px',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.25)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '50px' }}>🍽️</div>
          <h1 style={{ color: '#d4af37', fontSize: '28px', margin: '8px 0' }}>
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {isLogin ? 'Login to book premium catering' : 'Sign up to get started'}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#ffebee',
            border: '1px solid #f44336',
            borderRadius: '8px',
            padding: '8px',
            marginBottom: '15px',
            color: '#f44336',
            textAlign: 'center',
            fontSize: '13px'
          }}>
            ❌ {error}
          </div>
        )}

        {message && (
          <div style={{
            background: '#e8f5e9',
            border: '1px solid #4caf50',
            borderRadius: '8px',
            padding: '8px',
            marginBottom: '15px',
            color: '#4caf50',
            textAlign: 'center',
            fontSize: '13px'
          }}>
            ✅ {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#ccc' : '#d4af37',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '10px',
              color: '#000'
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setMessage('');
          }}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: '#d4af37',
            marginTop: '15px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '20px',
          padding: '10px',
          background: '#f5f5f5',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666', fontSize: '11px', margin: 0 }}>
            🔐 Demo: Any email & password works!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;