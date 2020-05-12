export const formatNumber = (number: number) => {
    if (number < 10) {
        return '0' + number
    } else {
        return number.toString()
    }
}

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const weekDay = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export const formatDate = (inputDate: Date | string): string => {
    const d = new Date(inputDate)
    const month = d.getMonth()
    const date = d.getDate()
    const day = d.getDay()
    const fullYear = d.getFullYear()

    return (
        weekDay[day] +
        ', ' +
        formatNumber(date) +
        ' ' +
        months[month] +
        ' ' +
        fullYear
    )
}

export const formatTime = (inputDate: Date | string): string => {
    const d = new Date(inputDate)
    const hours = d.getHours()
    const mins = d.getMinutes()

    return formatHours(hours, mins)
}

const formatHours = (hours: number, mins?: number): string => {
    const amPm = hours < 12 ? 'am' : 'pm'
    const adjHours = hours % 12 || 12

    if (mins) {
        return formatNumber(adjHours) + ':' + formatNumber(mins) + amPm
    } else {
        return formatNumber(adjHours) + ':00' + amPm
    }
}
