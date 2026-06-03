import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { INFO, waLink } from '../lib/info.js'

/**
 * Floating WhatsApp button (semua halaman).
 * Mengecil saat scroll ke atas, melebar (dengan label) saat scroll ke bawah.
 */
export default function WhatsAppButton() {
  const [expanded, setExpanded] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      // melebar saat scroll ke bawah & sudah cukup jauh dari atas
      const goingDown = y > lastY.current
      setExpanded(goingDown && y > 240)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={waLink(`Halo ${INFO.dokterShort}, saya ingin bertanya seputar layanan praktek.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat dokter via WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full px-4 py-3.5 font-bold text-white shadow-lift animate-pulse-soft transition-all duration-300 hover:-translate-y-0.5"
      style={{ backgroundColor: 'rgb(var(--color-whatsapp))' }}
    >
      <MessageCircle className="h-6 w-6 shrink-0" strokeWidth={2.2} />
      <span
        className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-300 ${
          expanded ? 'max-w-[140px] opacity-100' : 'max-w-0 opacity-0 sm:group-hover:max-w-[140px] sm:group-hover:opacity-100'
        }`}
      >
        Chat Dokter
      </span>
    </a>
  )
}
