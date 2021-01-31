const CONTENT_TYPE_TEXT_HTML = 'text/html'
class UrlToChartImage {
    constructor() {

    }

    fetch = async url => {
            const axios = require("axios");
            const response = await axios.get(url);
            const contentType = response.headers['content-type'].toLowerCase()
            if(!contentType.startsWith(CONTENT_TYPE_TEXT_HTML)) {
                throw 'Response is not HTML. Cannot convert.'
            }
            return response.data;
        }

    extractHtmlTables = (doc) => {
        const cheerio = require("cheerio");
        const $ = cheerio.load(doc);
        const scrapedTables = [];
        
        $("table.wikitable").each((index1, element1) => {
            const scrapedData = [];
            const tableHeaders = [];
            const isHeaderFound = false;
            $('thead > tr', element1).first((index, element) => {
                    isHeaderFound = true
                  const ths = $(element).find("th");
                  $(ths).each((i, element) => {
                    tableHeaders.push(
                      $(element)
                        .text()
                        .toLowerCase()
                    );
                })
            })
            $('tbody > tr', element1).each((index, element) => {
            if (!isHeaderFound && index === 0) {
              const ths = $(element).find("th");
              $(ths).each((i, element) => {
                tableHeaders.push(
                  $(element)
                    .text()
                    .toLowerCase()
                );
              });
              return true;
            }
            const tds = $(element).find("td");
            const tableRow = {};
            $(tds).each((i, element) => {
              tableRow[i] = $(element).text();
            });
            scrapedData.push(tableRow);
          });
          scrapedTables.push(scrapedData)
        })
          console.log(scrapedTables);
    }
}

module.exports = UrlToChartImage
