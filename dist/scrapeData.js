var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
const scrapeData = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: true });
    const page = yield browser.newPage();
    // Helper function to add a delay
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let listings = [];
    let hasNextPage = true;
    yield page.goto('https://www.corcoran.com/search/for-sale/location/northwest-harris-tx-17534130/regionId/119');
    console.log('Navigated to the initial URL.');
    while (hasNextPage) {
        yield page.waitForSelector('[data-e2e-id="listing-card__wrapper"]');
        const currentPageListings = yield page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('[data-e2e-id="listing-card__wrapper"]'));
            return elements.map((el) => el.outerHTML);
        });
        console.log(`Fetched ${currentPageListings.length} listings from the current page.`);
        listings = [...listings, ...currentPageListings];
        console.log(`Total listings fetched so far: ${listings.length}`);
        // Check if there's a next page
        hasNextPage = yield page.evaluate(() => {
            const nextButton = document.querySelector('[data-e2e-id="paginator__next-button-text"]');
            return nextButton != null && !nextButton.hasAttribute('disabled');
        });
        if (hasNextPage) {
            const nextButton = yield page.$('[data-e2e-id="paginator__next-button-text"]');
            if (nextButton) {
                yield nextButton.click();
                console.log('Clicked the next button.');
                // Add an explicit delay of 2 seconds
                yield delay(2000);
            }
        }
    }
    console.log(`Scraping finished. Total listings fetched: ${listings.length}`);
    yield browser.close();
    return listings;
});
export default scrapeData;
