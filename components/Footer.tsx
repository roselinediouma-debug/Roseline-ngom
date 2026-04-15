import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}>
      {/* Barre or */}
      <div className="h-1 w-full" style={{ backgroundColor: '#F6C961' }} />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Colonne 1 : Marque */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-3">Roseline Ngom</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Experte voyage Sénégal & Afrique de l'Ouest. Fondatrice de TripAfro.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://instagram.com/tripafro" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'rgba(246,201,97,0.2)', border: '1px solid rgba(246,201,97,0.3)' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Explorer */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-60">Explorer</h4>
            <ul className="flex flex-col gap-2 text-sm opacity-80">
              <li><Link href="/guide" className="hover:opacity-60 transition-opacity">Guide gratuit</Link></li>
              <li><Link href="/offres" className="hover:opacity-60 transition-opacity">Toutes les offres</Link></li>
              <li><Link href="/voyages" className="hover:opacity-60 transition-opacity">Voyages immersifs</Link></li>
              <li><Link href="/conseil" className="hover:opacity-60 transition-opacity">Conseil & RDV</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-60">Services</h4>
            <ul className="flex flex-col gap-2 text-sm opacity-80">
              <li><Link href="/voyages" className="hover:opacity-60 transition-opacity">Retour aux Sources</Link></li>
              <li><Link href="/voyages" className="hover:opacity-60 transition-opacity">Voyages sur mesure</Link></li>
              <li><Link href="/offres" className="hover:opacity-60 transition-opacity">Formations</Link></li>
              <li><Link href="/conseil" className="hover:opacity-60 transition-opacity">Accompagnement</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-60">Contact</h4>
            <ul className="flex flex-col gap-2 text-sm opacity-80">
              <li>
                <a
                  href="https://wa.me/33650329808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link href="/conseil" className="hover:opacity-60 transition-opacity">
                  Prendre RDV
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-60 transition-opacity">
                  Formulaire contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 text-xs opacity-40 flex flex-col md:flex-row justify-between gap-2"
          style={{ borderTop: '1px solid rgba(254,252,249,0.15)' }}>
          <span>© {new Date().getFullYear()} Roseline Ngom — TripAfro. Tous droits réservés.</span>
          <span>Fait avec passion au Sénégal 🌍</span>
        </div>
      </div>
    </footer>
  )
}
