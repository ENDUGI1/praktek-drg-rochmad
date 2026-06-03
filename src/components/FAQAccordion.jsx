import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function FAQAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <div className="divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-soft">
      {items.map((item, i) => {
        const open = openIdx === i
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIdx(open ? -1 : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-soft/50"
              >
                <span className="font-serif text-base text-primary sm:text-lg">{item.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soft text-secondary transition-transform duration-300 ${
                    open ? 'rotate-45' : ''
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
