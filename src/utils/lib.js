export function formatNumber(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Some endpoints hand back the raw localized map ({uz, ru, en}) instead of a resolved
// string. Falls back to the first filled locale, like the backend does.
export function pickLocale(value, locale) {
    if (!value) return ''
    if (typeof value === 'string') return value

    return value[locale] || Object.values(value).find(Boolean) || ''
}

export function extractDigits(input) {
    return String(input).replace(/\D/g, '')
}

export function formatPhoneNumber(input) {
    const digits = String(input).replace(/\D/g, '').slice(0, 12)

    const groups = [3, 2, 3, 2, 2]
    const parts = []
    let index = 0

    for (const size of groups) {
        if (index >= digits.length) break

        parts.push(digits.slice(index, index + size))
        index += size
    }

    return parts.join(' ')
}