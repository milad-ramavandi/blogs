const DateFormatRelative = (dateString:string) => {
  const now = new Date()
  const date = new Date(dateString)

  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffMonths = now.getMonth() - date.getMonth() + (12 * (now.getFullYear() - date.getFullYear()))
  const diffYears = now.getFullYear() - date.getFullYear()

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays >= 7 && diffDays < 14) return `last week`
  if (diffDays >= 14 && diffDays < 21) return `2 weeks ago`
  if (diffDays >= 21 && diffDays < 30) return `3 weeks ago`
  if (diffDays === 30 || diffDays === 31) return `last month`
  if (diffMonths === 1) return 'last month'
  if (diffMonths > 1 && diffMonths < 12) return `${diffMonths} months ago`
  if (diffYears === 1) return 'last year'

  return `${diffYears} years ago`
}

export default DateFormatRelative