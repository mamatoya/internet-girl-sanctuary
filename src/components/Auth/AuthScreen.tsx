import { useState } from 'react';
import { useAuth } from '../../lib/auth';

export function AuthScreen() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fn = mode === 'signin' ? signInWithEmail : signUpWithEmail;
    const { error } = await fn(email, password);

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--bg-card)',
          border: '2px solid var(--accent-1)',
          padding: '2rem',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <pre
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.7rem',
              color: 'var(--accent-1)',
              marginBottom: '1rem',
            }}
          >
{`   *  . *
 *    ~*~    *
    WELCOME
   *  . *`}
          </pre>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'var(--text-primary)',
            }}
          >
            learning sanctuary
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {mode === 'signin' ? 'welcome back!' : 'create your account'}
          </p>
        </div>

        {/* Google Sign In */}
        <button
          onClick={signInWithGoogle}
          className="btn"
          style={{
            width: '100%',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <span>continue with google</span>
        </button>

        <div
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            margin: '1rem 0',
            fontSize: '0.8rem',
          }}
        >
          ~~ or ~~
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: '0.25rem',
              }}
            >
              email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: '0.25rem',
              }}
            >
              password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ width: '100%' }}
            />
          </div>

          {error && (
            <div
              style={{
                color: 'var(--accent-2)',
                fontSize: '0.85rem',
                marginBottom: '1rem',
                padding: '0.5rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--accent-2)',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn--primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? '...' : mode === 'signin' ? 'sign in' : 'sign up'}
          </button>
        </form>

        {/* Toggle */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-1)',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
            }}
          >
            {mode === 'signin'
              ? "don't have an account? sign up"
              : 'already have an account? sign in'}
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          your data syncs across devices
        </div>
      </div>
    </div>
  );
}
