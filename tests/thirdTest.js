const { By, Builder, Browser, until } = require("selenium-webdriver");
const assert = require("assert");

(async function firstTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver
      .navigate()
      .to("https://www.selenium.dev/selenium/web/web-form.html");

    let title = await driver.getTitle();
    assert.equal("Web form", title);

    await driver.manage().setTimeouts({ implicit: 2000 });

    let textBox = await driver.findElement(By.name("my-text"));

    await textBox.sendKeys("Selenium");

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    let submitButton = await driver.findElement(By.css("button"));

    await submitButton.click();

    let message = await driver.findElement(By.id("message"));
    let value = await message.getText();
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    assert.equal("Received!", value);

    // Wait for 2 seconds before closing the browser

    await driver.navigate().back();
    await driver.sleep(3000); // wait until the page is loaded back.  without this sleep, it fails.

    await driver.wait(until.titleIs("Web form"));

    const textarea = await driver.wait(
      until.elementLocated(By.css("textarea[name='my-textarea']")),
      10000
    );
    await driver.wait(until.elementIsVisible(textarea), 5000);
    await driver.wait(until.elementIsEnabled(textarea), 5000);
    await textarea.click(); // フォーカスを与える
    await textarea.sendKeys("Mariko0215");
    // await driver.sleep(2000);

    // await driver.wait(until.elementLocated(By.name("my-password")), 5000);
    // const passwordField = await driver.findElement(By.name("my-password"));
    // await passwordField.sendKeys("Mariko0215");
    submitButton = await driver.findElement(By.css("button"));

    await submitButton.click();

    message = await driver.findElement(By.id("message"));
    await new Promise((resolve) => setTimeout(resolve, 2000));

    value = await message.getText();

    assert.equal("Received!", value);

    await driver.navigate().back();
    await driver.sleep(3000); //
    //  ペ
    title = await driver.getTitle();
    assert.equal("Web form", title);

    const password = await driver.wait(
      until.elementLocated(By.name("my-password"))
    );

    // await driver.wait(until.elementIsVisible(textarea), 5000);
    // await driver.wait(until.elementIsEnabled(textarea), 5000);
    // await textarea.click(); // フォーカスを与える
    await password.sendKeys("Mariko0215");
    // await driver.sleep(1000);

    submitButton = await driver.findElement(By.css("button"));

    await submitButton.click();

    message = await driver.findElement(By.id("message"));
    await new Promise((resolve) => setTimeout(resolve, 2000));

    value = await message.getText();

    assert.equal("Received!", value);

    await driver.navigate().refresh();
    // await driver.sleep(2000);

    const windowSize = await driver.manage().window().getSize();
    console.log(windowSize.width, windowSize.height);
    await driver.sleep(2000);

    //
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
})();
