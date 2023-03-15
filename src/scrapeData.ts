import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const scrapeData = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Helper function to add a delay
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  let listings: string[] = [];
  let hasNextPage: boolean = true;

  await page.goto('https://www.corcoran.com/search/for-sale/location/northwest-harris-tx-17534130/regionId/119');
  console.log('Navigated to the initial URL.');

  while (hasNextPage) {
    await page.waitForSelector('[data-e2e-id="listing-card__wrapper"]');

    const currentPageListings: string[] = await page.evaluate((): string[] => {
      const elements: Element[] = Array.from(document.querySelectorAll('[data-e2e-id="listing-card__wrapper"]'));
      return elements.map((el: Element) => el.outerHTML);
    });

    console.log(`Fetched ${currentPageListings.length} listings from the current page.`);

    listings = [...listings, ...currentPageListings];
    console.log(`Total listings fetched so far: ${listings.length}`);

    // Check if there's a next page
    hasNextPage = await page.evaluate((): boolean => {
      const nextButton: HTMLElement | null = document.querySelector('[data-e2e-id="paginator__next-button-text"]');
      return nextButton != null && !nextButton.hasAttribute('disabled');
    });

    if (hasNextPage) {
      const nextButton = await page.$('[data-e2e-id="paginator__next-button-text"]');
      if (nextButton) {
        await nextButton.click();
        console.log('Clicked the next button.');

        // Add an explicit delay of 2 seconds
        await delay(2000);
      }
    }
  }

  console.log(`Scraping finished. Total listings fetched: ${listings.length}`);
  await browser.close();

  return listings;
};

export default scrapeData;
