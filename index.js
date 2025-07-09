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

  // Đợi HBInit sẵn sàng
  await page.waitForFunction(() => typeof HBInit !== 'undefined');
  console.log("✅ Haxball Headless đã load xong.");

  // Đọc script RS.js
  const script = fs.readFileSync('./RS.js', 'utf8');

  // Inject script
  await page.evaluate(script => {
    eval(script);
    console.log("✅ Đã load script RS.js vào room.");
  }, script);

  // Lấy room link
  const roomLinkHandle = await page.evaluateHandle(() => room.roomLink);
  const roomLink = await roomLinkHandle.jsonValue();
  console.log("🎯 ROOM LINK:", roomLink);

})(); 
