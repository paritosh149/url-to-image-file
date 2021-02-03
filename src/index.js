const App = require('./app/index.js')

console.log('App ready...')

// const url = 'https://en.wikipedia.org/wiki/Long_jump'
// const url = 'https://miro.medium.com/max/700/1*CPSTzfUTCCpUbllyiPvl_A.jpeg'
// const url = 'https://medium.com/javascript-in-plain-english/exploring-chart-js-e3ba70b07aa4'
const url = 'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression'
const chartType = 'bar'
const outputFileName = 'test.png'

App.fetch(url)
  .then(data => {
    console.log(`Fetched ${data.length} bytes.`)
    return App.extractHtmlTables(data)
  })
  .then(tables => {
    console.log(`Html document contains ${tables.length} table${tables.length > 1 ? 's' : ''}.`)
    if (tables.length > 0) {
      // search and return chart data
      const extractTableDataFrom = require('./util/table')
      return extractTableDataFrom(tables)
    }
    throw 'No matching table found'
  })
  .then(chartData => {
    // convert chart data to image stream
    const stream = App.chart(chartData.labels, chartData.numericValues, chartType)
    // save image data to file
    const streamToFile = require('./util/file')
    streamToFile(stream, outputFileName)
  })
  .catch(error => {
    console.log('Error encountered: ' + error)
  })
