'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: '#F5EFE6',
      fontFamily: 'Georgia, serif',
      padding: '40px 24px'
    }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <div style={{ fontSize: '22px', color: '#4A3728', letterSpacing: '0.05em' }}>
          Zenlya
        </div>
        <div style={{ fontSize: '13px', color: '#8C6F5E' }}>
          {user?.email}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '300',
          color: '#4A3728',
          marginBottom: '8px'
        }}>
          Bonjour
        </h1>
        <p style={{ color: '#8C6F5E', fontSize: '15px' }}>
          Prends soin de toi aujourd'hui
        </p>
      </div>

      <div style={{
        background: '#4A3728',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '24px',
        color: '#F5EFE6'
      }}>
        <div style={{
          fontSize: '11px',
          opacity: 0.6,
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Prochain rendez-vous
        </div>
        <div style={{ fontSize: '20px', marginBottom: '4px' }}>
          Aucun RDV à venir
        </div>
        <div style={{ fontSize: '13px', opacity: 0.7 }}>
          Réserve ta première séance
        </div>
      </div>

      <h2 style={{
        fontSize: '22px',
        fontWeight: '300',
        color: '#4A3728',
        marginBottom: '16px'
      }}>
        Explore
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '32px'
      }}>
        {[
          { name: 'Massage', count: '3 200 praticiens' },
          { name: 'Yoga', count: '1 900 praticiens' },
          { name: 'Naturopathie', count: '800 praticiens' },
          { name: 'Beauté', count: '3 500 praticiens' },
        ].map((cat) => (
          <a
            href="/explorer"
            key={cat.name}
            style={{
              background: '#FDFAF6',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #EDE0CF',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'block'
            }}
          >
            <div style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#4A3728',
              marginBottom: '6px'
            }}>
              {cat.name}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#B8A090'
            }}>
              {cat.count}
            </div>
          </a>
        ))}
      </div>

      <button
        onClick={async () => {
          await supabase.auth.signOut()
          window.location.href = '/login'
        }}
        style={{
          background: 'transparent',
          border: '1.5px solid #EDE0CF',
          borderRadius: '12px',
          padding: '12px 24px',
          fontSize: '13px',
          color: '#B8A090',
          cursor: 'pointer',
          fontFamily: 'Georgia, serif'
        }}
      >
        Se déconnecter
      </button>

    </main>
  )
}