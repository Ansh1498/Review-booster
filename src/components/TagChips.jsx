import { motion } from 'framer-motion'

export default function TagChips({ tags, selected, onToggle, brandColor }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Feedback tags">
      {tags.map((tag, i) => {
        const isSelected = selected.includes(tag)

        return (
          <motion.button
            key={tag}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(tag)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.25 } }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-600 shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gray-400"
            style={
              isSelected
                ? {
                    backgroundColor: `${brandColor}1A`, // 10% brand color
                    borderColor: brandColor,
                    color: brandColor,
                  }
                : undefined
            }
          >
            {tag}
          </motion.button>
        )
      })}
    </div>
  )
}