"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = void 0;
const one_1 = __importDefault(require("./numerologyNumbers/one"));
const two_1 = __importDefault(require("./numerologyNumbers/two"));
const three_1 = __importDefault(require("./numerologyNumbers/three"));
const four_1 = __importDefault(require("./numerologyNumbers/four"));
const five_1 = __importDefault(require("./numerologyNumbers/five"));
const six_1 = __importDefault(require("./numerologyNumbers/six"));
const seven_1 = __importDefault(require("./numerologyNumbers/seven"));
const eight_1 = __importDefault(require("./numerologyNumbers/eight"));
const nine_1 = __importDefault(require("./numerologyNumbers/nine"));
const numerologyNumbers = [
    ,
    one_1.default, two_1.default, three_1.default, four_1.default, five_1.default, six_1.default, seven_1.default, eight_1.default, nine_1.default
];
exports.CONSTANTS = {
    intro: 'להלן תאור נומרולוגי של חודש אישי של בנאדם',
    sex: (isMale) => isMale ? 'מדובר באישה' : 'מדובר בגבר',
    age: function (isMale, age) {
        if (isMale) {
            return ` ${age}  אישה בת `;
        }
        return `${age}גבר בן `;
    },
    month: function (month) {
        const months = [
            'ינואר',
            'פברואר',
            'מרץ',
            'אפריל',
            'מאי',
            'יוני',
            'יולי',
            'אוגוסט',
            'ספטמבר',
            'אוקטובר',
            'נובמבר',
            'דצמבר',
        ];
        return `${months[month]}  החודש הוא `;
    },
    data: function (pm) {
        return numerologyNumbers[pm];
    }
};
