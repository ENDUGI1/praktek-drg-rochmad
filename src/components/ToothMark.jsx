// Brand mark gigi (Lucide tidak menyediakan icon gigi).
// Dipakai sebagai logo di navbar & footer.
export default function ToothMark({ className = 'h-6 w-6', stroke = 1.8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 5.5c-1.7-1.6-4-2.2-5.8-1.2C4.2 5.4 3.5 7.8 4 10.4c.4 2 .8 3.2 1.3 5.4.4 1.8.7 3.7 2 3.7 1.2 0 1.5-1.4 1.8-3 .3-1.5.7-2.6 1.9-2.6s1.6 1.1 1.9 2.6c.3 1.6.6 3 1.8 3 1.3 0 1.6-1.9 2-3.7.5-2.2.9-3.4 1.3-5.4.5-2.6-.2-5-2.2-6.1-1.8-1-4.1-.4-5.8 1.2Z" />
    </svg>
  )
}
