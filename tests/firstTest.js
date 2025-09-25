const { By, Builder, Browser } = require("selenium-webdriver");
const assert = require("assert");

(async function firstTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html");

    let title = await driver.getTitle();
    assert.equal("Web form", title);

    await driver.manage().setTimeouts({ implicit: 2000 });

    let textBox = await driver.findElement(By.name("my-text"));
    let submitButton = await driver.findElement(By.css("button"));

    await textBox.sendKeys("Selenium");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await submitButton.click();

    let message = await driver.findElement(By.id("message"));
    let value = await message.getText();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    assert.equal("Received!", value);
    console.log("✅ Test passed: form submitted successfully.");
  } catch (e) {
    console.log("test failed", e);
  } finally {
    await driver.quit();
  }
})();
