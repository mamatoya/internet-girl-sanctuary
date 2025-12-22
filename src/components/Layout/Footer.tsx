export function Footer() {
  return (
    <footer className="app-footer">
      <div className="ascii-divider">
        {'~*~'} . {'~*~'} . {'~*~'} . {'~*~'} . {'~*~'}
      </div>
      <div>
        made with {'<3'} by internet girl {'|'} {new Date().getFullYear()}
      </div>
      <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>
        consistency {'>'} intensity
      </div>
    </footer>
  );
}
