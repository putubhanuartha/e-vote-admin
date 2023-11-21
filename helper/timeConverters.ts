export const convertEpochToLocalGMT = (epochTimeSeconds: number) => {
    const date = new Date(epochTimeSeconds * 1000)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const seconds = date.getSeconds()
    return { year, month, day, hour, minute, seconds }
}

export const timeDigitConverter = (firstDigit: number, secondDigit: number) => {
    return `${firstDigit < 10 ? `0${firstDigit}` : firstDigit}:${secondDigit < 10 ? `0${secondDigit}` : secondDigit}`
}

export const convertToDateObject = (epochSeconds: number) => {
    let milis = epochSeconds * 1000
    const date = new Date(milis)
    date.setUTCHours(0, 0, 0, 0)
    return date
}

export const getHourMinuteEpoch = (epochSeconds: number) => {
    const date = new Date(epochSeconds * 1000)
    const hour = date.getHours()
    const minute = date.getMinutes()
    return { hour, minute }
}