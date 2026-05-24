'use client'

import { supabase } from '../supabase'

async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/dashboard'
    }
  })
}

export default function Login() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#F5EFE6',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '24px'
    }}>

      <h1 style={{
        fontSize: '36px',
        fontWeight: '300',
        color: '#4A3728',
        marginBottom: '0px'
      }}>
        Bon retour
      </h1>

      <p style={{ color: '#8C6F5E', fontSize: '15px', marginTop: '0' }}>
        Connecte-toi à ton espace Zenlya
      </p>

      <button
        onClick={signInWithGoogle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'white',
          border: '1.5px solid #EDE0CF',
          borderRadius: '14px',
          padding: '14px 28px',
          fontSize: '14px',
          color: '#4A3728',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '360px',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif'
        }}>
        <span style={{ fontSize: '20px' }}>G</span>
        Continuer avec Google
      </button>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        maxWidth: '360px'
      }}>
        <div style={{ flex: 1, height: '1px', background: '#EDE0CF' }}/>
        <span style={{ color: '#B8A090', fontSize: '12px' }}>ou</span>
        <div style={{ flex: 1, height: '1px', background: '#EDE0CF' }}/>
      </div>

      <input
        type="email"
        placeholder="ton@email.com"
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '14px 16px',
          borderRadius: '14px',
          border: '1.5px solid #EDE0CF',
          background: '#FDFAF6',
          fontSize: '14px',
          color: '#4A3728',
          outline: 'none',
          fontFamily: 'Georgia, serif'
        }}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '14px 16px',
          borderRadius: '14px',
          border: '1.5px solid #EDE0CF',
          background: '#FDFAF6',
          fontSize: '14px',
          color: '#4A3728',
          outline: 'none',
          fontFamily: 'Georgia, serif',
          marginTop: '-12px'
        }}
      />

      <button style={{
        width: '100%',
        maxWidth: '360px',
        padding: '16px',
        background: '#4A3728',
        color: '#F5EFE6',
        border: 'none',
        borderRadius: '14px',
        fontSize: '15px',
        cursor: 'pointer',
        fontFamily: 'Georgia, serif'
      }}>
        Se connecter →
      </button>

      <p style={{ color: '#B8A090', fontSize: '13px' }}>
        Pas encore de compte ?{' '}
        <span style={{ color: '#8C6F5E', cursor: 'pointer' }}>
          Créer un compte
        </span>
      </p>

    </main>
  )
}
