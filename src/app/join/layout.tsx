export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FB943F" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#fff8f1', color: '#1f1c19', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', WebkitFontSmoothing: 'antialiased' }}>
        {children}
      </body>
    </html>
  );
}
