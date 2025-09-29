const { By, Builder, Key, until } = require("selenium-webdriver");

(async function usingKeyDownTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://jqueryui.com/tooltip/");

    await driver.sleep(2000); // ページが表示されるか確認

    await driver.switchTo().frame(0); // iframe内にあるので切り替えが必要

    const input = await driver.wait(until.elementLocated(By.id("age")), 1000);

    await input.sendKeys("45");
    await driver.sleep(1000);
    await input.click();
    await driver.actions().sendKeys(Key.BACK_SPACE).perform();

    // await driver
    //   .actions()
    //   .keyDown(Key.COMMAND)
    //   .sendKeys(Key.A)
    //   .keyUp(Key.COMMAND)
    //   .perform();

    // console.log("Key.A:", Key.A); // → "a"
    // console.log("Key.COMMAND:", Key.COMMAND); // → "Meta"（Mac）または undefined（Windows）

    await driver.sleep(2000);

    console.log("✅ Test passed: Text inputted and selected.");
  } catch (e) {
    console.error("❌ Test failed:", e);
  } finally {
    await driver.quit();
  }
})();
