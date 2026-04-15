import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer'
import {
  GUIDE_META,
  GUIDE_INTRO,
  EXPERIENCES,
  PREPARATION,
  NEXT_STEPS,
  type Experience,
} from './content'

// ============================================================================
// TYPOGRAPHIE
// ============================================================================
// On utilise les polices intégrées au PDF (PostScript) :
//   Helvetica    — pour le corps (sans-serif lisible)
//   Times-Roman  — pour les titres (serif élégant qui évoque le livre premium)
// Aucune requête réseau, aucune dépendance externe — rendu 100% fiable.
// Rebinding : le reste du code utilise fontFamily: 'Inter' et 'Playfair'
// pour plus de lisibilité, mais ces aliases pointent vers les fonts intégrées.

Font.register({ family: 'Inter', fonts: [{ src: 'Helvetica' }] })
Font.register({
  family: 'Inter-Bold',
  fonts: [{ src: 'Helvetica-Bold' }],
})
Font.register({
  family: 'Playfair',
  fonts: [
    { src: 'Times-Roman', fontWeight: 400 },
    { src: 'Times-Bold', fontWeight: 700 },
  ],
})

// Désactive l'hyphénation automatique (réglage plus propre pour un guide)
Font.registerHyphenationCallback((word) => [word])

// ============================================================================
// CHARTE GRAPHIQUE
// ============================================================================
const COLORS = {
  bordeaux: '#560E13',
  or: '#F6C961',
  creme: '#F8F5F0',
  blanc: '#FEFCF9',
  noir: '#0A0A0A',
  gris: '#6b6b6b',
  grisClair: '#e0d8d0',
}

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  // ---- Pages de base ----
  page: {
    backgroundColor: COLORS.blanc,
    fontFamily: 'Inter',
    fontSize: 11,
    color: COLORS.noir,
    padding: 0,
  },

  // ---- Footer universel ----
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 8,
    color: COLORS.gris,
    borderTopWidth: 1,
    borderTopColor: COLORS.grisClair,
    paddingTop: 8,
  },
  footerBrand: {
    fontFamily: 'Playfair',
    color: COLORS.bordeaux,
    fontWeight: 700,
  },

  // ============================================================================
  // COVER
  // ============================================================================
  coverBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.bordeaux,
  },
  coverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.55,
  },
  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(86, 14, 19, 0.4)',
  },
  coverContent: {
    position: 'absolute',
    top: 80,
    left: 50,
    right: 50,
    bottom: 80,
    justifyContent: 'space-between',
    color: COLORS.blanc,
  },
  coverTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coverGoldPill: {
    backgroundColor: COLORS.or,
    color: COLORS.bordeaux,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 2,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1.5,
    fontFamily: 'Inter',
  },
  coverTitle: {
    fontFamily: 'Playfair',
    fontSize: 44,
    fontWeight: 700,
    lineHeight: 1.1,
    color: COLORS.blanc,
    marginBottom: 16,
  },
  coverSubtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.or,
    lineHeight: 1.4,
    marginBottom: 28,
  },
  coverAccentLine: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.or,
    marginBottom: 24,
  },
  coverAuthor: {
    fontFamily: 'Playfair',
    fontSize: 18,
    color: COLORS.blanc,
    fontWeight: 700,
  },
  coverAuthorTitle: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: COLORS.or,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 4,
  },

  // ============================================================================
  // PAGE STANDARD
  // ============================================================================
  stdPage: {
    paddingTop: 60,
    paddingHorizontal: 50,
    paddingBottom: 60,
    backgroundColor: COLORS.blanc,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  pageHeaderBrand: {
    fontFamily: 'Playfair',
    fontSize: 11,
    color: COLORS.bordeaux,
    fontWeight: 700,
  },
  pageHeaderOrnament: {
    width: 30,
    height: 1.5,
    backgroundColor: COLORS.or,
  },

  sectionTitle: {
    fontFamily: 'Playfair',
    fontSize: 28,
    color: COLORS.bordeaux,
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: 8,
  },
  sectionKicker: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: COLORS.or,
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: 8,
  },
  sectionAccentLine: {
    width: 50,
    height: 2,
    backgroundColor: COLORS.or,
    marginBottom: 20,
  },

  // ============================================================================
  // WELCOME
  // ============================================================================
  welcomeBody: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 1.7,
    color: COLORS.noir,
  },
  welcomeParagraph: {
    marginBottom: 14,
  },
  welcomeSignature: {
    marginTop: 30,
    fontFamily: 'Playfair',
    fontSize: 20,
    color: COLORS.bordeaux,
    fontWeight: 700,
  },
  welcomeSignatureSubtext: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: COLORS.gris,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 3,
  },

  // ============================================================================
  // SOMMAIRE
  // ============================================================================
  tocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grisClair,
  },
  tocNumber: {
    fontFamily: 'Playfair',
    fontSize: 18,
    color: COLORS.or,
    fontWeight: 700,
    width: 30,
  },
  tocTitle: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 11,
    color: COLORS.noir,
    fontWeight: 500,
  },
  tocRegion: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: COLORS.gris,
    marginRight: 12,
  },
  tocPage: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: COLORS.bordeaux,
    fontWeight: 700,
    width: 24,
    textAlign: 'right',
  },

  // ============================================================================
  // EXPÉRIENCE
  // ============================================================================
  expHeroImage: {
    width: '100%',
    height: 220,
    objectFit: 'cover',
  },
  expHeroPlaceholder: {
    width: '100%',
    height: 220,
    backgroundColor: COLORS.bordeaux,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expHeroPlaceholderText: {
    fontFamily: 'Playfair',
    fontSize: 56,
    color: 'rgba(246,201,97,0.35)',
    fontWeight: 700,
  },
  expBody: {
    paddingHorizontal: 50,
    paddingTop: 30,
  },
  expNumberBadge: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: COLORS.or,
    letterSpacing: 4,
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: 6,
  },
  expTitle: {
    fontFamily: 'Playfair',
    fontSize: 24,
    color: COLORS.bordeaux,
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 4,
  },
  expRegion: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: COLORS.gris,
    marginBottom: 16,
  },
  expWhy: {
    fontFamily: 'Inter',
    fontSize: 11,
    lineHeight: 1.65,
    color: COLORS.noir,
    marginBottom: 16,
  },
  expInfoBox: {
    backgroundColor: COLORS.creme,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.or,
    padding: 12,
    marginBottom: 14,
  },
  expInfoLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: COLORS.bordeaux,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: 4,
  },
  expInfoText: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.55,
    color: COLORS.noir,
  },
  expTipBox: {
    backgroundColor: COLORS.bordeaux,
    padding: 14,
    borderRadius: 2,
  },
  expTipLabel: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: COLORS.or,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: 5,
  },
  expTipText: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.55,
    color: COLORS.blanc,
  },

  // ============================================================================
  // PRÉPARATION
  // ============================================================================
  prepGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  prepCard: {
    width: '48%',
    padding: 12,
    backgroundColor: COLORS.creme,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.or,
    marginBottom: 8,
  },
  prepHeading: {
    fontFamily: 'Playfair',
    fontSize: 13,
    color: COLORS.bordeaux,
    fontWeight: 700,
    marginBottom: 6,
  },
  prepContent: {
    fontFamily: 'Inter',
    fontSize: 9,
    lineHeight: 1.5,
    color: COLORS.noir,
  },

  // ============================================================================
  // NEXT STEPS
  // ============================================================================
  nextIntro: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 1.6,
    color: COLORS.noir,
    marginBottom: 24,
  },
  nextCard: {
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.grisClair,
    backgroundColor: COLORS.blanc,
  },
  nextCardHighlight: {
    padding: 18,
    marginBottom: 14,
    backgroundColor: COLORS.bordeaux,
  },
  nextCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  nextCardTitle: {
    fontFamily: 'Playfair',
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.bordeaux,
  },
  nextCardTitleHighlight: {
    fontFamily: 'Playfair',
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.blanc,
  },
  nextCardPrice: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: 700,
    color: COLORS.or,
  },
  nextCardDescription: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.5,
    color: COLORS.noir,
    marginBottom: 8,
  },
  nextCardDescriptionHighlight: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.5,
    color: COLORS.creme,
    marginBottom: 8,
  },
  nextCardUrl: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: COLORS.bordeaux,
    textDecoration: 'none',
  },
  nextCardUrlHighlight: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: COLORS.or,
    textDecoration: 'none',
  },
  finalCTA: {
    marginTop: 30,
    padding: 20,
    backgroundColor: COLORS.or,
    textAlign: 'center',
  },
  finalCTATitle: {
    fontFamily: 'Playfair',
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.bordeaux,
    marginBottom: 4,
    textAlign: 'center',
  },
  finalCTAText: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: COLORS.bordeaux,
    textAlign: 'center',
  },
})

