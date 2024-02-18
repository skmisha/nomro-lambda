"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("dotenv/config");
const openai_1 = __importDefault(require("openai"));
const handler = (event = {}) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request event: ", event);
    const { messages, content } = event;
    if (!content) {
        throw new Error('Content prompt was not supplied!');
    }
    const chatCompletions = openAiChatCompletionCreate(messages, content);
    try {
        return {
            statusCode: 200,
            body: {
                date: Date.now(),
                chatCompletions,
            },
        };
    }
    catch (error) {
        console.error("Error: ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
});
exports.handler = handler;
const openAiModel = "gpt-4";
function openAiChatCompletionCreate(messages = [], content) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('ai logs prompt: ', content);
        const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
        try {
            const chatCompletion = yield openai.chat.completions.create({
                model: openAiModel,
                messages: [
                    ...messages,
                    {
                        content,
                        role: 'user',
                    }
                ],
                max_tokens: 150,
                response_format: {
                    type: 'text',
                }
            });
            console.log('ai logs chatCompletion: ', chatCompletion);
            return chatCompletion;
        }
        catch (error) {
            console.log('error here', error);
            console.error(`Error during ai computation: ${error}`, error === null || error === void 0 ? void 0 : error.status);
            return null;
        }
    });
}
const messages = [
    {
        user: 'system',
        content: ''
    }
];
//handler();
