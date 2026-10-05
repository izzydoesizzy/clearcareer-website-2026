import puppeteer from "puppeteer";

const URL = "http://localhost:4321/community";
const errors = [];

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});

async function shoot(name, width, height, opts = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  if (opts.reduceMotion) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  }
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${name}] ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${name}] PAGEERROR ${e.message}`));
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));
  // full page
  await page.screenshot({ path: `/tmp/cc-${name}-full.png`, fullPage: true });
  // hero viewport
  await page.screenshot({ path: `/tmp/cc-${name}-hero.png` });
  await page.close();
}

await shoot("desktop", 1440, 900);
await shoot("mobile", 390, 844);
await shoot("reduced", 1440, 900, { reduceMotion: true });

// Wheel-scroll capture to confirm scroll-triggered reveals + horizontal pin fire.
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.mouse.move(720, 450);
  const stops = [1600, 3200, 4800, 6400];
  for (let i = 0; i < stops.length; i++) {
    await page.evaluate(async (y) => {
      const lenis = window.__ccLenis;
      if (lenis) lenis.scrollTo(y, { immediate: false });
      else window.scrollTo(0, y);
    }, stops[i]);
    await new Promise((r) => setTimeout(r, 1400));
    await page.screenshot({ path: `/tmp/cc-scroll-${i}.png` });
  }
  await page.close();
}

await browser.close();

if (errors.length) {
  console.log("CONSOLE/PAGE ERRORS:\n" + errors.join("\n"));
} else {
  console.log("No console or page errors.");
}
