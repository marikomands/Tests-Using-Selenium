const { until, By, Builder, Browser, Key } = require("selenium-webdriver");
const assert = require("assert");

(async function firstTest() {
  let driver;

  //   this test fails
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://www.google.com");
    let title = await driver.getTitle();
    assert.equal("Google", title);

    // const textBox = await driver.findElement(By.name("q"));
    // console.log("タグ名:", await textBox.getTagName());
    // console.log("位置:", await textBox.getRect());
    // console.log("HTML:", await textBox.getAttribute("outerHTML"));

    const textBox = await driver.wait(
      until.elementLocated(By.css("textarea[name='q']")),
      5000
    );
    await driver.wait(until.elementIsVisible(textBox), 5000);
    await driver.wait(until.elementIsEnabled(textBox), 5000);
    await textBox.click();
    await textBox.sendKeys("Webdriver", Key.RETURN);

    // console.log("表示されてる？", await textBox.isDisplayed());
    // console.log("有効？", await textBox.isEnabled());

    // const tagName = await textBox.getTagName();
    // console.log("タグ名は？", tagName);

    await driver.wait(until.titleIs("Webdriver - Google Search"), 5000);

    assert.equal("Webdriver - Google Search", await driver.getTitle());
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
})();
