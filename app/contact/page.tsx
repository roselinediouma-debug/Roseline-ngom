'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', objet: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav variant="solid" />
      <main className="pt-28 pb-16 px-4 min-h-screen" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-3 text-center" style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}>
            Contactez-nous
          </h1>
          <p className="text-center text-sm opacity-60 mb-10">
            Une question, un projet, une collaboration ? Écrivez-nous.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: '💬', label: 'WhatsApp', sub: '+33 6 50 32 98 08', href: 'https://wa.me/33650329808' },
              { icon: '📅', label: 'RDV Calendly', sub: 'Session gratuite 15 min', href: 'https://calendly.com/roselinengom' },
              { icon: '📸', label: 'Instagram', sub: '@tripafro', href: 'https://instagram.com/tripafro' },
            ].map(({ icon, label, sub, href }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-4 text-center shadow-sm transition-transform hover:scale-[1.02]">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs opacity-50 mt-0.5">{sub}</div>
              </a>
            ))}
          </div>

          {sent ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="font-bold text-lg mb-2" style={{ color: '#560E13' }}>Message envoyé !</h2>
              <p className="text-sm opacity-60">Je vous réponds sous 48h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Nom</label>
                  <input name="nom" value={form.nom} onChange={handleChange} required placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#e0d8d0' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#e0d8d0' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Objet</label>
                <select name="objet" value={form.objet} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#e0d8d0' }}>
                  <option value="">Sélectionner...</option>
                  <option value="voyage">Question sur un voyage</option>
                  <option value="conseil">Demande de conseil</option>
                  <option value="partenariat">Partenariat / Collaboration</option>
                  <option value="presse">Presse / Média</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Votre message..."
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: '#e0d8d0' }} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}>
                {loading ? 'Envoi...' : '✉️ Envoyer le message'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