// ============================================================================
// HELPERS
// ============================================================================

function PageFooter({ pageNumber }: { pageNumber: number }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerBrand}>
        Roseline Ngom · TripAfro
      </Text>
      <Text>{`www.roselinengom.com`}</Text>
      <Text>{String(pageNumber).padStart(2, '0')}</Text>
    </View>
  )
}

function PageHeader() {
  return (
    <View style={styles.pageHeader}>
      <Text style={styles.pageHeaderBrand}>Guide Sénégal · Par Roseline</Text>
      <View style={styles.pageHeaderOrnament} />
    </View>
  )
}

// Fallback élégant quand l'image de l'expérience n'est pas (encore) fournie
function ExperienceHero({ exp, imageExists }: { exp: Experience; imageExists: boolean }) {
  if (imageExists) {
    return (
      <Image
        src={`./public/images/senegal/${exp.image}`}
        style={styles.expHeroImage}
      />
    )
  }
  return (
    <View style={styles.expHeroPlaceholder}>
      <Text style={styles.expHeroPlaceholderText}>{`0${exp.number}`.slice(-2)}</Text>
    </View>
  )
}

// ============================================================================
// DOCUMENT
// ============================================================================

export type GuideOptions = {
  // Permet de dire si chaque image existe physiquement (chargé en amont par le script)
  availableImages: Set<string>
  // Image de la cover, optionnelle
  coverImageExists: boolean
}

