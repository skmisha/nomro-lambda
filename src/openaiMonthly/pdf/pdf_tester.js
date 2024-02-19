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
const pdfy_1 = require("./pdfy");
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
    const paragraph = `פוטנציאל להתחלות חדשות, צורך חזק בדברים חדשים שלא היו קודם, הזדמנויות להתחבר לאינדיבידואל ולרצונות, אפשרויות חדשות נכנסות לחיים בכל תחום, החיים דוחפים את האדם לעמוד על שתי רגליו, להיות עצמאי יותר בין אם זהו טבעו ובין אם לא.
בצד החיובי: התקופה יכולה להביא אתה נטילת אחריות גדולה יותר, בתחום המקצועי מדובר בתפקיד או מעמד אחראי יותר, האנשים הסובבים אותו יעמידו פעמים רבות את האדם בפני מצב בו הוא צריך להחליט, האדם יעמוד בפני צמתי דרכים משמעותיות.תקופה זו מעצימה את הצד האנרגטי, תחושות של אדרנלין בגוף, התלהבות, יוצרת צורך רב בפעילות ועשייה.
אם האדם סבל בתקופות קודמות מעייפות או ממחלה, בתקופה זו לרוב יחווה התאוששות והתרוממות.בצד הקרייריסטי והכספי ישנה אפשרות להתקדמות והצלחה. 
קשיים אפשריים: התקופה תוביל למצבים שהאנשים או הדברים שהיינו תלויים בהם בחיים מנתקים את התלות, את "כבל ההזנה", למשל: סיוע כלכלי שקיבלתי מההורים אותו הם מפסיקים להעניק , הבעל שדאג לאישה פתאום עזב, נפטר וכו', אז כל העומס נופל עליה והיא צריכה ללמוד להיות עצמאית ולהסתדר לבדה. עלולות לצוף תחושות בדידות, ניתוק, מערכות יחסים בעייתיות. כמו כן ייתכנו חיכוכים עם דמויות סמכותיות כגון בוסים, דמויות גבריות או מאורעות שקשורים לדמות האב.
עצה: ליזום, להתחיל דברים, לשנות, להיות החלטי וחותך, להסתמך על עצמי, להיות חזק, לא לחכות שדברים יקרו אלא להניע אותם, להבליט ולהחצין את היכולות לא - לפחוד להתגאות בעצמי.`;
    yield (0, pdfy_1.createPDF)(paragraph);
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
