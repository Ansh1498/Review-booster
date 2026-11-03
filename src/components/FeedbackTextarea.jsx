import { useState } from 'react'

export default function FeedbackTextarea({
  value,
  onChange,
  brandColor,
  maxLength = 500,
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div>
      <textarea
        aria-label="Write your experience"
        rows={4}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Share your experience in your own words..."
        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-shadow"
        style={
          focused
            ? { borderColor: brandColor, boxShadow: `0 0 0 3px ${brandColor}26` }
            : undefined
        }
      />
      <p className="mt-1 text-right text-xs text-gray-400">
        {value.length}/{maxLength}
      </p>
    </div>
  )
}