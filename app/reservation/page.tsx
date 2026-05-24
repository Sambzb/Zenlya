'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const CRENEAUX = {
  matin: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  apresmidi: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
  soir: ['18:00', '18:30', '19:00', '19:30']
}

const COMPLETS = ['09:00', '14:30', '18:00']

export default function Reservation() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const firstDay = (new Date(today.getFullYear(), today.getMonth(), 1).getDay() + 6) % 7

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) return
    setLoading(true)

    try {
      const startsAt = new Date(
        today.getFullYear(),
        today.getMonth(),
        selectedDate,
        parseInt(selectedSlot.split(':')[0]),
        parseInt(selectedSlot.split(':')[1])
      )

      const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000)

      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user?.id,
          starts_at: startsAt.toISOString(),
          ends_at: endsAt.toISOString(),
          amount_cents: 7500,
          status: 'confirmed',
          client_notes: 'Massage Suédois · Sophie Mercier'
        })

      if (error) throw error
      setConfirmed(true)

    } catch (error: any) {
      console.error(error)
      alert('Erreur : ' + error.message)
    }

    setLoading(false)
  }

  if (confirmed) {
    return (
      <main style={{
        minHeight: '100vh',
        background: '#F5EFE6',
        fontFamily: 'Georgia, serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '300',
          color: '#4A3728',
          marginBottom: '12px'
        }}>
          Réservation confirmée !
        </h1>
        <p style={{ color: '#8C6F5E', fontSize: '15px', marginBottom: '8px' }}>
          Sophie Mercier · Massage Suédois
        </p>
        <p style={{ color: '#8C6F5E', fontSize: '15px', marginBottom: '32px' }}>
          {selectedDate} {MOIS[today.getMonth()]} · {selectedSlot}
        </p>
        <a href="/mes-reservations" style={{
          background: '#4A3728',
          color: '#F5EFE6',
          padding: '14px 32px',
          borderRadius: '100px',
          textDecoration: 'none',
          fontSize: '14px',
          marginBottom: '12px',
          display: 'block'
        }}>
          Voir mes réservations
        </a>
        <a href="/dashboard" style={{
          color: '#8C6F5E',
          fontSize: '13px',
          textDecoration: 'none'
        }}>
          Retour au Dashboard
        </a>
      </main>
    )
  }

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
        marginBottom: '32px'
      }}>
        <div style={{ fontSize: '22px', color: '#4A3728' }}>Zenlya</div>
        <a href="/explorer" style={{
          fontSize: '13px', color: '#8C6F5E', textDecoration: 'none'
        }}>
          ← Explorer
        </a>
      </div>

      <div style={{
        background: '#4A3728',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '28px',
        color: '#F5EFE6'
      }}>
        <div style={{
          fontSize: '11px', opacity: 0.6,
          marginBottom: '8px',
          textTransform: 'uppercase', letterSpacing: '0.1em'
        }}>
          Praticien
        </div>
        <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
          Sophie Mercier
        </div>
        <div style={{ fontSize: '13px', opacity: 0.7 }}>
          Massage Suédois · 60 min · 75 €
        </div>
      </div>

      <h2 style={{
        fontSize: '20px', fontWeight: '300',
        color: '#4A3728', marginBottom: '16px'
      }}>
        Choisir une date
      </h2>

      <div style={{
        background: '#FDFAF6',
        borderRadius: '20px',
        border: '1px solid #EDE0CF',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '700',
          color: '#4A3728',
          marginBottom: '16px'
        }}>
          {MOIS[today.getMonth()]} {today.getFullYear()}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px', marginBottom: '8px'
        }}>
          {JOURS.map(j => (
            <div key={j} style={{
              textAlign: 'center', fontSize: '11px',
              color: '#B8A090', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              {j}
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px'
        }}>
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const isPast = day < today.getDate()
            const isSelected = selectedDate === day
            const isToday = day === today.getDate()

            return (
              <div
                key={day}
                onClick={() => !isPast && setSelectedDate(day)}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  fontSize: '13px',
                  cursor: isPast ? 'not-allowed' : 'pointer',
                  background: isSelected ? '#4A3728' : isToday ? '#F2EBE1' : 'transparent',
                  color: isSelected ? '#F5EFE6' : isPast ? '#D9C4AD' : '#4A3728',
                  border: isToday && !isSelected ? '1.5px solid #8C6F5E' : '1.5px solid transparent',
                  fontWeight: isToday ? '600' : '400'
                }}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h2 style={{
            fontSize: '20px', fontWeight: '300',
            color: '#4A3728', marginBottom: '16px'
          }}>
            Choisir un créneau
          </h2>

          {Object.entries(CRENEAUX).map(([period, slots]) => (
            <div key={period} style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '11px', color: '#B8A090',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '10px', fontWeight: '700'
              }}>
                {period === 'matin' ? 'Matin' : period === 'apresmidi' ? 'Après-midi' : 'Soirée'}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px'
              }}>
                {slots.map(slot => {
                  const isBooked = COMPLETS.includes(slot)
                  const isSelected = selectedSlot === slot
                  return (
                    <div
                      key={slot}
                      onClick={() => !isBooked && setSelectedSlot(slot)}
                      style={{
                        padding: '10px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontSize: '13px',
                        cursor: isBooked ? 'not-allowed' : 'pointer',
                        background: isSelected ? '#4A3728' : isBooked ? '#EDE0CF' : '#FDFAF6',
                        color: isSelected ? '#F5EFE6' : isBooked ? '#B8A090' : '#4A3728',
                        border: '1.5px solid',
                        borderColor: isSelected ? '#4A3728' : '#EDE0CF',
                        textDecoration: isBooked ? 'line-through' : 'none'
                      }}
                    >
                      {slot}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {selectedSlot && (
            <button
              onClick={handleConfirm}
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading ? '#D9C4AD' : '#4A3728',
                color: '#F5EFE6',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Georgia, serif',
                marginTop: '8px'
              }}
            >
              {loading ? 'Enregistrement...' : `Confirmer · ${selectedDate} ${MOIS[today.getMonth()]} à ${selectedSlot}`}
            </button>
          )}
        </div>
      )}

    </main>
  )
}
