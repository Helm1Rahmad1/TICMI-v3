export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-wrapper">
      <div className="phone-notch-display" />
      <div
        className="phone-screen-content"
        style={{
          width: '100%',
          maxWidth: 430,
          height: '100dvh',
          marginLeft: 'auto',
          marginRight: 'auto',
          background: 'var(--bg)',
          position: 'relative',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
}
