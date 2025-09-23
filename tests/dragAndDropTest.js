const { By, Builder, Browser } = require("selenium-webdriver");

(async function dragAndDropTest() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get(
      "https://www.selenium.dev/selenium/web/droppableItems.html"
    );
    const srcEle = await driver.findElement(By.id("draggable"));
    const targetEle = await driver.findElement(By.id("droppable"));
    await driver
      .actions({ async: true })
      .dragAndDrop(srcEle, targetEle)
      .perform();

    console.log("✅ Test passed: element dragged.");

    await driver.sleep(2000);
  } catch (e) {
    console.log("test failed", e);
  } finally {
    await driver.quit();
  }
});
