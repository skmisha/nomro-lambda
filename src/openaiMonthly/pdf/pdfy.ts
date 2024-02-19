import puppeteer from "puppeteer";
import { readFile } from 'fs/promises';
import path from 'path';

//https://programatically.com/how-to-add-css-in-pdf-using-puppeteer/

const __BODY_BG__ = '__BODY_BG__';
const __P_SCALE__ = '__P_SCALE__';
const __TITLE__ = '__TITLE__';
const __PARAGRAPH__ = '__PARAGRAPH__';

export async function createPDF(paragraph: string)  {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    /**
     * set title and content
     */
    console.log('path.join(__dirname', path.join(__dirname, 'assets'));
    const assetsPath = path.join(__dirname, 'assets');
    let pdf = await readFile(`${assetsPath}/html_he_month.html`, 'utf8');
    let background = await readFile(`${assetsPath}/bg_85_a4_a1.png`);
    const bg_base64 = background.toString('base64')

    pdf = pdf.replace(__BODY_BG__, `height: 95vh; background-image: url(\'data:image/gif;base64, ${bg_base64}\');`)
    pdf = pdf.replace(__TITLE__, 'זו כותרת')
    pdf = pdf.replace(__P_SCALE__,' scale(0.9);')
    pdf = pdf.replace(__PARAGRAPH__, paragraph)

    await page.setContent(pdf, { waitUntil: "domcontentloaded"});

    const pdfPath = `example_${Date.now()}.pdf`;
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        preferCSSPageSize: false,
        displayHeaderFooter: false,
        printBackground: true,
    });

    await browser.close();

    console.log("done with pdf!!!", pdfPath);
}
