'use client'

import { useState } from 'react'
import { supabase } from '../supabase'

export default function InscriptionPraticien() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    display_name: '',
    email: '',
    password: '',
    specialty: '',
    bio: '',
    city: '',
    address: '',
    category: '',
    price: '',
    duration: '',
    phone: '',
    siret: ''
  })

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '14px',
    border: '1.5px solid #EDE0CF',
    background: '#FDFAF6',
    fontSize: '14px',
    color: '#4A3728',
    outline: 'none',
    fontFamily: 'Georgia, serif',
    marginBottom: '14px'
  }

  const labelStyle = {
    fontSize: '11px',
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.07em',
    color: '#8C6F5E',
    marginBottom: '6px',
    display: 'block'
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.display_name } }
      })

      if (authError) throw authError

      const { error: dbError } = await supabase
        .from('practitioners')
        .insert({
          user_id: authData.user?.id,
          display_name: form.display_name,
          specialty: form.specialty,
          bio: form.bio,
          city: form.city,
          address: form.address,
          siret: form.siret,
          is_active: true,
          is_verified: false
        })

      if (dbError) throw dbError

      setSuccess(true)
    } catch (error: any) {
      console.error(error)
      alert('ERREUR : '+ (error.message ||JSON.stringify(error)))
    }
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
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '300',
          color: '#4A3728',
          marginBottom: '12px'
        }}>
          Bienvenue sur Zenlya !
        </h1>
        <p style={{ color: '#8C6F5E', fontSize: '15px', marginBottom: '8px' }}>
          Ton profil praticien a été créé avec succès.
        </p>
        <p style={{ color: '#B8A090', fontSize: '13px', marginBottom: '32px' }}>
          Vérifie ton email pour confirmer ton compte.
        </p>
        <a href="/login" style={{
          background: '#4A3728',
          color: '#F5EFE6',
          padding: '14px 32px',
          borderRadius: '100px',
          textDecoration: 'none',
          fontSize: '14px'
        }}>
          Se connecter
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
      maxWidth: '560px',
      margin: '0 auto'
    }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <div style={{ fontSize: '22px', color: '#4A3728' }}>Zenlya</div>
        <div style={{ fontSize: '12px', color: '#B8A090' }}>
          Étape {step} / 3
        </div>
      </div>

      <h1 style={{
        fontSize: '32px',
        fontWeight: '300',
        color: '#4A3728',
        marginBottom: '8px'
      }}>
        Devenir praticien
      </h1>
      <p style={{ color: '#8C6F5E', fontSize: '14px', marginBottom: '32px' }}>
        Rejoins Zenlya et développe ta clientèle
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            flex: 1,
            height: '4px',
            borderRadius: '2px',
            background: s <= step ? '#4A3728' : '#EDE0CF',
            transition: 'background 0.3s'
          }} />
        ))}
      </div>

      {/* ÉTAPE 1 */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#4A3728', marginBottom: '20px' }}>
            Ton compte
          </h2>

          <label style={labelStyle}>Prénom et Nom</label>
          <input style={inputStyle} placeholder="Sophie Mercier"
            value={form.display_name} onChange={e => update('display_name', e.target.value)} />

          <label style={labelStyle}>Email professionnel</label>
          <input style={inputStyle} type="email" placeholder="sophie@email.com"
            value={form.email} onChange={e => update('email', e.target.value)} />

          <label style={labelStyle}>Téléphone</label>
          <input style={inputStyle} type="tel" placeholder="06 12 34 56 78"
            value={form.phone} onChange={e => update('phone', e.target.value)} />

          <label style={labelStyle}>Mot de passe</label>
          <input style={inputStyle} type="password" placeholder="Minimum 8 caractères"
            value={form.password} onChange={e => update('password', e.target.value)} />

          <button
            onClick={() => setStep(2)}
            disabled={!form.display_name || !form.email || !form.password}
            style={{
              width: '100%', padding: '16px',
              background: form.display_name && form.email && form.password ? '#4A3728' : '#D9C4AD',
              color: '#F5EFE6', border: 'none', borderRadius: '16px',
              fontSize: '15px', cursor: 'pointer', fontFamily: 'Georgia, serif', marginTop: '8px'
            }}
          >
            Continuer →
          </button>
        </div>
      )}

      {/* ÉTAPE 2 */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#4A3728', marginBottom: '20px' }}>
            Ton profil professionnel
          </h2>

          <label style={labelStyle}>Spécialité principale</label>
          <input style={inputStyle} placeholder="Ex: Massage Suédois, Yoga Yin..."
            value={form.specialty} onChange={e => update('specialty', e.target.value)} />

          <label style={labelStyle}>Catégorie</label>
          <select style={{ ...inputStyle, appearance: 'none' as const }}
            value={form.category} onChange={e => update('category', e.target.value)}>
            <option value="">Choisir une catégorie</option>
            <option value="massage">Massage</option>
            <option value="yoga">Yoga & Méditation</option>
            <option value="naturo">Naturopathie</option>
            <option value="beaute">Beauté</option>
            <option value="osteo">Ostéopathie</option>
            <option value="sport">Coach & Sport</option>
            <option value="autre">Autre</option>
          </select>

          <label style={labelStyle}>Bio (présente-toi)</label>
          <textarea
            style={{ ...inputStyle, height: '120px', resize: 'none' as const, fontFamily: 'Georgia, serif' }}
            placeholder="Parle de ton parcours, ta philosophie, ton approche..."
            value={form.bio} onChange={e => update('bio', e.target.value)} />

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setStep(1)} style={{
              flex: 1, padding: '16px', background: 'transparent', color: '#4A3728',
              border: '1.5px solid #EDE0CF', borderRadius: '16px', fontSize: '14px',
              cursor: 'pointer', fontFamily: 'Georgia, serif'
            }}>← Retour</button>
            <button onClick={() => setStep(3)}
              disabled={!form.specialty || !form.category}
              style={{
                flex: 2, padding: '16px',
                background: form.specialty && form.category ? '#4A3728' : '#D9C4AD',
                color: '#F5EFE6', border: 'none', borderRadius: '16px',
                fontSize: '15px', cursor: 'pointer', fontFamily: 'Georgia, serif'
              }}>Continuer →</button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 */}
      {step === 3 && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#4A3728', marginBottom: '20px' }}>
            Ta localisation & infos pro
          </h2>

          <label style={labelStyle}>Ville</label>
          <input style={inputStyle} placeholder="Paris, Lyon, Marseille..."
            value={form.city} onChange={e => update('city', e.target.value)} />

          <label style={labelStyle}>Adresse complète</label>
          <input style={inputStyle} placeholder="12 rue de la Paix, Paris 11e"
            value={form.address} onChange={e => update('address', e.target.value)} />

          <label style={labelStyle}>Tarif par séance (€)</label>
          <input style={inputStyle} type="number" placeholder="75"
            value={form.price} onChange={e => update('price', e.target.value)} />

          <label style={labelStyle}>Durée d'une séance (minutes)</label>
          <input style={inputStyle} type="number" placeholder="60"
            value={form.duration} onChange={e => update('duration', e.target.value)} />

          <label style={labelStyle}>Numéro SIRET</label>
          <input style={inputStyle} placeholder="123 456 789 00012"
            maxLength={17}
            value={form.siret} onChange={e => update('siret', e.target.value)} />

          <div style={{
            background: '#FDFAF6', border: '1px solid #EDE0CF',
            borderRadius: '14px', padding: '16px', marginBottom: '16px',
            fontSize: '13px', color: '#8C6F5E', lineHeight: '1.6'
          }}>
            En rejoignant Zenlya, tu acceptes nos CGU. Zenlya prend une commission de 10% sur chaque réservation.
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setStep(2)} style={{
              flex: 1, padding: '16px', background: 'transparent', color: '#4A3728',
              border: '1.5px solid #EDE0CF', borderRadius: '16px', fontSize: '14px',
              cursor: 'pointer', fontFamily: 'Georgia, serif'
            }}>← Retour</button>
            <button onClick={handleSubmit}
              disabled={!form.city || !form.siret || loading}
              style={{
                flex: 2, padding: '16px',
                background: form.city && form.siret && !loading ? '#4A3728' : '#D9C4AD',
                color: '#F5EFE6', border: 'none', borderRadius: '16px',
                fontSize: '15px', cursor: 'pointer', fontFamily: 'Georgia, serif'
              }}>
              {loading ? 'Création...' : 'Créer mon profil →'}
            </button>
          </div>
        </div>
      )}

    </main>
  )
}
