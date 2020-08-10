# Kindle Medium Reader

A project to turn all your Medium Daily Digest article recommendations into a pdf that can be sent to your e-reader device to read it whenever you have time. I personally use a Kindle and hence the name of the project

## Motivation

As many of us, I also have a bookmark with several articles that I want to read, but never find the time to read properly. One of my night rituals is to turn off all of my tech, except the Kindle, and read until I am tired. So I thought I could use this time to decrease my list of to-read articles, and hence wrote this script.

## How does it work?

1. Clone the repository (git clone https://github.com/Bondcoder/kindle-medium-reader)
2. Add the article links that you want to read to the articles.txt file (kindle-medium-reader/ToRead/articles.txt)
3. Checkout to the kindle-medium-reader folder and run 'node index.js'.
4. The individual articles will be under the PDF folder, and the merged version under the global folder.

Functionally, this script will spin up a headless browser (puppeteer) that will open all the articles in the articles.txt file and convert them to pdf. Once that process has finished, all of the pdfs will be merged into a single pdf.

## Limitations

1. To get all of the pictures in good quality, the script needs to scroll to the bottom of the page (increasing the time taken to store each one).
2. The footer class changes from article to article, so it is quite hard to hide the footer in the pdf.
3. Medium only allows to read 5 free articles per session. So new browsers will need to be spun up to get more than 5 articles.

## Tech used

**Built with:**
* [Puppeteer!](https://github.com/puppeteer/puppeteer)
* [pdf-merger-js!](https://www.npmjs.com/package/pdf-merger-js)