import dayjs from "dayjs";

export function formatPhoneNumber(str) {
    const digits = (str || '').replaceAll(/\D/g, '').slice(3)
    const number = [
        digits.slice(0, 2),
        digits.slice(2, 5),
        digits.slice(5, 7),
        digits.slice(7, 9),
    ]
        .filter(Boolean)
        .join(' ')

    return `+998 ${ number }`
}

export function extractNumbers(str) {
    return str.replaceAll(/\D/g, '')
}

export function formatDateTime(date) {
    return dayjs(date).format('HH:mm DD-MM-YYYY')
}

export function formatNumber(num) {
    const numStr = (num || '0').toString().replace(/\D/g, '')

    return Number(numStr).toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}