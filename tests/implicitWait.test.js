const { Builder, Browser, By } = require("selenium-webdriver");
jest.setTimeout(30000);

let driver;

test("Implicit Wait Test", async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.manage().setTimeouts({ pageLoad: 10000 });
    await driver.get("https://www.amazon.co.uk");

    await driver.manage().setTimeouts({ implicit: 5000 });
    // This implicit will make all findElement wait up to 10 seconds
    await driver.findElement(By.className("ddd"));
    // this test fails as it can't find the element within 5 seconds

    console.log("Test passed: Element found.");

    // await driver.findElement(By.css(""));
  } catch (e) {
    console.error("Test failed:", e.message);
    throw e;
  } finally {
    await driver.quit();
  }
});
