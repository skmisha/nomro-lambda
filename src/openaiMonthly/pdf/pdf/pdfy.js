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
const path_1 = __importDefault(require("path"));
//https://programatically.com/how-to-add-css-in-pdf-using-puppeteer/
const __BODY_BG__ = '__BODY_BG__';
const __P_SCALE__ = '__P_SCALE__';
const __REPORT_FOR_FULL_NAME__ = '__REPORT_FOR_FULL_NAME__';
const __TITLE__ = '__TITLE__';
const __PARAGRAPH__ = '__PARAGRAPH__';
function createPDF(paragraph, userRequestData) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        /**
         * set title and content
         */
        console.log('path.join(__dirname', path_1.default.join(__dirname, 'assets'));
        const assetsPath = path_1.default.join(__dirname, 'assets');
        let pdf = yield (0, promises_1.readFile)(`${assetsPath}/html_he_month.html`, 'utf8');
        /**
         * get background
         */
        let background = yield (0, promises_1.readFile)(`${assetsPath}/bg_85_a4_a1.png`);
        const bg_base64 = background.toString('base64');
        /**
         * set full name and month
         */
        const { firstName, lastName, dayOfBirth, monthOfBirth, yearOfBirth } = userRequestData;
        const fullDateOfBirth = `${dayOfBirth}.${monthOfBirth}.${yearOfBirth}`;
        pdf = pdf.replace(__REPORT_FOR_FULL_NAME__, `${firstName} ${lastName} ${fullDateOfBirth}  `);
        pdf = pdf.replace(__BODY_BG__, `height: 95vh; background-image: url(\'data:image/gif;base64, ${bg_base64}\');`);
        pdf = pdf.replace(__TITLE__, 'זו כותרת');
        pdf = pdf.replace(__P_SCALE__, ' scale(0.9);');
        pdf = pdf.replace(__PARAGRAPH__, paragraph);
        yield page.setContent(pdf, { waitUntil: "domcontentloaded" });
        const pdfPath = `example_${Date.now()}.pdf`;
        yield page.pdf({
            path: pdfPath,
            format: 'A4',
            preferCSSPageSize: false,
            displayHeaderFooter: false,
            printBackground: true,
        });
        yield browser.close();
        console.log("done with pdf!!!", pdfPath);
    });
}
exports.createPDF = createPDF;
