import { motion } from 'framer-motion'

export default function ContinueButton({ onClick, loading, brandColor }) {
  return (
    <div className="mt-8">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white shadow-md outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70"
        style={{ backgroundColor: brandColor }}
      >
        {loading ? 'Opening Google...' : 'Continue to Google'}
      </motion.button>

      <p className="mt-3 text-center text-xs text-gray-400">
        Your feedback will be copied. Paste it on Google and tap Post.
        You may need to sign in to your Google account.
      </p>
    </div>
  )
}