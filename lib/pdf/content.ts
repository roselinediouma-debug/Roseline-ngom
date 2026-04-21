// Contenu éditable du Guide Sénégal, Roseline Ngom
// Ce fichier est la source de vérité. Modifie ici puis régénère le PDF :
//   npm run pdf:generate

export const GUIDE_META = {
  title: '10 expériences secrètes au Sénégal',
  subtitle: 'Le guide que seule une locale peut vous offrir',
  author: 'Roseline Ngom',
  authorTitle: 'Fondatrice TripAfro',
  version: '1.0',
  year: 2026,
}

export const GUIDE_INTRO = `Bienvenue,

Si vous avez ce guide entre les mains, c'est que vous cherchez autre chose qu'un voyage "touristique" au Sénégal. Vous voulez rencontrer mon pays tel qu'il est vraiment, chaleureux, surprenant, profond.

Pendant dix ans, j'ai emmené des voyageurs de toutes les horizons à la découverte de l'Afrique de l'Ouest. Et à chaque fois, ce sont les mêmes lieux, les mêmes moments, les mêmes rencontres qui transforment leur voyage.

Ces dix expériences sont celles que j'offre à mes amis quand ils viennent me voir. Elles ne figurent dans aucun Lonely Planet. Certaines demandent un peu d'organisation. Toutes valent largement le détour.

Bon voyage, et n'hésitez pas à m'écrire pour me raconter.

Roseline`

export type Experience = {
  number: number
  title: string
  region: string
  why: string
  how: string
  tip: string
  image: string // relative path to /public/images/senegal/...
}

