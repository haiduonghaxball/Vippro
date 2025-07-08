const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  });
  const page = await browser.newPage();
  console.log("🚀 Đang mở Haxball...");
  await page.goto('https://www.haxball.com/headless', {waitUntil: 'networkidle2'});

  const fs = require('fs');
  const script = fs.readFileSync('RS.js', 'utf8');

  await page.evaluate(script => {
    eval(script);
  }, script);

  console.log("✅ Server Haxball Headless đã chạy.");
})();