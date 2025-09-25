const { By, Builder, Browser, until } = require("selenium-webdriver");

(async function firstTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.navigate().to("http://www.tesco.com");
    // Since this is exact match query it fails.  h=205&;w=205 is not matching
    // executeScript()を使う場合Javanoコードを文字列として渡さないといけない
    await driver.executeScript(`document.querySelector("img[src='https://digitalcontent.api.tesco.com/v2/media/homepage/5373f026-fdea-47a2-82ea-ce7660bb7a86/Pizzaexpress.jpeg?h=205&;w=205']")
        ?.scrollIntoView();
        `);
    console.log("✅ Test passed: element was scrolled into view.");

    await driver.sleep(5000);
  } catch (e) {
    console.log("test failed", e);
  } finally {
    await driver.quit();
  }
})();

// This code navigates to the Amazon UK homepage and scrolls to the "Your Account" link.
