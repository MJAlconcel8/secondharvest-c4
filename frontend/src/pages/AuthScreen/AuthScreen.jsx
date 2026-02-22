import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import './AuthScreen.scss'

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        username : '',
        email: '',
        password:'',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');

    const handleFormChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if(!isLogin && formData.password !== formData.confirmPassword){
            setMessage('Passwords do not match');
        }

        const endPoint = isLogin ? '/api/user/login' : '/api/user/register';

        try{
            const response = await fetch(`http://localhost:5000${endPoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if(response.ok){
                setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
            } else {
                setMessage(data.error || 'An error occurred');
            }
        } catch (err) {
            setMessage('An error occurred while connecting to the server');
        }
    };


  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {/* Left Side of Login/Signup Screen */}
        <div className="hero-panel">
          <img src="/src/assets/forest-background.jpeg" alt="Forest" />
          <div className="hero-content">
            <h1>{isLogin ? "Welcome Back" : "Join Our Community"}</h1>
            <p>{isLogin ? "Continue building a better future." : "Education. Advocacy. Action."}</p>
            <span className="hero-footer text-xs mt-10 opacity-70">Safeguarding Earth's Resources.</span>
          </div>
        </div>

        {/* /* Left Side of Login/Signup Screen */}
        <div className="form-panel">
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
              {isLogin ? "Log In" : "Create Account"}
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
  );
};

export default AuthScreen