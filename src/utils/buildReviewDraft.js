// Emoji hata kar sirf text rakhta hai: "☕ Great coffee" -> "Great coffee"
const stripEmoji = (tag) =>
  tag
    .replace(/[^\p{L}\p{N}\s&',.-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()

export function buildReviewDraft({ selectedTags, text }) {
  const tagLine = selectedTags.map(stripEmoji).filter(Boolean).join(', ')
  const parts = []

  if (tagLine) parts.push(`${tagLine}.`)
  if (text.trim()) parts.push(text.trim())

  // Rating draft mein nahi daalte: Google par customer star khud select karega
  return parts.join('\n\n')
}