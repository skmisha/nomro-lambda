import 'dotenv/config';
import {APIGatewayProxyHandler} from 'aws-lambda';
import OpenAI from 'openai';
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions";
import { personalMonth } from "./numerologyUtilities";
import {CONSTANTS} from "./constants";
import dayjs from "dayjs";

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
export const handler: APIGatewayProxyHandler = async (userData: UserData) => {
    console.log("Request event: ", userData);

    const messages = await getUserPersonalMonthContent(userData);

    const chatCompletions = openAiChatCompletionCreate(messages)
    try {
        return {
            statusCode: 200,
            body: {
                date: Date.now(),
                chatCompletions,
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
const openAiModel = "gpt-4";

async function openAiChatCompletionCreate(messages: Array<ChatCompletionMessageParam> = [], ) {

    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: openAiModel,
            messages,
            max_tokens: 150,
            response_format: {
                type: 'text',
            }
        });
        console.log('*********************************************');
        console.log('ai logs chatCompletion: ', chatCompletion);
        console.log('*********************************************');
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
        role: 'system',
        content: CONSTANTS.intro,
    });

    messages.push({
        role: 'system',
        content: CONSTANTS.sex(isMale),
    });

    messages.push({
        role: 'system',
        content: CONSTANTS.age(isMale, age),
    });

    messages.push({
        role: 'system',
        content: CONSTANTS.month(pm),
    });

    messages.push({
        role: 'user',
        content: CONSTANTS.data(pm),
    });


    return messages;
}

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


