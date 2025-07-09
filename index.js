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

  // Chờ Haxball load xong HBInit
  await page.waitForFunction(() => typeof HBInit !== 'undefined');
  console.log("✅ Haxball Headless đã load.");

  // Load script RS.js
  const script = fs.readFileSync('./RS.js', 'utf8');
  await page.evaluate(script => {
    eval(script);
  }, script);
  console.log("✅ Đã inject RS.js vào room.");

  // Chờ room được tạo xong
  await page.waitForFunction(() => typeof room !== 'undefined' && room.roomLink !== undefined);
  console.log("✅ Room đã được tạo.");

  // Lấy link room
  const roomLinkHandle = await page.evaluateHandle(() => room.roomLink);
  const roomLink = await roomLinkHandle.jsonValue();
  console.log("🎯 ROOM LINK:", roomLink);
})();
