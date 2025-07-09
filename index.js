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

  await page.waitForFunction(() => typeof HBInit !== 'undefined');
  console.log("✅ Haxball Headless đã load.");

  const script = fs.readFileSync('./RS.js', 'utf8');
  const roomLink = await page.evaluate(async (script) => {
    eval(script);
    console.log("✅ Script injected, waiting for room...");

    while (typeof room === 'undefined' || typeof room.roomLink === 'undefined') {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return room.roomLink;
  }, script);

  console.log("🎯 ROOM LINK:", roomLink);
})();
