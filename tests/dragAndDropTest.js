const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");

(async function dragAndDropTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://jqueryui.com/droppable/");

    await driver.sleep(2000); // ページが表示されるか確認

    await driver.switchTo().frame(0); // iframe内にあるので切り替えが必要

    let title = await driver.getTitle();
    assert.equal("Droppable | jQuery UI", title);

    await driver.wait(until.elementLocated(By.id("draggable")), 1000);
    const srcEle = await driver.findElement(By.id("draggable"));
    const targetEle = await driver.findElement(By.id("droppable"));

    await driver
      .actions({ async: true })
      .dragAndDrop(srcEle, targetEle)
      .perform();

    console.log("✅ Test passed: element dragged.");
    await driver.sleep(2000);
  } catch (e) {
    console.error("❌ Test failed:", e);
  } finally {
    await driver.quit();
  }
})();
