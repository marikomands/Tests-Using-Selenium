const { By, Builder, until } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");
// let options = new chrome.Options();
// options.addArguments("--start-maximized"); // GUIで起動

console.log("🚀 Script started");

(async function inputAndHoverTextTest() {
  let driver = await new Builder()
    .forBrowser("chrome")
    // .setChromeOptions(options)
    .build();

  try {
    console.log("🌐 Opening page...");
    await driver.get("https://jqueryui.com/tooltip/");
    console.log("✅ Page opened");
    await driver.sleep(2000); // ページが表示されるか確認

    console.log("✅ Page opened successfully.");

    await driver.switchTo().frame(0); // iframe内にあるので切り替えが必要

    const input = await driver.wait(until.elementLocated(By.id("age")), 1000);

    // await driver.actions({ async: true }).move({ origin: input }).perform();

    await input.sendKeys("30");

    const tooltip = await driver.wait(
      until.elementLocated(By.className("ui-tooltip")),
      3000
    );
    // const tooltip = await driver.findElement(By.className("ui-tooltip"));
    const tooltipText = await tooltip.getText();
    console.log("Tooltip text:", tooltipText); // ツールチップのテキストを表示

    await driver.sleep(2000);

    if (
      tooltipText?.trim() ===
      "We ask for your age only for statistical purposes."
    ) {
      console.log("Tooltip text is correct.");
    } else {
      console.log("Tooltip text is incorrect.");
    }
    console.log("✅ Test passed: Tooltip text retrieved.");
  } catch (e) {
    console.error("❌ Test failed:", e);
  } finally {
    await driver.quit();
  }
})();
