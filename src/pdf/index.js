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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pdfy_1 = require("../openaiMonthly/pdf/pdfy");
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
const __TITLE__ = '__TITLE__';
const __PARAGRAPH__ = '__PARAGRAPH__';
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, pdfy_1.createPDF)();
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // /**
    //  * set title and content
    //  */
    // let pdf = html;
    // pdf = pdf.replace(__TITLE__, 'זו כותרת')
    // pdf = pdf.replace(__PARAGRAPH__, 'תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן תוכן כאן 234234')
    // console.log('pdf', pdf)
    // await page.setContent(pdf, { waitUntil: "domcontentloaded"});
    //
    // const logo = "logo"
    // const path = `examples/example_${Date.now()}.pdf`;
    // await page.pdf({
    //     path,
    //     format: 'A4',
    //     preferCSSPageSize: false,
    //     displayHeaderFooter: true,
    //
    //     headerTemplate: `<div class="header"><img decoding="async" width="100" src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%200'%3E%3C/svg%3E" alt="company_logo" data-lazy-src="data:image/png;base64, ${logo}"><noscript><img decoding="async" width="100" src="data:image/png;base64, ${logo}" alt="company_logo"></noscript></div> `,
    //     footerTemplate: '<footer><h5>Page <span class="pageNumber"></span> of <span class="totalPages"></span></h5></footer>',
    //     margin: { top: "200px", bottom: "150px", right: "20px", left: "20px" },
    // });
    //
    // await browser.close();
    console.log("Here's your PDF!.");
}))();
