export function makeDate(date, time) {
    if(!date) {
        return;
    }
    const prep = date.split('.').reverse()
    if (prep[0].length !== 4) {
        prep[0] = `20${prep[0]}`
    }
    return prep.join('-') + (!!time ? `T${time}:00` : "")
}
