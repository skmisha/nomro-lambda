"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalMonth = exports.personalYear = void 0;
function sumOfDigits(n) {
    let sod = n.toString().split('')
        .map(Number)
        .reduce((a, b) => a + b, 0);
    if (sod < 10) {
        return sod;
    }
    else {
        return sumOfDigits(sod);
    }
}
function personalYear({ dayOfBirth, monthOfBirth }, currentYear) {
    return sumOfDigits(dayOfBirth + monthOfBirth + currentYear);
}
exports.personalYear = personalYear;
function personalMonth({ dayOfBirth, monthOfBirth }, currentYear, currentMonth) {
    return sumOfDigits(personalYear({ dayOfBirth, monthOfBirth }, currentYear) + currentMonth);
}
exports.personalMonth = personalMonth;
