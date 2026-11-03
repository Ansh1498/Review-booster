import { useState } from 'react'
import { motion } from 'framer-motion'

const OPTIONS = [
  { value: 1, emoji: '😞', label: 'Poor' },
  { value: 2, emoji: '😕', label: 'Fair' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😍', label: 'Excellent' },
]

function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden="true">
      <path
        d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.53L12 17.5l-5.87 3.07 1.12-6.53L2.5 9.41l6.56-.95L12 2.5z"
        fill={filled ? '#FACC15' : 'none'}
        stroke={filled ? '#EAB308' : '#D1D5DB'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0)
  const active = hover || value
  const selected = OPTIONS.find((o) => o.value === value)

  const handleSelect = (v) => {
    setHover(0) // mobile par hover atka na rahe
    onChange(v)
  }

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Overall experience rating"
        className="flex justify-between"
        onMouseLeave={() => setHover(0)}
      >
        {OPTIONS.map((opt) => {
          const filled = opt.value <= active
          const isSelected = opt.value === value

          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${opt.value} star${opt.value > 1 ? 's' : ''} - ${opt.label}`}
              onClick={() => handleSelect(opt.value)}
              onMouseEnter={() => setHover(opt.value)}
              className="flex flex-col items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-lg p-1"
            >
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.85 }}
                animate={{ scale: filled && isSelected ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <StarIcon filled={filled} />
              </motion.div>

              <motion.span
                animate={{
                  scale: isSelected ? 1.3 : 1,
                  opacity: isSelected ? 1 : 0.45,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="text-sm"
              >
                {opt.emoji}
              </motion.span>
            </button>
          )
        })}
      </div>

      {/* Selected rating ka label */}
      <div className="mt-2 h-5 text-center">
        {selected && (
          <motion.p
            key={selected.value}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-gray-600"
          >
            {selected.label}
          </motion.p>
        )}
      </div>
    </div>
  )
}