export function GuideSenegal({ availableImages, coverImageExists }: GuideOptions) {
  // Expected image path convention : public/images/senegal/cover.jpg + exp-XX-*.jpg
  const expPageOffset = 4 // pages 4-13 (après cover + welcome + toc)

  return (
    <Document
      title={GUIDE_META.title}
      author={GUIDE_META.author}
      subject="Guide voyage Sénégal offert par Roseline Ngom"
      keywords="Sénégal, voyage, Casamance, Afrique de l'Ouest, TripAfro"
    >
      {/* ═══════════════ PAGE 1 : COVER ═══════════════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverBg} />
        {coverImageExists && (
          <Image
            src="./public/images/senegal/cover.jpg"
            style={styles.coverImage}
          />
        )}
        <View style={styles.coverOverlay} />
        <View style={styles.coverContent}>
          <View style={styles.coverTopBar}>
            <Text style={styles.coverGoldPill}>GUIDE OFFERT · 2026</Text>
          </View>

          <View>
            <View style={styles.coverAccentLine} />
            <Text style={styles.coverTitle}>{GUIDE_META.title}</Text>
            <Text style={styles.coverSubtitle}>{GUIDE_META.subtitle}</Text>
          </View>

          <View>
            <Text style={styles.coverAuthor}>{GUIDE_META.author}</Text>
            <Text style={styles.coverAuthorTitle}>{GUIDE_META.authorTitle}</Text>
          </View>
        </View>
      </Page>

      {/* ═══════════════ PAGE 2 : MOT DE BIENVENUE ═══════════════ */}
      <Page size="A4" style={[styles.page, styles.stdPage]}>
        <PageHeader />
        <Text style={styles.sectionKicker}>Un mot pour commencer</Text>
        <Text style={styles.sectionTitle}>Bienvenue</Text>
        <View style={styles.sectionAccentLine} />

        <View style={styles.welcomeBody}>
          {GUIDE_INTRO.split('\n\n').map((para, i) => (
            <Text key={i} style={styles.welcomeParagraph}>
              {para}
            </Text>
          ))}
        </View>

        <Text style={styles.welcomeSignature}>Roseline</Text>
        <Text style={styles.welcomeSignatureSubtext}>Fondatrice TripAfro</Text>
        <PageFooter pageNumber={2} />
      </Page>

      {/* ═══════════════ PAGE 3 : SOMMAIRE ═══════════════ */}
      <Page size="A4" style={[styles.page, styles.stdPage]}>
        <PageHeader />
        <Text style={styles.sectionKicker}>Sommaire</Text>
        <Text style={styles.sectionTitle}>Les 10 expériences</Text>
        <View style={styles.sectionAccentLine} />

        <View>
          {EXPERIENCES.map((exp) => (
            <View key={exp.number} style={styles.tocRow}>
              <Text style={styles.tocNumber}>{`0${exp.number}`.slice(-2)}</Text>
              <Text style={styles.tocTitle}>{exp.title}</Text>
              <Text style={styles.tocRegion}>{exp.region}</Text>
              <Text style={styles.tocPage}>p. {expPageOffset - 1 + exp.number}</Text>
            </View>
          ))}
          <View style={[styles.tocRow, { marginTop: 18 }]}>
            <Text style={styles.tocNumber}>★</Text>
            <Text style={styles.tocTitle}>Préparer ton voyage (visa, budget, santé)</Text>
            <Text style={styles.tocPage}>p. {expPageOffset + EXPERIENCES.length}</Text>
          </View>
          <View style={styles.tocRow}>
            <Text style={styles.tocNumber}>→</Text>
            <Text style={styles.tocTitle}>Pour aller plus loin</Text>
            <Text style={styles.tocPage}>p. {expPageOffset + EXPERIENCES.length + 1}</Text>
          </View>
        </View>

        <PageFooter pageNumber={3} />
      </Page>

      {/* ═══════════════ PAGES 4-13 : LES 10 EXPÉRIENCES ═══════════════ */}
      {EXPERIENCES.map((exp, idx) => {
        const imageExists = availableImages.has(exp.image)
        return (
          <Page key={exp.number} size="A4" style={styles.page}>
            <ExperienceHero exp={exp} imageExists={imageExists} />

            <View style={styles.expBody}>
              <Text style={styles.expNumberBadge}>
                {`Expérience ${String(exp.number).padStart(2, '0')} sur 10`}
              </Text>
              <Text style={styles.expTitle}>{exp.title}</Text>
              <Text style={styles.expRegion}>{exp.region}</Text>

              <Text style={styles.expWhy}>{exp.why}</Text>

              <View style={styles.expInfoBox}>
                <Text style={styles.expInfoLabel}>Comment y aller · Budget · Période</Text>
                <Text style={styles.expInfoText}>{exp.how}</Text>
              </View>

              <View style={styles.expTipBox}>
                <Text style={styles.expTipLabel}>💡 Le conseil de Roseline</Text>
                <Text style={styles.expTipText}>{exp.tip}</Text>
              </View>
            </View>

            <PageFooter pageNumber={expPageOffset + idx} />
          </Page>
        )
      })}

      {/* ═══════════════ PAGE 14 : PRÉPARATION ═══════════════ */}
      <Page size="A4" style={[styles.page, styles.stdPage]}>
        <PageHeader />
        <Text style={styles.sectionKicker}>Pratique</Text>
        <Text style={styles.sectionTitle}>{PREPARATION.title}</Text>
        <View style={styles.sectionAccentLine} />

        <View style={styles.prepGrid}>
          {PREPARATION.sections.map((section) => (
            <View key={section.heading} style={styles.prepCard}>
              <Text style={styles.prepHeading}>{section.heading}</Text>
              <Text style={styles.prepContent}>{section.content}</Text>
            </View>
          ))}
        </View>

        <PageFooter pageNumber={expPageOffset + EXPERIENCES.length} />
      </Page>

      {/* ═══════════════ PAGE 15 : POUR ALLER PLUS LOIN ═══════════════ */}
      <Page size="A4" style={[styles.page, styles.stdPage]}>
        <PageHeader />
        <Text style={styles.sectionKicker}>Et maintenant ?</Text>
        <Text style={styles.sectionTitle}>{NEXT_STEPS.title}</Text>
        <View style={styles.sectionAccentLine} />

        <Text style={styles.nextIntro}>{NEXT_STEPS.intro}</Text>

        {NEXT_STEPS.items.map((item, i) => {
          const isLast = i === NEXT_STEPS.items.length - 1
          return (
            <View key={item.label} style={isLast ? styles.nextCardHighlight : styles.nextCard}>
              <View style={styles.nextCardHeader}>
                <Text style={isLast ? styles.nextCardTitleHighlight : styles.nextCardTitle}>
                  {item.label}
                </Text>
                <Text style={styles.nextCardPrice}>{item.price}</Text>
              </View>
              <Text style={isLast ? styles.nextCardDescriptionHighlight : styles.nextCardDescription}>
                {item.description}
              </Text>
              <Text style={isLast ? styles.nextCardUrlHighlight : styles.nextCardUrl}>
                → {item.url}
              </Text>
            </View>
          )
        })}

        <View style={styles.finalCTA}>
          <Text style={styles.finalCTATitle}>Bon voyage au Sénégal ✦</Text>
          <Text style={styles.finalCTAText}>
            Et n&apos;hésitez pas à m&apos;écrire — j&apos;adore avoir des nouvelles de vos périples.
          </Text>
        </View>

        <PageFooter pageNumber={expPageOffset + EXPERIENCES.length + 1} />
      </Page>
    </Document>
  )
}
