const CONTENT_TYPE_TEXT_HTML = 'text/html'
const DEFUALT_MIME_TYPE = 'image/png'

class HtmlToChart {
  static fetch = async url => {
    const axios = require('axios')
    const response = await axios.get(url)
    const contentType = response.headers['content-type'].toLowerCase()
    if (!contentType.startsWith(CONTENT_TYPE_TEXT_HTML)) {
      throw 'Response is not HTML. Cannot convert.'
    }
    return response.data
  }

  static extractHtmlTables = async (doc) => {
    const cheerio = require('cheerio')
    const $ = cheerio.load(doc)
    const scrapedTables = []

    await $('table.wikitable').each((index1, tableElement) => {
      const scrapedData = []
      $('tbody > tr', tableElement).each((index, rowElement) => {
        const tds = $(rowElement).find('td')
        const tableRow = []
        $(tds).each((i, element) => {
          const text = $(element).text().trim().replace('\n', '')
          if (text.length > 0)
            tableRow.push(text)
        })
        if (tableRow.length > 0)
          scrapedData.push(tableRow)
      })
      if (scrapedData.length > 0)
        scrapedTables.push(scrapedData)
    })
    return scrapedTables
  }

  static chart = (labels, dataPoints, chartType) => {
    const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
    const { DEFAULT_IMAGE_SIZE } = require('../constants')
    const poolColors = require('../util/color')

    const SIZE_PER_LABEL = 20
    const width = Math.max(labels.length * SIZE_PER_LABEL, DEFAULT_IMAGE_SIZE)
    const height = DEFAULT_IMAGE_SIZE

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height })

    const configuration = {
      type: chartType,
      data: {
        labels,
        datasets: [{
          label: 'Values',
          backgroundColor: poolColors(dataPoints.length),
          borderColor: poolColors(dataPoints.length),
          borderWidth: 1,
          data: dataPoints,
        }]
      }
    }

    return chartJSNodeCanvas.renderToStream(configuration, DEFUALT_MIME_TYPE)
  }
}

module.exports = HtmlToChart
