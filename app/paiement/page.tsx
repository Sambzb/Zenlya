'use client'

import { useState } from 'react'
import { supabase } from '../supabase'

export default function Paiement() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')

  const formatCard = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 16)
    return v.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 4)
    if (v.length >= 2) return v.slice(0, 2) + ' / ' + v.slice(2)
    return v
  }

  const handlePay = async () => {
    if (!cardNumber || !expiry || !cvv || !name) {
      alert('Remplis tous les champs')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
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
        <div style={{ fontSize: '56px', marginBottom: '24px' }}>✓</div>
        <h1 style={{
          fontSize: '32px', fontWeight: '300',
          color: '#4A3728', marginBottom: '12px'
        }}>
          Paiement accepté !
        </h1>
        <p style={{ color: '#8C6F5E', fontSize: '15px', marginBottom: '8px' }}>
          Sophie Mercier · Massage Suédois
        </p>
        <p style={{ color: '#8C6F5E', fontSize: '15px', marginBottom: '8px' }}>
          75,00 € débités avec succès
        </p>
        <p style={{ color: '#B8A090', fontSize: '13px', marginBottom: '32px' }}>
          Un reçu a été envoyé par email
        </p>
        <a href="/mes-reservations" style={{
          background: '#4A3728', color: '#F5EFE6',
          padding: '14px 32px', borderRadius: '100px',
          textDecoration: 'none', fontSize: '14px',
          display: 'block', marginBottom: '12px'
        }}>
          Voir mes réservations
        </a>
        <a href="/dashboard" style={{
          color: '#8C6F5E', fontSize: '13px', textDecoration: 'none'
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
      padding: '40px 24px',
      maxWidth: '480px',
      margin: '0 auto'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '32px'
      }}>
        <div style={{ fontSize: '22px', color: '#4A3728' }}>Zenlya</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', color: '#7A9E7E',
          background: '#EEF4EE', padding: '6px 12px',
          borderRadius: '100px'
        }}>
          🔒 Paiement sécurisé
        </div>
      </div>

      {/* Récap */}
      <div style={{
        background: '#4A3728', borderRadius: '20px',
        padding: '22px', marginBottom: '28px', color: '#F5EFE6'
      }}>
        <div style={{
          fontSize: '11px', opacity: 0.6, marginBottom: '8px',
          textTransform: 'uppercase', letterSpacing: '0.1em'
        }}>
          Récapitulatif
        </div>
        <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
          Sophie Mercier — Massage Suédois
        </div>
        <div style={{ fontSize: '13px', opacity: 0.7, marginBottom: '16px' }}>
          60 min · Paris 11e
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '14px'
        }}>
          <span style={{ fontSize: '13px', opacity: 0.7 }}>Total</span>
          <span style={{
            fontFamily: 'Georgia, serif',
            fontSize: '26px'
          }}>
            75,00 €
          </span>
        </div>
      </div>

      <h2 style={{
        fontSize: '20px', fontWeight: '300',
        color: '#4A3728', marginBottom: '20px'
      }}>
        Carte bancaire
      </h2>

      {/* Formulaire */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

        <div>
          <div style={{
            fontSize: '11px', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '0.07em',
            color: '#8C6F5E', marginBottom: '6px'
          }}>
            Nom sur la carte
          </div>
          <input
            type="text"
            placeholder="SOPHIE MERCIER"
            value={name}
            onChange={e => setName(e.target.value.toUpperCase())}
            style={{
              width: '100%', padding: '14px 16px',
              borderRadius: '14px', border: '1.5px solid #EDE0CF',
              background: '#FDFAF6', fontSize: '14px',
              color: '#4A3728', outline: 'none',
              fontFamily: 'Georgia, serif'
            }}
          />
        </div>

        <div>
          <div style={{
            fontSize: '11px', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '0.07em',
            color: '#8C6F5E', marginBottom: '6px'
          }}>
            Numéro de carte
          </div>
          <input
            type="tel"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={e => setCardNumber(formatCard(e.target.value))}
            maxLength={19}
            style={{
              width: '100%', padding: '14px 16px',
              borderRadius: '14px', border: '1.5px solid #EDE0CF',
              background: '#FDFAF6', fontSize: '14px',
              color: '#4A3728', outline: 'none',
              fontFamily: 'Georgia, serif', letterSpacing: '0.1em'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <div style={{
              fontSize: '11px', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '0.07em',
              color: '#8C6F5E', marginBottom: '6px'
            }}>
              Date d'expiration
            </div>
            <input
              type="tel"
              placeholder="MM / AA"
              value={expiry}
              onChange={e => setExpiry(formatExpiry(e.target.value))}
              maxLength={7}
              style={{
                width: '100%', padding: '14px 16px',
                borderRadius: '14px', border: '1.5px solid #EDE0CF',
                background: '#FDFAF6', fontSize: '14px',
                color: '#4A3728', outline: 'none',
                fontFamily: 'Georgia, serif'
              }}
            />
          </div>
          <div>
            <div style={{
              fontSize: '11px', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '0.07em',
              color: '#8C6F5E', marginBottom: '6px'
            }}>
              CVV
            </div>
            <input
              type="tel"
              placeholder="•••"
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              maxLength={3}
              style={{
                width: '100%', padding: '14px 16px',
                borderRadius: '14px', border: '1.5px solid #EDE0CF',
                background: '#FDFAF6', fontSize: '14px',
                color: '#4A3728', outline: 'none',
                fontFamily: 'Georgia, serif'
              }}
            />
          </div>
        </div>

        {/* Sécurité */}
        <div style={{
          background: '#EEF4EE', border: '1px solid rgba(122,158,126,0.25)',
          borderRadius: '12px', padding: '12px 16px',
          fontSize: '12px', color: '#7A9E7E'
        }}>
          🔒 Tes données sont chiffrées et sécurisées par Stripe
        </div>

        {/* Bouton payer */}
        <button
          onClick={handlePay}
          disabled={loading}
          style={{
            width: '100%', padding: '18px',
            background: loading ? '#D9C4AD' : '#4A3728',
            color: '#F5EFE6', border: 'none',
            borderRadius: '16px', fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Georgia, serif', marginTop: '8px'
          }}
        >
          {loading ? 'Traitement en cours...' : 'Payer 75,00 €'}
        </button>

        <p style={{
          textAlign: 'center', fontSize: '11px',
          color: '#B8A090', lineHeight: '1.6'
        }}>
          Annulation gratuite jusqu'à 24h avant la séance.<br/>
          En payant, tu acceptes les CGU de Zenlya.
        </p>

      </div>
    </main>
  )
}