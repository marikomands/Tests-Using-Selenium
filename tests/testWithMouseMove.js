const { By, Builder, Browser, until } = require("selenium-webdriver");

(async function testWithMouseMove() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.navigate().to("http://www.tesco.com");
    const element = await driver.findElement(
      By.css("img[src*='Pizzaexpress.jpeg']")
    );
    // element.scrollIntoView({ block: "center" });　no mouse movement; img is move to center of screen
    driver
      .actions()
      .move({ origin: element })
      //  ↑ mouse movement involved
      .pause(2000)
      .press()
      .pause(2000)
      .release()
      .perform();
    console.log("✅ Test passed: mouse moved to element and clicked.");
  } catch (e) {
    console.log("test failed", e);
  } finally {
    await driver.quit();
  }
})();
