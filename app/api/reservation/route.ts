import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { createBrevoContact } from '@/lib/brevo'
import { notifyAdmin } from '@/lib/notifications'

/**
 * Réservation voyage — pages /voyages/retour-aux-sources et /voyages/voyage-signature.
 * Insert dans public.reservations, sync Brevo, notifie admin (email + Telegram).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      prenom,
      nom,
      email,
      whatsapp,
      typeVoyage,          // 'retour_aux_sources' | 'voyage_signature'
      departSouhaite,
      nbAdultes,
      nbEnfants,
      nbBebes,
      villeResidence,
      duree,
      periode,
      budget,
      confort,
      message,
    } = body

    if (!email || !prenom || !nom || !typeVoyage) {
      return NextResponse.json(
        { error: 'Prénom, nom, email et typeVoyage requis' },
        { status: 400 }
      )
    }

    // Insert réservation
    let reservationId: string | null = null
    let leadId: string | null = null
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServiceClient()

        // Upsert lead
        const offreInteret = typeVoyage === 'voyage_signature' ? 'voyage_signature' : 'retour_aux_sources'
        const { data: lead } = await supabase
          .from('leads')
          .upsert(
            {
              email,
              nom: `${prenom} ${nom}`.trim(),
              whatsapp: whatsapp || null,
              ville: villeResidence || null,
              offre_interet: offreInteret,
              source: 'formulaire_voyage',
              statut: 'nouveau',
            },
            { onConflict: 'email' }
          )
          .select('id')
          .single()
        leadId = lead?.id || null

        const { data: resa } = await supabase
          .from('reservations')
          .insert({
            lead_id: leadId,
            prenom,
            nom,
            email,
            whatsapp: whatsapp || null,
            type_voyage: typeVoyage,
            depart_souhaite: departSouhaite || periode || null,
            nb_adultes: nbAdultes ? parseInt(String(nbAdultes)) : 1,
            nb_enfants: nbEnfants ? parseInt(String(nbEnfants)) : 0,
            nb_bebes: nbBebes ? parseInt(String(nbBebes)) : 0,
            ville_residence: villeResidence || null,
            budget: budget || null,
            confort: confort || null,
            message: [duree ? `Durée : ${duree}` : null, message].filter(Boolean).join('\n\n') || null,
            statut: 'nouveau',
          })
          .select('id')
          .single()
        reservationId = resa?.id || null
      } catch (err) {
        console.error('Supabase reservation insert error:', err)
      }
    }

    // Sync Brevo (liste optionnelle BREVO_RESERVATION_LIST_ID)
    if (process.env.BREVO_API_KEY) {
      try {
        const listIds = process.env.BREVO_RESERVATION_LIST_ID
          ? [parseInt(process.env.BREVO_RESERVATION_LIST_ID)]
          : undefined
        await createBrevoContact({
          email,
          attributes: {
            PRENOM: prenom,
            NOM: nom,
            WHATSAPP: whatsapp || '',
            TYPE_VOYAGE: typeVoyage,
          },
          listIds,
        })
      } catch (err) {
        console.error('Brevo contact error:', err)
      }
    }

    // Notification admin
    const labelVoyage =
      typeVoyage === 'voyage_signature' ? 'Voyage Signature' : 'Retour aux Sources'
    await notifyAdmin({
      subject: `Nouvelle réservation ${labelVoyage} — ${prenom} ${nom}`,
      message: [
        `Type : ${labelVoyage}`,
        `Contact : ${prenom} ${nom} · ${email} · ${whatsapp || 'pas de WhatsApp'}`,
        `Ville : ${villeResidence || '—'}`,
        `Départ : ${departSouhaite || periode || '—'}`,
        `Voyageurs : ${nbAdultes || 1} adulte(s), ${nbEnfants || 0} enfant(s)${nbBebes ? `, ${nbBebes} bébé(s)` : ''}`,
        duree ? `Durée : ${duree}` : null,
        budget ? `Budget : ${budget}` : null,
        confort ? `Confort : ${confort}` : null,
        '',
        `Message : ${message || '—'}`,
      ]
        .filter(Boolean)
        .join('\n'),
      priority: 'high',
    })

    return NextResponse.json({ success: true, reservationId, leadId })
  } catch (err) {
    console.error('Reservation API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
