import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import { userService } from '../../services/userService';
import logo from '../../assets/YouthEnlightened.svg';
import forestBackground from '../../assets/forest-background.jpeg';
import './AuthScreen.scss';


const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');

    if (mode === 'register') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLogin(false);
    } else if (mode === 'login') {
      setIsLogin(true);
    }
  }, [location.search]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Slow down loader for environmental effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Sign Up: Email must have @
    if (!isLogin && !formData.email.includes('@')) {
      setModal({ show: true, message: 'Email Address does not have @' });
      setLoading(false);
      return;
    }

    // Sign Up: Passwords must match
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setModal({ show: true, message: 'Password does not match Confirm Password' });
      setLoading(false);
      return;
    }

    try {
      let data;
      if (isLogin) {
        data = await userService.loginUser({
          email: formData.email,
          password: formData.password
        });
      } else {
        data = await userService.registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
      }

      // Store user data in localStorage
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
      }
      setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
      setTimeout(() => {
        setLoading(false);
        navigate('/home');
      }, 800);
    } catch (error) {
      const errorMessage = error.message || 'An error occurred';
      // Login: Incorrect user name or password
      if (isLogin && errorMessage.toLowerCase().includes('incorrect')) {
        setModal({ show: true, message: 'Incorrect user name or password' });
      } else if (!isLogin && errorMessage.toLowerCase().includes('email')) {
        setModal({ show: true, message: 'Email is already registered. Please use a different email.' });
      } else {
        setModal({ show: true, message: errorMessage });
      }
      setMessage(errorMessage);
      setLoading(false);
    }
  };


  return (
    <>
    <ErrorModal show={modal.show} message={modal.message} onClose={() => setModal({ show: false, message: '' })} />
    <div className="auth-container">
      <div className="auth-card">
        
        {/* Left Side of Login/Signup Screen */}
        <div className="hero-panel">
          <img src={forestBackground} alt="Forest" />
          <div className="hero-content">
            <h1>{isLogin ? "Welcome Back" : "Join Our Community"}</h1>
            <p>{isLogin ? "Continue building a better future." : "Build a Thriving World."}</p>
            <span className="hero-footer text-xs mt-10 opacity-70">Safeguarding Earth's Resources.</span>
          </div>
        </div>

        {/* /* Left Side of Login/Signup Screen */}
        <div className={`form-panel${isLogin ? '' : ' form-panel--register'}`}>
          <div className="auth-logo">
            <img src={logo} alt="Second Harvest Logo" />
          </div>
          <h2>{isLogin ? "Log In" : "Create Account"}</h2>
          
          {message && <p className="status-message">{message}</p>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleFormChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleFormChange} 
                required 
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>
            )}

            <Button type="submit" className="submit-btn">
              {loading ? (
                <span className="env-loader">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#388E3C" strokeWidth="4" fill="#C8E6C9" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#388E3C" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  <span style={{ marginLeft: '8px' }}>Loading...</span>
                </span>
              ) : (
                isLogin ? "Log In" : "Create Account"
              )}
            </Button>
          </form>

          <div className="toggle-text">
            <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Log In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AuthScreen