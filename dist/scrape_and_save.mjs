var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// scrape_and_save.mjs
import fs from 'fs/promises';
import scrapeData from './scrapeData.js';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield scrapeData();
    // Save the listings data to a file
    try {
        yield fs.writeFile('listings_data.json', JSON.stringify(listings));
        console.log('Listings data saved to listings_data.json');
    }
    catch (error) {
        console.error('Error saving listings data:', error);
    }
}))();
