const DEFAULT_FILENAME = 'test.png'
module.exports = (stream, outputFileName) => {
  const data = []
  stream.on('data', (chunk) => {
    data.push(chunk)
  })
  stream.on('end', async () => {
    console.log('Chart rendered successfully.')

    //Save the data to a file
    const fs = require('fs')
    const filename = outputFileName ? outputFileName : DEFAULT_FILENAME
    fs.writeFileSync(filename, Buffer.concat(data))

    console.log('Chart saved to ' + filename)
  })
  stream.on('error', (error) => {
    throw error
  })
}
