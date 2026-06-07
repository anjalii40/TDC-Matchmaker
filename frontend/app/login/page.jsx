'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    const isLoggedIn = localStorage.getItem('matchmaker_logged_in');
    if (isLoggedIn === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check credentials
    if (username.trim().toLowerCase() === 'matchmaker' && password.trim() === 'tdc123') {
      localStorage.setItem('matchmaker_logged_in', 'true');
      router.push('/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-logo">
          Matchmaker<span>.</span>
        </h1>
        <p className="auth-subtitle">The Dating Club Matchmaking Dashboard</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. matchmaker"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="auth-btn" type="submit">
            Sign In to Dashboard
          </button>
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
            Press Enter to sign in
          </div>
        </form>
      </div>
    </div>
  );
}
