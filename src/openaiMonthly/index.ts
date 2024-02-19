import 'dotenv/config';
import {APIGatewayProxyHandler} from 'aws-lambda';
import OpenAI from 'openai';
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions";
import { personalMonth } from "./numerologyUtilities";
import {CONSTANTS} from "./constants";
import dayjs from "dayjs";
import * as process from "process";
import {createPDF} from "./pdf/pdfy";
import {UserRequestData} from "./types";

const openAiModel = "gpt-4-0125-preview";
const max_tokens = 2000;
export const handler: APIGatewayProxyHandler = async (userData: UserRequestData) => {
    console.log("Request userData: ", userData);

    try {
    const messages = await getUserPersonalMonthContent(userData);

    const chatCompletions = await openAiChatCompletionCreate(messages);
    const content = chatCompletions.choices[0].message.content;
    // const content = " אתה נמצא בתקופה שבה האירועים מתקדמים בקצב יותר איטי, כאילו הזמן מתארך והכל נע במסלול משלו. זה לא הזמן המתאים ביותר לקבל החלטות גורליות. עליך לפתוח את דעתך לכל האופציות, כיוון שכל החלטה נחרצת עלולה להוביל לתוצאות לא רצויות. בתקופה זו, נושאי זוגיות ושיתופי פעולה תופסים מקום מרכזי בחייך, ויש לך הרבה הזדמנויות לשתף פעולה עם אחרים. אם אתה רווק, קיים פוטנציאל לזוגיות מעמיקה ורצינית. זו גם תקופה טובה לקבל עזרה אם אתה נתקל בבעיות, באיזה תחום שהוא. אין צורך להסתמך רק על עצמך.," +
    //     "" +
    //     "אם אתה שוקל להרחיב או לפתוח עסק, כנראה שתזדקק לעזרה, ייעוץ או שיתוף פעולה עם מומחה בתחום מסוים. \"חוק המגנט\", שפועל בתקופה זו, מעודד אותך להאט את הקצב, להתחזק בסבלנות ולא לרוץ להשיג את מטרותיך בנחישות יתרה. לפעמים, הזדמנויות יגיעו אליך מעצמן, בלי שתצטרך ללחוץ. למשל, אם פוטרת מעבודתך ולא הצלחת למצוא עבודה חדשה למרות שליחת קורות חיים רבים, יתכן כי ברגע שתתפנה למצב של שלווה פנימית וקבלה, הצעה לעבודה תגיע אליך בלי מאמץ." +
    //     "" +
    //     "שים לב, זו גם תקופה רגישה במיוחד בשבילך. מצבי רוח שלך עלולים להיות משתנים, ואולי תחוש חוסר איזון רגשי. הגוף שלך עלול להיות רגיש יותר לאלרגיות, וירוסים ושינויים סביבתיים. אתה עשוי להתמודד עם פחדים והיסוסים, ואף דילמות בזוגיות או במערכות יחסים אחרות עשויות להתעורר." +
    //     "" +
    //     "העצה שלי אליך היא לנצל את הפוטנציאל והבשלות שהתקופה הזו מציעה. זה הזמן להיכנס להריון, לחוות זוגיות עמוקה, להקים או להתמקד בהורות, לחפש שיתופי פעולה עם אחרים או אפילו לחתום על שותפויות עסקיות. מצא זמן לרגוע ולטפח את השלווה הפנימית שלך, תן לדברים להשתלב בזמנם, ונהג זהירות בקבלת החלטות. בנוסף, דמויות נשיות צפויות להשפיע עליך באופן חיובי ומשמעותי במהלך התקופה הזו."
        console.log('content::::::', content);
    const paragraph = content
        .replaceAll('\\"', '"')
        .replaceAll('"\\', '"')
        .replaceAll('ֿ\\n', '')
        .replaceAll('n\\', '');
        console.log('paragraph::::::', paragraph);
        await createPDF(paragraph, userData);

        return {
            statusCode: 200,
            body: {
                date: Date.now(),
                chatCompletions: '',
            },
        };
    } catch (error) {
        console.error("Error: ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal Server Error'}),
        };
    }
};


async function openAiChatCompletionCreate(messages: Array<ChatCompletionMessageParam> = [], ) {

    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    try {
        console.log(`*** asking ai model: ${openAiModel} `);
        const chatCompletion = await openai.chat.completions.create({
            model: openAiModel,
            messages,
            max_tokens,
            response_format: {
                type: 'text',
            }
        });
        console.log('********************************************* 888');
        console.log('ai logs chatCompletion: ', JSON.stringify(chatCompletion.choices[0].message));
        console.log(Date.now(), '*********************************************');
        return chatCompletion;
    } catch (error: any) {
        console.log('error here', error)
        console.error(`Error during ai computation: ${error}`, error?.status);
        return null;
    }
}

async function getUserPersonalMonthContent(userData: UserRequestData): Promise<Array<ChatCompletionMessageParam>> {
    const {
        yearOfBirth,
        monthOfBirth,
        dayOfBirth,
        forMonth,
        forYear,
        isMale,
    } = userData
    const pm = personalMonth(userData, forMonth, forYear);
    const dayjsBirthday = dayjs(`${yearOfBirth}-${monthOfBirth}-${dayOfBirth}`);
    const age = dayjs().diff(dayjsBirthday, 'year');
    const messages: Array<ChatCompletionMessageParam> = [];

    messages.push({
        role: 'user',
        content: [
            CONSTANTS.intro(isMale),
            CONSTANTS.point,
            CONSTANTS.sex(isMale),
            CONSTANTS.comma,
            CONSTANTS.age(isMale, age),
            CONSTANTS.comma,
            CONSTANTS.month(forMonth),
            CONSTANTS.point,
            CONSTANTS.glue,
            CONSTANTS.data(pm),
        ].join(''),
    });

    console.log('all messages ###############################################')
    console.log(JSON.stringify(messages))
    console.log('all messages ###############################################')

    return messages;
}
// ############################################################
const userData = {
    dayOfBirth: 8,
    monthOfBirth: 11,
    yearOfBirth: 1979,
    profession: 'מהנדס',
    isMale: true,
    firstName: 'מיכאל',
    lastName: 'קושניריוב',
    email: 'mkushniriov@gmail.com',
    forDay: 19,
    forMonth: 6,
    forYear: 2024,
};

handler(userData);


