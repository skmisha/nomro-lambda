import 'dotenv/config';
import {APIGatewayProxyHandler} from 'aws-lambda';
import OpenAI from 'openai';
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions";
import { personalMonth } from "./numerologyUtilities";
import {CONSTANTS} from "./constants";
import dayjs from "dayjs";
import * as process from "process";
import {createPDF} from "./pdf/pdfy";


type UserData = {
    dayOfBirth: number;
    monthOfBirth: number;
    yearOfBirth: number;
    profession?: string;
    isMale: true;
    email: string;
    forDay: number;
    forMonth: number;
    forYear: number;
};
const openAiModel = "gpt-4-0125-preview";
const max_tokens = 2000;
export const handler: APIGatewayProxyHandler = async (userData: UserData) => {
    console.log("Request userData: ", userData);

    try {
    const messages = await getUserPersonalMonthContent(userData);

    const chatCompletions = await openAiChatCompletionCreate(messages);
    const content = chatCompletions.choices[0].message.content;
    const paragraph = content
        .replaceAll('\"', '"')
        .replaceAll('"\\', '"')
        .replaceAll('n\\', '')
        .replaceAll('\n', '');
    await createPDF(paragraph);

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

async function getUserPersonalMonthContent(userData: UserData): Promise<Array<ChatCompletionMessageParam>> {
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
    email: 'mkushniriov@gmail.com',
    forDay: 19,
    forMonth: 2,
    forYear: 2024,
};

handler(userData);


