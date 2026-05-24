export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#F5EFE6',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px'
    }}>
      <h1 style={{
        fontSize: '52px',
        fontWeight: '300',
        color: '#4A3728',
        letterSpacing: '0.05em'
      }}>
        Zenlya
      </h1>
      <p style={{ color: '#8C6F5E', fontSize: '18px' }}>
        Ton bien-être, simplement.
      </p>
    <a href="/explorer" style={{
  background: '#4A3728',
  color: '#F5EFE6',
  padding: '14px 32px',
  borderRadius: '100px',
  fontSize: '14px',
  cursor: 'pointer',
  textDecoration: 'none'
}}>
  Découvrir →
</a>
    </main>
  )
}
