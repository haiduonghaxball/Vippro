const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log("🚀 Đang mở Haxball Headless...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headless', { waitUntil: 'networkidle2' });

  // Chờ Haxball load HBInit
  await page.waitForFunction(() => typeof HBInit !== 'undefined');
  console.log("✅ Haxball Headless đã load.");

  // Load script RS.js + ép return room link
  const script = fs.readFileSync('./RS.js', 'utf8');
  const roomLink = await page.evaluate(script => {
    eval(script);
    return room.roomLink;
  }, script);

  console.log("🎯 ROOM LINK:", roomLink);
})();