export const EXPERIENCES: Experience[] = [
  {
    number: 1,
    title: 'Lac Rose au coucher du soleil',
    region: 'Dakar · 35 km nord',
    why: "Le Lac Retba prend ses teintes rose magenta à la fin de la saison sèche (février-avril) quand la salinité atteint son maximum. En fin de journée, la lumière rasante transforme l'eau en miroir mauve et les piroguiers ramassent leur dernière récolte de sel.",
    how: "Comptez 45 min de route depuis Dakar. Arrivée 1h avant le coucher du soleil. Entrée libre. Possibilité de dormir sur place au Chez Salim ou campement Le Trarza.",
    tip: "Évitez les heures touristiques (11h-15h). Venez vers 17h30 en mars et demandez à Mamadou, le piroguier du village peulh, de vous emmener sur l'eau, son histoire de famille sur le lac est un voyage à elle seule.",
    image: 'exp-01-lac-rose.jpg',
  },
  {
    number: 2,
    title: 'Marché aux pirogues de Mbour à l\'aube',
    region: 'Petite Côte',
    why: "À 6h du matin, les pirogues bariolées rentrent de la pêche nocturne et déchargent leur cargaison sur la plage. Des centaines de femmes-vendeuses négocient, trient, transportent. C'est un ballet vivant, authentique, à mille lieues des plages touristiques voisines.",
    how: "45 min depuis Saly. Parking gratuit en bord de plage. Aucun droit d'entrée. Arrivez entre 5h45 et 7h30, après c'est terminé.",
    tip: "Demandez à l'hôtel de prévoir un petit-déjeuner en thermos. Allez vers la partie nord du marché, moins fréquentée, et achetez un poisson frais que votre hébergement grillera au déjeuner. Environ 3€.",
    image: 'exp-02-mbour.jpg',
  },
  {
    number: 3,
    title: 'Île de Carabane en bolong',
    region: 'Casamance · Ziguinchor',
    why: "Ancien comptoir colonial posé à l'embouchure du fleuve Casamance, Carabane se rejoint uniquement en pirogue. Mangroves, village diola, ancienne église bretonne, fromagers immenses. Aucune voiture. Le temps s'étire.",
    how: "Départ du port d'Elinkine (1h30 depuis Ziguinchor). Pirogue collective 2 500 FCFA (4€), ou privée 20 000 FCFA. 2 nuits minimum pour apprécier.",
    tip: "Logez au Campement Badji Kunda chez Alassane, repas poisson-braisé en famille, guide locale comprise. Le mercredi, marché sur la plage. Emportez un chapeau : pas d'ombre sur l'île en milieu de journée.",
    image: 'exp-03-carabane.jpg',
  },
  {
    number: 4,
    title: "Gorée avec un historien local",
    region: 'Dakar · Île',
    why: "La Maison des Esclaves vu par Eloi Coly, ancien conservateur, ou son successeur, c'est un choc émotionnel très différent du tour classique. 30 min de ferry depuis Dakar, une île classée UNESCO où le temps s'est figé.",
    how: "Ferry depuis l'Embarcadère de Dakar, toutes les heures. 5 500 FCFA A/R (9€). Visite guidée de la Maison des Esclaves recommandée. Plusieurs maisons d'hôtes sur place.",
    tip: "Restez dormir une nuit. Le soir, l'île se vide et vous découvrez une Gorée intime, sans touristes. Dînez au Chevalier de Boufflers, terrasse vue mer, cuisine métissée.",
    image: 'exp-04-goree.jpg',
  },
  {
    number: 5,
    title: 'Campement villageois en pays Bassari',
    region: 'Kédougou · Sud-Est',
    why: "Les villages Bassari, Bedik et Peul au pied des collines de Kédougou sont inscrits au patrimoine de l'UNESCO. Architecture en paille, rituels d'initiation, masques sacrés. Une immersion hors du temps, très peu fréquentée.",
    how: "1h30 de vol Dakar-Kédougou (ou 12h de route). Campement d'Ibel (chez Alpha Diallo) ou Iwol. Guide obligatoire, environ 25€/jour. Éviter la saison des pluies (juillet-septembre).",
    tip: "Prévoyez des cahiers et crayons pour l'école du village, c'est beaucoup plus apprécié qu'un pourboire. Demandez à assister à une cérémonie de la lune, si la période s'y prête.",
    image: 'exp-05-bassari.jpg',
  },
  {
    number: 6,
    title: 'Delta du Saloum en pirogue traditionnelle',
    region: 'Saloum · Fadiouth',
    why: "500 km² de mangroves, bolongs, îles habitées par les Sérères. Pêche traditionnelle, villages sur pilotis, coquillages qui craquent sous les pieds à Fadiouth. Le couchant sur les palétuviers est inoubliable.",
    how: "Base idéale : Joal-Fadiouth ou Palmarin (3h de Dakar). Pirogue privée 25 000-40 000 FCFA (40-65€) la demi-journée. Guide local indispensable.",
    tip: "Dormez au campement Les Collines de Niassam à Palmarin, cases perchées dans les baobabs, observation d'hyènes au lever du jour. Le matin, partez en pirogue avec Baba vers les dunes de coquillages de Fadiouth.",
    image: 'exp-06-saloum.jpg',
  },
  {
    number: 7,
    title: "Saint-Louis de nuit à Guet Ndar",
    region: 'Saint-Louis',
    why: "Quand les touristes sont rentrés à l'hôtel, l'île coloniale et le village de pêcheurs Guet Ndar s'animent autrement. Les pirogues multicolores vides sur la plage, la ferveur des préparations de pêche, les joueurs de tama dans les ruelles. L'âme de Saint-Louis.",
    how: "Saint-Louis est à 4h de Dakar (270 km). Traverser le pont Faidherbe à pied vers 20h. Guet Ndar s'atteint par le pont Moustapha Malick Gaye.",
    tip: "Dînez à la Résidence (terrasse sur le fleuve), puis marche accompagnée jusqu'à Guet Ndar. Demandez à l'hôtel La Belle Époque ou La Résidence un guide de confiance : Ibrahima (06 XX XX XX XX) est mon contact local.",
    image: 'exp-07-saint-louis.jpg',
  },
  {
    number: 8,
    title: 'Safari Niokolo-Koba',
    region: 'Tambacounda',
    why: "Seul grand parc national du Sénégal (UNESCO), lions, hippopotames, chimpanzés (oui, au Sénégal), buffles, phacochères. Moins aseptisé que les grandes réserves kenyanes, plus confidentiel, plus sauvage.",
    how: "Saison sèche uniquement (novembre-juin). Base : campement de Simenti (dans le parc). 2-3 nuits recommandées. Entrée parc + véhicule 4x4 + guide : comptez 150-200€/jour.",
    tip: "Levez-vous à 5h30 pour la première sortie, c'est à ce moment qu'on voit les grands fauves. Et demandez à aller aux chutes de Gouiga si l'eau est haute : baignade dans un décor de rêve.",
    image: 'exp-08-niokolo.jpg',
  },
  {
    number: 9,
    title: 'Lutte sénégalaise à Pikine',
    region: 'Dakar · Banlieue',
    why: "La lutte avec frappe (Laamb) est LE sport national, plus populaire que le football. Les arènes de Pikine ou Guédiawaye le dimanche, c'est la vraie ferveur : tambours, gris-gris, transe. Expérience intense, 100% locale.",
    how: "Les combats importants ont lieu le dimanche après-midi, saison sèche. Billets 2 000-10 000 FCFA (3-16€). Allez-y accompagné d'un local, l'ambiance peut être dense pour un étranger.",
    tip: "Évitez les combats VIP (Abdou Lahat Wade Arena). Préférez les arènes populaires. Je recommande de contacter Moussa (guide sport), il vous trouve les dates et vous accompagne. À demander via WhatsApp.",
    image: 'exp-09-lutte.jpg',
  },
  {
    number: 10,
    title: 'Bivouac au désert de Lompoul',
    region: 'Nord · Kébémer',
    why: "18 km² de dunes orangées entre Dakar et Saint-Louis, un Sahara miniature inattendu, à 2h30 de la capitale. Les dunes atteignent 50 mètres. Nuit sous tente mauritanienne, silence total, ciel étoilé magistral.",
    how: "Base au Campement Écolodge de Lompoul (tentes berbères, salle de bains privée). 75€/nuit pension complète. Balade dromadaire inclusive, coucher de soleil sur les dunes.",
    tip: "Venez en décembre-janvier : nuits fraîches, étoiles filantes abondantes. Demandez le dîner au feu de bois avec les musiciens peulhs. Et levez-vous à 6h30 pour voir les dunes s'embraser au lever du soleil.",
    image: 'exp-10-lompoul.jpg',
  },
]

