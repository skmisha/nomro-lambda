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
exports.createPDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const promises_1 = require("fs/promises");
//https://programatically.com/how-to-add-css-in-pdf-using-puppeteer/
const html = `

<div class="paper-template" dir="rtl">
    <div class="header">Header</div>
    <div class="body">
        <h1 class="title">__TITLE__</h1>
        <p class="paragraph" style="color: blue;">
            __PARAGRAPH__
        </p>
    </div>
    <div class="footer">By awesome company <span class="pagenr"></span></div>
</div>

`;
const __BODY_BG__ = '__BODY_BG__';
const __P_SCALE__ = '__P_SCALE__';
const __TITLE__ = '__TITLE__';
const __PARAGRAPH__ = '__PARAGRAPH__';
function getHtmlContent(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, promises_1.readFile)(path, 'utf8');
    });
}
function createPDF(paragraph) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        /**
         * set title and content
         */
        let pdf = yield (0, promises_1.readFile)('./assets/html_he_month.html', 'utf8');
        let background = yield (0, promises_1.readFile)('./assets/bg_85_a4_a1.png');
        const bg_base64 = background.toString('base64');
        pdf = pdf.replace(__BODY_BG__, `height: 95vh; background-image: url(\'data:image/gif;base64, ${bg_base64}\');`);
        pdf = pdf.replace(__TITLE__, 'זו כותרת');
        pdf = pdf.replace(__P_SCALE__, ' scale(0.9);');
        pdf = pdf.replace(__PARAGRAPH__, paragraph);
        yield page.setContent(pdf, { waitUntil: "domcontentloaded" });
        const path = `example_${Date.now()}.pdf`;
        yield page.pdf({
            path,
            format: 'A4',
            preferCSSPageSize: false,
            displayHeaderFooter: false,
            printBackground: true,
        });
        yield browser.close();
        console.log(" done with pdf!!!", path);
    });
}
exports.createPDF = createPDF;
