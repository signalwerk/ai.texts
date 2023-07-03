const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const path = require("path");

// Define your CSS as a string
const css = `
:root {
  background-color: transparent;
}
`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Process command line arguments
  const url = process.argv[2];
  const baseFolder = process.argv[3];

  if (!url || !baseFolder) {
    console.log("Please provide a URL and base folder as arguments.");
    process.exit(1);
  }

  await page.goto(url);

  // Add custom CSS
  await page.addStyleTag({ content: css });

  // Set the viewport to your desired resolution and deviceScaleFactor
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 4 });

  const elements = await page.$$(".capture");

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const screenshotName = await page.evaluate(
      (el) => el.dataset.screenshotName,
      element
    );

    // Take a PNG screenshot
    const screenshotPNG = await element.screenshot({
      type: "png",
      omitBackground: true,
    });
    await fs.writeFile(
      path.join(baseFolder, `${screenshotName}.png`),
      screenshotPNG
    );
  }

  await browser.close();
})();
