const puppeteer = require('puppeteer');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let articles = ""
let browser = null

async function openBrowser() {
    browser = await puppeteer.launch({ headless: true });
}

async function fetchArticle(url, number) {
    let page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(url, { waitUntil: "load" });
    if (number === 0) {
        await page.$eval('body > div:nth-child(19) > div > div > div > div > div > div > span > button', el => el.click());
    }
    await autoScroll(page);
    await page.pdf({
        path: "PDF/article-" + number + ".pdf",
        format: "A4",
        margin: {
            top: 60,
            bottom: 60,
            left: 60,
            right: 50
        },
        printBackground: true
    })
}

async function readTextFile() {
    let startTime = Date.now();
    var file = "file://" + __dirname + "\\ToRead\\articles.txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                articles = rawFile.responseText;
                articles = articles.replace(/(\r\n|\n|\r)/gm, " ").split(' ');
            }
        }
    }
    rawFile.send(null);
    await openBrowser();
    for (let i = 0; i < articles.length; i++) {
        await fetchArticle(articles[i], i);
    }
    await browser.close();
    await mergePdfs();
    console.log('Time: ', (Date.now() - startTime) / 1000, 's');
}

function getFiles() {
    var fs = require('fs');
    var files = fs.readdirSync('./PDF/');
    return files;
}

async function mergePdfs() {
    const PDFMerger = require('pdf-merger-js');
    var merger = new PDFMerger();
    var files = getFiles()
    for (let i = 0; i < files.length; i++) {
        merger.add('./PDF/' + files[i])
    }
    let today = new Date().toISOString().slice(0, 10)
    await merger.save(today + '.pdf')
}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

readTextFile()