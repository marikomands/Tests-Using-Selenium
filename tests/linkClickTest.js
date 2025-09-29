const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");

(async function linkClickTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://jqueryui.com/droppable/");

    await driver.sleep(1000); // ページが表示されるか確認

    // await driver.switchTo().frame(0); // iframe内にあるので切り替えが必要

    let title = await driver.getTitle();
    assert.equal("Droppable | jQuery UI", title);

    // await driver.wait(until.elementLocated(By.linkText("Accept")), 5000);
    const ele = await driver.findElement(By.linkText("Accept"));

    await driver.actions().contextClick(ele).perform();
    await driver.actions().doubleClick(ele).perform();
    await driver.sleep(2000);

    console.log("✅ Test passed: element clicked.");

    await driver.get("https://jqueryui.com/tooltip/");

    await driver.sleep(2000); // ページが表示されるか確認

    await driver.switchTo().frame(0); // iframe内にあるので切り替えが必要

    title = await driver.getTitle();
    assert.equal("Tooltip | jQuery UI", title);

    const ageInput = await driver.wait(
      until.elementLocated(By.id("age")),
      1000
    );
    await driver
      .actions()
      .move({ origin: ageInput })
      .contextClick(ageInput)
      .sendKeys("44")
      .perform();

    await driver.sleep(2000);
    console.log("✅ Test passed: Text inputted.");
  } catch (e) {
    console.error("❌ Test failed:", e);
  } finally {
    await driver.quit();
  }
})();
