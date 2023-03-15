// scrape_and_save.mjs
import fs from 'fs/promises';
import scrapeData from './scrapeData.js';

(async () => {
  const listings = await scrapeData();
  
  // Save the listings data to a file
  try {
    await fs.writeFile('listings_data.json', JSON.stringify(listings));
    console.log('Listings data saved to listings_data.json');
  } catch (error) {
    console.error('Error saving listings data:', error);
  }
})();
