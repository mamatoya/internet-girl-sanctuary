import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { AuthProvider, useAuth } from './lib/auth';
import { useSync } from './lib/useSync';
import { AuthScreen } from './components/Auth/AuthScreen';
import { Sidebar } from './components/Layout/Sidebar';
import { DailyDashboard } from './components/Dashboard/DailyDashboard';
import { FocusSession } from './components/Dashboard/FocusSession';
import { SubjectCard } from './components/Subjects/SubjectCard';
import { JournalEntry } from './components/Progress/JournalEntry';
import { JournalList } from './components/Progress/JournalList';
import './themes.css';

function AppContent() {
  const { user, loading, signOut } = useAuth();
  const { theme, activeView, subjects, session, updateCreature } = useStore();

  // Sync with Supabase
  useSync();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Update creature on mount
  useEffect(() => {
    updateCreature();
  }, [updateCreature]);

  // Show loading
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
          loading...
        </div>
      </div>
    );
  }

  // Show auth screen if not logged in
  if (!user) {
    return <AuthScreen />;
  }

  const renderContent = () => {
    // Focus mode takes over everything
    if (session.active || activeView === 'focus') {
      return <FocusSession />;
    }

    switch (activeView) {
      case 'today':
        return <DailyDashboard />;

      case 'browse':
        return (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2
              style={{
                textAlign: 'center',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-display)',
              }}
            >
              ~* all subjects *~
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>
        );

      case 'journal':
        return (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              style={{
                textAlign: 'center',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-display)',
              }}
            >
              ~* journal *~
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
              }}
            >
              <JournalEntry />
              <div>
                <h3
                  style={{
                    marginBottom: '1rem',
                    color: 'var(--accent-2)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  past entries
                </h3>
                <JournalList />
              </div>
            </div>
          </div>
        );

      default:
        return <DailyDashboard />;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: '2rem',
      }}
    >
      <Sidebar />
      {/* Sign out button */}
      <button
        onClick={signOut}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: '1px solid var(--border-color)',
          color: 'var(--text-muted)',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          zIndex: 100,
        }}
      >
        sign out
      </button>
      <main
        style={{
          marginLeft: '20px', // Small margin for collapsed sidebar button
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
