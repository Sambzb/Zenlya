'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function Explorer() {
  const [praticiens, setPraticiens] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPraticiens = async () => {
      const { data, error } = await supabase
        .from('practitioners')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false })

      if (!error && data) setPraticiens(data)
      setLoading(false)
    }

    fetchPraticiens()
  }, [])

  const filtered = praticiens.filter(p =>
    p.display_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.specialty?.toLowerCase().includes(search.toLowerCase()) ||
    p.city?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main style={{
      minHeight: '100vh',
      background: '#F5EFE6',
      fontFamily: 'Georgia, serif',
      padding: '40px 24px'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <div style={{ fontSize: '22px', color: '#4A3728', letterSpacing: '0.05em' }}>
          Zenlya
        </div>
        <a href="/dashboard" style={{
          fontSize: '13px', color: '#8C6F5E', textDecoration: 'none'
        }}>
          ← Dashboard
        </a>
      </div>

      <h1 style={{
        fontSize: '36px',
        fontWeight: '300',
        color: '#4A3728',
        marginBottom: '24px'
      }}>
        Explorer
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Massage, yoga, Paris..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '14px',
          border: '1.5px solid #EDE0CF',
          background: '#FDFAF6',
          fontSize: '14px',
          color: '#4A3728',
          outline: 'none',
          fontFamily: 'Georgia, serif',
          marginBottom: '24px'
        }}
      />

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#B8A090' }}>
          Chargement des praticiens...
        </div>
      )}

      {/* Liste */}
      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '60px',
              color: '#B8A090', fontSize: '14px'
            }}>
              Aucun praticien trouvé
            </div>
          )}
          {filtered.map((p) => (
            <div key={p.id} style={{
              background: '#FDFAF6',
              borderRadius: '18px',
              border: '1px solid #EDE0CF',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#4A3728',
                  marginBottom: '4px'
                }}>
                  {p.display_name}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#8C6F5E',
                  marginBottom: '8px'
                }}>
                  {p.specialty} · {p.city}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#B8A090',
                  marginBottom: '8px',
                  lineHeight: '1.5'
                }}>
                  {p.bio?.substring(0, 80)}...
                </div>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  fontSize: '12px',
                  color: '#B8A090'
                }}>
                  <span>★ {p.rating} ({p.review_count} avis)</span>
                  <span style={{ color: '#7A9E7E', fontWeight: '500' }}>
                    Disponible
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>
                <a
                  href="/reservation"
                  style={{
                    marginTop: '10px',
                    background: '#4A3728',
                    color: '#F5EFE6',
                    padding: '10px 16px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Réserver
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </main>
  )
}
