interface ComparisonTableProps {
  columns: { name: string; highlighted?: boolean }[]
  rows: { feature: string; values: (boolean | string)[] }[]
}

export default function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse min-w-[500px]">
        <thead>
          <tr>
            <th
              className="sticky left-0 z-10 text-left px-4 py-3 text-sm font-semibold"
              style={{ backgroundColor: '#FEFCF9', color: '#0A0A0A' }}
            >
              Fonctionnalite
            </th>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 text-center text-sm font-bold"
                style={{
                  backgroundColor: col.highlighted ? '#F6C961' : '#F8F5F0',
                  color: col.highlighted ? '#560E13' : '#0A0A0A',
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: '1rem',
                }}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom: '1px solid rgba(86,14,19,0.06)',
                backgroundColor: i % 2 === 0 ? '#FEFCF9' : '#F8F5F0',
              }}
            >
              <td
                className="sticky left-0 z-10 px-4 py-3 text-sm font-medium"
                style={{
                  color: '#0A0A0A',
                  backgroundColor: i % 2 === 0 ? '#FEFCF9' : '#F8F5F0',
                }}
              >
                {row.feature}
              </td>
              {row.values.map((val, j) => (
                <td key={j} className="px-4 py-3 text-center text-sm">
                  {typeof val === 'boolean' ? (
                    val ? (
                      <span style={{ color: '#F6C961', fontSize: '1.2rem' }}>&#10003;</span>
                    ) : (
                      <span style={{ color: 'rgba(10,10,10,0.2)', fontSize: '1.2rem' }}>&#10007;</span>
                    )
                  ) : (
                    <span style={{ color: 'rgba(10,10,10,0.75)' }}>{val}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
