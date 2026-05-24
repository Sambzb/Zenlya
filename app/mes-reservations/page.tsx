'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

export default function MesReservations() {
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchReservations = async () => {
      const { data: userData } = await supabase.auth.getUser()
      setUser(userData.user)

      if (userData.user) {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', userData.user.id)
          .order('starts_at', { ascending: false })

        if (!error && data) setReservations(data)
      }
      setLoading(false)
    }

    fetchReservations()
  }, [])

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`
  }

  const formatHeure = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const getStatus = (status: string) => {
    switch(status) {
      case 'confirmed': return { label: 'Confirmé', color: '#7A9E7E', bg: '#EEF4EE' }
      case 'pending':   return { label: 'En attente', color: '#C49A3C', bg: '#FBF5E8' }
      case 'cancelled': return { label: 'Annulé', color: '#C0614A', bg: '#FBF0EE' }
      default: return { label: 'Terminé', color: '#B8A090', bg: '#EDE0CF' }
    }
  }

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
        <div style={{ fontSize: '22px', color: '#4A3728' }}>Zenlya</div>
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
        marginBottom: '8px'
      }}>
        Mes réservations
      </h1>
      <p style={{ color: '#8C6F5E', fontSize: '14px', marginBottom: '32px' }}>
        {user?.email}
      </p>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#B8A090' }}>
          Chargement...
        </div>
      )}

      {/* Aucune réservation */}
      {!loading && reservations.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 24px',
          background: '#FDFAF6',
          borderRadius: '20px',
          border: '1px solid #EDE0CF'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📅</div>
          <div style={{
            fontSize: '20px',
            fontWeight: '300',
            color: '#4A3728',
            marginBottom: '8px'
          }}>
            Aucune réservation
          </div>
          <p style={{ color: '#8C6F5E', fontSize: '14px', marginBottom: '24px' }}>
            Tu n'as pas encore réservé de séance
          </p>
          <a href="/explorer" style={{
            background: '#4A3728',
            color: '#F5EFE6',
            padding: '12px 28px',
            borderRadius: '100px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Explorer les praticiens
          </a>
        </div>
      )}

      {/* Liste des réservations */}
      {!loading && reservations.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {reservations.map((rdv) => {
            const status = getStatus(rdv.status)
            return (
              <div key={rdv.id} style={{
                background: '#FDFAF6',
                borderRadius: '20px',
                border: '1px solid #EDE0CF',
                overflow: 'hidden'
              }}>
                {/* Top */}
                <div style={{
                  background: '#4A3728',
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#F5EFE6',
                      marginBottom: '2px'
                    }}>
                      {rdv.client_notes || 'Séance bien-être'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#B8A090' }}>
                      {formatDate(rdv.starts_at)} · {formatHeure(rdv.starts_at)}
                    </div>
                  </div>
                  <div style={{
                    background: status.bg,
                    color: status.color,
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    {status.label}
                  </div>
                </div>

                {/* Bottom */}
                <div style={{
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '13px', color: '#8C6F5E' }}>
                    Durée : 60 min
                  </div>
                  <div style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '22px',
                    color: '#4A3728'
                  }}>
                    {(rdv.amount_cents / 100).toFixed(0)} €
                  </div>
                </div>
              </div>
            )
          })}

          {/* Total */}
          <div style={{
            background: '#4A3728',
            borderRadius: '16px',
            padding: '18px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#F5EFE6',
            marginTop: '8px'
          }}>
            <div style={{ fontSize: '14px', opacity: 0.7 }}>
              Total dépensé
            </div>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px'
            }}>
              {(reservations.reduce((acc, r) => acc + r.amount_cents, 0) / 100).toFixed(0)} €
            </div>
          </div>
        </div>
      )}

      {/* Bouton nouvelle réservation */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <a href="/explorer" style={{
          background: 'transparent',
          border: '1.5px solid #EDE0CF',
          color: '#8C6F5E',
          padding: '12px 28px',
          borderRadius: '100px',
          textDecoration: 'none',
          fontSize: '13px'
        }}>
          + Nouvelle réservation
        </a>
      </div>

    </main>
  )
}