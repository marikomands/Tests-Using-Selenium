const { By, Builder, Browser, until } = require("selenium-webdriver");

(async function testWithMouseMove() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver
      .navigate()
      .to("https://shop.aeon.com/netsuper/01050000002350/");

    const element = await driver.wait(
      until.elementLocated(By.css("img[alt*='発酵バター 62g']")),
      5000
    );

    await driver.manage().window().maximize();

    await driver.executeScript(
      "arguments[0].scrollIntoView({ block: 'center' });",
      element
    );
    // const element = await driver.findElement(
    //   By.css(
    //     "img[src*='v2/media/ghs-mktg/73b293fe-333b-4f77-b2e2-754cda3533e4/rounded_super_department_AlcoholFree_ProductALT.jpeg?']"
    //   )
    // )
    // // element.scrollIntoView({ block: "center" });　no mouse movement; img is move to center of screen
    driver
      .actions()
      .move({ origin: element })
      //  ↑ mouse movement involved
      .pause(2000)
      .press()
      .pause(2000)
      .release()

      // または、.click(element)でもOK
      .perform();

    await driver.sleep(5000);
    console.log("✅ Test passed: mouse moved to element and clicked.");
  } catch (e) {
    console.log("test failed", e);
  } finally {
    console.log("🧹 Cleaning up: quitting driver...");
    if (driver) {
      await driver.quit();
      console.log("✅ Driver quit successfully.");
    }
    process.exit(0); // 強制終了
  }
})();
