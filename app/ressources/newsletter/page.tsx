import { buildMetadata } from '@/lib/seo/metadata'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata = buildMetadata({
  title: 'Newsletter La Teranga',
  description: 'Recevez 2 fois par mois destinations, conseils pratiques et coulisses de mes projets au Sénégal.',
  path: '/ressources/newsletter',
})

const TOPICS = [
  {
    title: 'Coulisses de mes voyages',
    description: 'Les lieux que je decouvre, les rencontres que je fais, les erreurs que j\'evite. Le vrai terrain, pas le filtre Instagram.',
  },
  {
    title: 'Bons plans exclusifs',
    description: 'Adresses testees, contacts de confiance, offres que je negocie pour mes lecteurs. Introuvable ailleurs.',
  },
  {
    title: 'Recits & inspirations',
    description: 'Des histoires courtes qui donnent envie de partir. Ou de revenir. Le Senegal raconte par quelqu\'un qui le vit.',
  },
]

export default function NewsletterPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="NEWSLETTER LA TERANGA"
          title="Ce que je garde pour mes lecteurs les plus fideles"
          subtitle="Des recits, des bons plans, des coulisses. Pas de spam. Jamais."
        />

        {/* Editorial intro */}
        <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              Pourquoi cette newsletter existe
            </h2>
            <div className="space-y-4 text-[15px] md:text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)' }}>
              <p>
                La Teranga, au Sénégal, ne se traduit pas. C&rsquo;est l&rsquo;art d&rsquo;accueillir, le geste qui dit
                &laquo; tu es ici chez toi &raquo;. Cette newsletter porte ce nom parce qu&rsquo;elle est pensée comme
                ça : un espace où je partage ce que je garde habituellement pour mes clients, mes proches, mes
                rendez-vous privés. Pas un canal de promotion, pas une séquence automatique qui tente de vendre
                quelque chose. Un dialogue lent, deux fois par mois, avec les voyageurs et les professionnels du
                tourisme qui suivent sérieusement mon travail sur le Sénégal et l&rsquo;Afrique de l&rsquo;Ouest.
              </p>
              <p>
                Concrètement, chaque édition contient trois blocs. Un récit court sur un lieu, une rencontre ou une
                observation faite sur le terrain, souvent inédite. Une adresse testée récemment : chambre d&rsquo;hôte,
                restaurant, guide, atelier d&rsquo;artisan, avec le contact direct et le prix réel en FCFA. Une
                recommandation plus stratégique pour celles et ceux qui préparent un projet, un voyage long, un
                retour aux sources, ou qui travaillent dans l&rsquo;hôtellerie et le tourisme institutionnel. J&rsquo;y
                intègre aussi, de temps en temps, des extraits de mes benchmarks et de mes audits digitaux.
              </p>
              <p>
                Je ne relaie pas ce que tout le monde dit déjà. Je n&rsquo;écris pas &laquo; les 10 plages secrètes
                du Sénégal &raquo;. Les plages secrètes ne le restent pas quand on en fait un listicle. Ce que je
                partage, c&rsquo;est une lecture continue du pays, au fil de mes voyages, de mes missions de conseil,
                de mes conversations avec les acteurs locaux. Une forme d&rsquo;abonnement à mon point de vue, si vous
                voulez. Beaucoup de lecteurs me disent qu&rsquo;ils gardent les éditions et s&rsquo;y réfèrent au
                moment de préparer leur séjour ou de lancer un projet.
              </p>
              <p>
                Vous pouvez vous désinscrire en un clic, à tout moment, et vos données ne sont jamais revendues.
                Cette liste m&rsquo;appartient, elle ne passe pas par un outil de tracking agressif. Si l&rsquo;écriture
                ne vous parle plus, vous partez. Si elle vous accompagne longtemps, tant mieux. C&rsquo;est exactement
                la relation que je cherche à construire.
              </p>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-24 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
                Ce que vous recevrez
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Chaque edition, c&apos;est un petit voyage
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TOPICS.map((topic, i) => (
                <div
                  key={topic.title}
                  className="rounded-2xl p-7 text-center"
                  style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.06)' }}
                >
                  <div
                    className="mb-4 flex items-center justify-center gap-3"
                    style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                  >
                    <span style={{ flex: 1, height: 1, backgroundColor: 'rgba(86,14,19,0.15)' }} />
                    <span style={{ fontSize: 22, fontWeight: 600, color: '#b8860b', lineHeight: 1 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ flex: 1, height: 1, backgroundColor: 'rgba(86,14,19,0.15)' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#560E13' }}>{topic.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequency promise */}
        <section className="py-16 px-5" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}
            >
              2x par mois. Jamais plus.
            </h2>
            <p className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(254,252,249,0.8)' }}>
              Je respecte votre boite mail comme je respecte mes voyageurs.
              Pas de sequences automatiques a rallonge. Pas de promotions deguisees.
            </p>
            <p className="text-sm" style={{ color: '#F6C961' }}>
              Desinscription en 1 clic. Toujours.
            </p>
          </div>
        </section>

        {/* Newsletter Form */}
        <section className="py-24 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
                Rejoignez nos premiers abonnes
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Inscrivez-vous maintenant
              </h2>
              <p className="text-sm" style={{ color: 'rgba(10,10,10,0.6)' }}>
                Gratuit. Sans engagement. Un email = une inscription.
              </p>
            </div>

            <NewsletterForm />

            <div className="flex flex-wrap items-center justify-center gap-3 mt-5 text-[10px] uppercase tracking-wider" style={{ color: '#0A0A0A', opacity: 0.45 }}>
              <span>RGPD</span>
              <span>·</span>
              <span>Pas de spam</span>
              <span>·</span>
              <span>Desinscription 1 clic</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