export const PREPARATION = {
  title: 'Préparer ton voyage',
  sections: [
    {
      heading: 'Visa',
      content: "Pas de visa nécessaire pour les ressortissants UE, Suisse, Canada (séjour < 90 jours). Passeport valide 6 mois après retour.",
    },
    {
      heading: 'Meilleure période',
      content: "Novembre à mai (saison sèche). Décembre-février : idéal, 25-30°C. Juillet-septembre : saison des pluies, chaleur moite, certaines pistes impraticables.",
    },
    {
      heading: 'Santé',
      content: "Vaccin fièvre jaune obligatoire. Traitement antipaludique recommandé (Malarone). Kit médical : antidiarrhéique, rehydratation, crème solaire haute protection.",
    },
    {
      heading: 'Argent',
      content: "Franc CFA. 1€ = 655 FCFA (taux fixe). DAB dans toutes les villes. Privilégiez les espèces en petites coupures. Cartes acceptées dans les hôtels et restaurants urbains uniquement.",
    },
    {
      heading: 'Transport',
      content: "Taxis ville : négocier avant. Longue distance : 7 places (taxi-brousse), bus Transport Massif, ou location 4x4 avec chauffeur (conseillé pour la Casamance et le Sud-Est).",
    },
    {
      heading: 'Sécurité',
      content: "Sénégal est l'un des pays les plus sûrs d'Afrique de l'Ouest. Précautions normales (valeurs dans coffre, éviter ostentation). Casamance : vérifier actualité avant départ.",
    },
    {
      heading: 'Budget moyen',
      content: "Backpacker 30-50€/jour · Confort 80-120€/jour · Premium 200€+/jour. Repas local 3-8€, restaurant touristique 15-25€.",
    },
    {
      heading: 'Langues',
      content: "Français (officiel), Wolof (90% parlé), Pular, Sérère, Diola, Mandingue. Apprendre 3 mots : Salamaleikum (bonjour), Djerejef (merci), Nanga def (comment vas-tu) change tout.",
    },
  ],
}

export const NEXT_STEPS = {
  title: 'Pour aller plus loin',
  intro: "Prêt à passer à l'étape suivante ? Voici comment je peux vous accompagner :",
  items: [
    {
      label: 'Guide Casamance',
      price: '29 €',
      description: 'Le PDF complet 60 pages pour un séjour unique en Basse-Casamance',
      url: 'https://www.roselinengom.com/offres',
    },
    {
      label: 'Le Sénégal en une semaine',
      price: '29 €',
      description: 'Itinéraire clé en main pour un séjour de 7 jours, jour par jour',
      url: 'https://www.roselinengom.com/offres',
    },
    {
      label: 'Session découverte 15 min',
      price: 'Gratuit',
      description: 'On valide votre projet ensemble par visio, RDV immédiat via Calendly',
      url: 'https://www.roselinengom.com/conseil',
    },
  ],
}
