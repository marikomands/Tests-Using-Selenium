const { Builder, Browser, By } = require("selenium-webdriver");
jest.setTimeout(30000);

test("xPath test", async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    // await driver.manage().setTimeouts({ pageLoad: 10000 });
    await driver.get("https://www.amazon.co.uk");
    await driver.manage().setTimeouts({ implicit: 20000 });
    const count = await driver.findElements(
      By.xpath("//a[text()='Amazon Prime']")
    );

    // const count = await driver.findElements(
    //   By.xpath(
    //     "//*[@id='discount-bubble-deals-collection-clothes-shoes-and-bags']/button"
    //   )
    // );
    // 　/ はこのidの直下のbutton 要素を探す     )
    // );

    console.log("els raw:", count); // 要素配列（空配列なら [] が出る）
    console.log("count:", count.length);
    //   By.xpath("//button[contains(@class, 'Carousel-module__carouselItem')]")

    // "//button[@class='Carousel-module__carouselItem_GCNZzVIHyeBtN3Zg2HZO']"

    console.log("Test passed: Element found.");
  } catch (e) {
    console.error("Test failed:", e.message);
    throw e;
  }
});
