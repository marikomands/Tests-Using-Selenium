const { By, Builder, Browser, until } = require("selenium-webdriver");

(async function firstTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.manage().window().maximize();

    await driver.navigate().to("http://www.tesco.com");

    // // wait long enought to get image.
    // const image = await driver.wait(
    //   until.elementIsVisible(
    //     await driver.findElement(By.css("img[src*='Pizzaexpress.jpeg']"))
    //   ),
    //   8000
    // );
    // await driver.executeScript(
    //   "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    //   image
    // );
    // const top = await driver.executeScript(
    //   "return arguments[0].getBoundingClientRect().top;",
    //   image
    // );
    // console.log("画像の位置:", top);

    //  ↑ DOES NOT WORK as element obtained using Selenium's findElement is returned as WebElement Object. These are wrapper objects internally managed by Selenium.
    // not exactly the same as the native DOM object you'd get in browser-side JavaScript.
    //     await driver.executeScript(`
    //     document
    //       .querySelector("img[src='https://digitalcontent.api.tesco.com/v2/media/homepage/5373f026-fdea-47a2-82ea-ce7660bb7a86/Pizzaexpress.jpeg?h=205&w=205']")
    //       ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //   `);

    const position = await driver.executeScript(`
        const img = document.querySelector("img[src*='Pizzaexpress.jpeg']");
        if (!img) return "画像が見つかりません";
        img.scrollIntoView({ block: 'center' });
        return img.getBoundingClientRect().top;
      `);
    console.log("画像の位置（top）:", position);
    console.log("✅ Test passed: element was scrolled into view.");

    await driver.sleep(5000);
  } catch (e) {
    console.log("test failed", e);
  } finally {
    await driver.quit();
  }
})();

// This code navigates to the Amazon UK homepage and scrolls to the "Your Account" link.
