const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const query = "your search query"; // Change this to your desired search query

  await page.goto(`https://www.google.com/search?q=${query}`);

  // wait for the search results to load
  await page.waitForSelector("div.g");

  // extract search results
  const searchResults = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll("div.g").forEach((item) => {
      const title = item.querySelector("h3").innerText;
      const link = item.querySelector("a").href;
      results.push({ title, link });
    });
    return results;
  });

  // console results
  console.log("Search results for:", query);
  searchResults.forEach((result, index) => {
    console.log(`${index + 1}. ${result.title}`);
    console.log(`   ${result.link}`);
  });

  await browser.close();
})();
