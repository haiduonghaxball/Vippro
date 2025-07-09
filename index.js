const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log("🚀 Đang mở Haxball...");
  const browser = await puppeteer.launch({
    headless: "new", // fix warning headless
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headless', { waitUntil: 'networkidle2' });

  const script = fs.readFileSync('./RS.js', 'utf8');
  await page.evaluate(script => {
    eval(script);
  }, script);

  console.log("✅ Server Haxball Headless đã chạy. Room đang hoạt động.");
})();
