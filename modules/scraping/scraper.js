// scraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const Company = require('../companyModule/company.schema');

/**
 * Scrapes company information from a given URL.
 * @param {string} url - The URL of the company's website.
 * @returns {Promise<Object>} - The company information.
 */
async function scrapeCompanyInfo(url) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
  
      // Extract company details
      const name = $('meta[property="og:site_name"]').attr('content') || $('title').text().trim();
      const description = (
        $('meta[name="description"]').attr('content') ||
        $('meta[property="og:description"]').attr('content') ||
        $('meta[property="twitter:description"]').attr('content')
      )?.trim();
      const contactInfo = $('a[href^="mailto:"]').attr('href') || $('a[href^="tel:"]').attr('href');
      
      // Function to clean up text
      const cleanText = (text) => text ? text.replace(/\s+/g, ' ').trim() : '';
  
      // Extract other details from the body
      const otherDetails = {};
      $('body').find('*').each((index, element) => {
        const tagName = $(element).prop('tagName');
        const text = $(element).text().trim();
        if (text && tagName !== 'SCRIPT' && tagName !== 'STYLE') {
          otherDetails[tagName] = cleanText(text);
        }
      });
  
      // Create and save company record
      const company = new Company({
        name,
        website: url,
        description,
        contactInfo,
        otherDetails
      });
  
      await company.save();
      return company;
    } catch (error) {
      console.error('Error scraping company info:', error);
      throw error;
    }
  }
  
  module.exports = scrapeCompanyInfo;