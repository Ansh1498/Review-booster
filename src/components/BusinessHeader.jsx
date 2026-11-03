import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BusinessHeader({ name, logo, brandColor }) {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3"
    >
      {logo && !logoFailed ? (
        <img
          src={logo}
          alt={`${name} logo`}
          onError={() => setLogoFailed(true)}
          className="h-12 w-12 rounded-full object-cover border border-gray-100"
        />
      ) : (
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
          style={{ backgroundColor: brandColor }}
        >
          {name.charAt(0)}
        </div>
      )}
      <span className="text-sm font-semibold text-gray-700">{name}</span>
    </motion.div>
  )
}