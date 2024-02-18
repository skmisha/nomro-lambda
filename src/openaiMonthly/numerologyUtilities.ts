import dayjs from "dayjs";
function sumOfDigits(n: number) {
    let sod = n.toString().split('')
        .map(Number)
        .reduce((a, b) => a + b, 0);
    if (sod < 10) {
        return sod;
    } else {
        return sumOfDigits(sod);
    }
}

export function personalYear({dayOfBirth, monthOfBirth}, currentYear: number) {
    return sumOfDigits(  dayOfBirth + monthOfBirth + currentYear);
}

export function personalMonth({dayOfBirth, monthOfBirth}, currentYear: number, currentMonth: number) {
    return sumOfDigits(personalYear({dayOfBirth, monthOfBirth}, currentYear) + currentMonth);
}