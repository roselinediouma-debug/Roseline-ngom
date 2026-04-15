'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        setError('Email ou mot de passe incorrect.')
      } else {
        router.push('/admin/dashboard')
      }
    } catch {
      setError('Erreur de connexion.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #560E13 0%, #0A0A0A 100%)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-3"
            style={{ backgroundColor: '#F6C961', color: '#560E13', fontFamily: 'var(--font-playfair)' }}>
            RN
          </div>
          <h1 className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>Back-office</h1>
          <p className="text-white opacity-50 text-sm mt-1">Roseline Ngom · Admin</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-60">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@roselinengom.com"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-[#560E13]"
              style={{ borderColor: '#e0d8d0' }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-60">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-[#560E13]"
              style={{ borderColor: '#e0d8d0' }}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-85 disabled:opacity-60"
            style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
