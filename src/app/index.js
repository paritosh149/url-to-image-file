const CONTENT_TYPE_TEXT_HTML = 'text/html'
class UrlToChartImage {
  constructor() {

  }

  fetch = async url => {
    const axios = require("axios");
    const response = await axios.get(url);
    const contentType = response.headers['content-type'].toLowerCase()
    if (!contentType.startsWith(CONTENT_TYPE_TEXT_HTML)) {
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
      $('tbody > tr', element1).each((index, element) => {
        const tds = $(element).find("td");
        const tableRow = [];
        $(tds).each((i, element) => {
          const text = $(element).text().trim().replace('\n','');
          if (text.length > 0)
            tableRow.push(text);
        });
        if(tableRow.length > 0)
          scrapedData.push(tableRow);
      });
      if(scrapedData.length > 0)
        scrapedTables.push(scrapedData)
    })
    return scrapedTables;
  }

  chart = (labels, dataPoints) => {
    const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

    const fs = require('fs')
    const width = Math.max(labels.length * 20, 400); //px
    const height = 400; //px

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const configuration = {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '',
          data: dataPoints,
          // backgroundColor: [
          //     'rgba(255, 99, 132, 0.2)',
          //     'rgba(54, 162, 235, 0.2)',
          //     'rgba(255, 206, 86, 0.2)',
          //     'rgba(75, 192, 192, 0.2)',
          //     'rgba(153, 102, 255, 0.2)',
          //     'rgba(255, 159, 64, 0.2)'
          // ],
          // borderColor: [
          //     'rgba(255,99,132,1)',
          //     'rgba(54, 162, 235, 1)',
          //     'rgba(255, 206, 86, 1)',
          //     'rgba(75, 192, 192, 1)',
          //     'rgba(153, 102, 255, 1)',
          //     'rgba(255, 159, 64, 1)'
          // ],
          // borderWidth: 1
        }]
      },
      // options: {
      //     scales: {
      //         yAxes: [{
      //             ticks: {
      //                 beginAtZero: true,
      //                 callback: (value) => '$' + value
      //             }
      //         }]
      //     }
      // },
      // plugins: {
      //     annotation: {
      //     }
      // }
    };
    const mimeType = 'image/png'
    const stream = chartJSNodeCanvas.renderToStream(configuration, mimeType);
    const data = [];
    stream.on('data', (chunk) => {
      data.push(chunk);
    });
    stream.on('end', () => {
      // console.log("End: "+data);
      fs.writeFileSync("test.png", Buffer.concat(data))
    });
    stream.on('finish', () => {
      // console.log("Finished: " + data);
    });
    stream.on('error', (error) => {

    });
  }
}

module.exports = UrlToChartImage
