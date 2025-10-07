const { Builder, By, Browser, Key, until } = require("selenium-webdriver");
jest.setTimeout(30000);
let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

test("Alert Button Test", async () => {
  try {
    await driver.get("https://www.selenium.dev/selenium/web/alerts.html");

    const alertBTN = await driver.findElement(By.id("alert"));
    await alertBTN.click();
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    // アラートに操作対象を切り替える。アラートを操作しますというモードになる。セレニアムは、ページのDOM要素を操作するツール。アラートは、ブラウザのネイティブで、DOMの外側にあるUI。切り替えないと使えない。
    // ↑ be able to access alertmodel, cannot access DOM while alert is showing up.  Need to close alert to access DOM again.
    const alertText = await alert.getText();
    console.log("Alert text:", alertText);
    await driver.sleep(2000);
    await alert.accept();
    await driver.sleep(5000);
    console.log("Test Succeeded!");
  } catch (e) {
    console.error("Test failed:", e);
    throw e;
  }
});
