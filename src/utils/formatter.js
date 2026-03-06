import dayjs from "dayjs"

export function formatPhoneNumber(input) {
    if (!input) return ''

    let result = "+998"
    let digits = input.replace(/\D/g, '')

    if (digits.length < 3) {
        return result
    }

    if (digits.startsWith("998")) {
        digits = digits.slice(3)
    }

    digits = digits.slice(0, 9)

    if (digits.length > 0) {
        result += " " + digits.slice(0, 2)
    }
    if (digits.length > 2) {
        result += " " + digits.slice(2, 5)
    }
    if (digits.length > 5) {
        result += " " + digits.slice(5, 7)
    }
    if (digits.length > 7) {
        result += " " + digits.slice(7, 9)
    }

    return result
}

export function extractDigits(input) {
    if (!input) {
        return ''
    }

    return input.toString().replaceAll(/\D/g, '')
}

export function formatDateTime(date) {
    return dayjs(date).format('DD-MM-YYYY HH:mm')
}

export function formatPrice(value) {
    if (value === undefined || value === null || value === '') return ''
    const digits = value.toString().replace(/\D/g, '')
    if (!digits) return ''
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}