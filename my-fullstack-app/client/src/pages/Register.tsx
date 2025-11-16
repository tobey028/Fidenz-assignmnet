import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      {/* Animated background */}
      <div style={styles.backgroundAnimation}>
        <div style={{...styles.cloud, left: '15%', top: '15%', animationDelay: '0s'}}></div>
        <div style={{...styles.cloud, left: '70%', top: '35%', animationDelay: '3s'}}></div>
        <div style={{...styles.cloud, left: '25%', top: '65%', animationDelay: '6s'}}></div>
      </div>

      {/* Register Card */}
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>🌈</span>
        </div>
        
        <h1 style={styles.title}>Join Weather Dashboard</h1>
        <p style={styles.subtitle}>Create your account to get started</p>

        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>👤</span>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>👤</span>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>📧</span>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john.doe@example.com"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>🔒</span>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Minimum 6 characters"
              style={styles.input}
            />
            <span style={styles.hint}>Must be at least 6 characters long</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner}></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>Already have an account?</span>
        </div>

        <Link to="/login" style={styles.loginLink}>
          Sign In
        </Link>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          🌍 Join thousands of users tracking weather worldwide
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    zIndex: 0,
  },
  cloud: {
    position: 'absolute',
    width: '100px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '50px',
    animation: 'float 20s infinite ease-in-out',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    padding: '48px 40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 1,
  },
  iconContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  icon: {
    fontSize: '64px',
    display: 'inline-block',
    animation: 'bounce 2s infinite',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center',
    margin: '0 0 32px 0',
  },
  errorBox: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    color: 'white',
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
  },
  errorIcon: {
    fontSize: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  labelIcon: {
    fontSize: '16px',
  },
  input: {
    padding: '14px 16px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },
  hint: {
    fontSize: '12px',
    color: '#999',
    marginTop: '-4px',
  },
  button: {
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #27AE60 0%, #229954 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 16px rgba(39, 174, 96, 0.4)',
  },
  buttonIcon: {
    fontSize: '18px',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },
  divider: {
    margin: '32px 0 20px 0',
    textAlign: 'center',
    position: 'relative',
  },
  dividerText: {
    background: 'rgba(255, 255, 255, 0.98)',
    padding: '0 16px',
    color: '#999',
    fontSize: '14px',
    position: 'relative',
    zIndex: 1,
  },
  loginLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#2F80ED',
    textDecoration: 'none',
    border: '2px solid #2F80ED',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  },
  loginIcon: {
    fontSize: '18px',
  },
  footer: {
    marginTop: '32px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    margin: 0,
  },
};

export default Register;