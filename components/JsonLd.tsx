/**
 * Composant JSON-LD : injecte un bloc <script type="application/ld+json">.
 * Passe n'importe quel objet schema.org validé ; pour plusieurs schemas
 * sur la même page, pass un tableau.
 *
 * Usage :
 *   <JsonLd data={personSchema()} />
 *   <JsonLd data={[personSchema(), organizationSchema()]} />
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <>
      {payload.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection is the standard pattern
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  )
}
