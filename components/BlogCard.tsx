import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  coverImage?: string
  tags?: string[]
  publishedAt?: string
}

export default function BlogCard({ slug, title, excerpt, coverImage, tags, publishedAt }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article
        className="rounded-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          backgroundColor: '#F8F5F0',
          border: '1px solid rgba(86,14,19,0.06)',
          boxShadow: '0 2px 8px rgba(10,10,10,0.04)',
        }}
      >
        {/* Cover image or gradient placeholder */}
        <div className="relative h-48 overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title.length > 100 ? title.slice(0, 97).trimEnd() + '…' : title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(135deg, #560E13 0%, #7a1a20 50%, #F6C961 100%)',
              }}
            />
          )}
        </div>

        <div className="p-5">
          {publishedAt && (
            <p className="text-xs mb-2" style={{ color: 'rgba(10,10,10,0.4)' }}>
              {publishedAt}
            </p>
          )}

          <h3
            className="text-xl font-bold mb-2 line-clamp-2"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#0A0A0A',
            }}
          >
            {title}
          </h3>

          <p
            className="text-sm leading-relaxed mb-4 line-clamp-3"
            style={{ color: 'rgba(10,10,10,0.6)' }}
          >
            {excerpt}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: 'rgba(86,14,19,0.06)',
                    color: '#560E13',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
