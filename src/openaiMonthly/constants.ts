import one from './numerologyNumbers/one';
import two from './numerologyNumbers/two';
import three from './numerologyNumbers/three';
import four from './numerologyNumbers/four';
import five from './numerologyNumbers/five';
import six from './numerologyNumbers/six';
import seven from './numerologyNumbers/seven';
import eight from './numerologyNumbers/eight';
import nine from './numerologyNumbers/nine';

const numerologyNumbers = [
    ,
    one, two, three, four, five, six, seven, eight, nine
];
export const CONSTANTS = {
    intro: function (isMale: boolean) {
        if (isMale) {
            return ` להלן תאור נומרולוגי של חודש אישי של בנאדם. תנסח את הטקסט בלשון זכר ותפנה לקורה בגוף שני.`;
        }

        return `להלן תאור נומרולוגי של חודש אישי של בנאדם .תנסח מחדש את הטקסט שינתן בלשון נקבה`;
    },
    sex: (isMale: boolean) => !isMale ? 'מדובר באישה' : 'מדובר בגבר',
    age: function(isMale: boolean, age: number) {
        if (!isMale) {
            return `   אישה בת ${age}`;
        }

        return `גבר בן  ${age}`
    },
    month: function(month: number) {
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
        return `  החודש הוא ${months[month]} `
    },
    data: function(pm: number) {
        return ` ${numerologyNumbers[pm]}  `;
    },
    glue: 'הנה הטקסט: ',
    point: '.',
    comma: ',',
}