const App = require('../src/app')
const mockAxios = require('axios')
jest.mock('axios')

describe('Url to Html', () => {
  it('fetches data successfully', () => {
    const url = 'https://abc.def/wiki/somepage';
    const mockUrlResponse = {
      headers: {
        'content-type': 'text/html'
      },
      data: '<html />'
    }
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(mockUrlResponse)
    );
    return App.fetch(url).then(data => expect(data).toEqual(mockUrlResponse.data))
  })

  it('fetch fails with error', () => {
    const url = 'https://abc.def/wiki/somepage';
    const mockUrlResponse = {
      headers: {
        'content-type': 'text/javascript'
      },
      data: '<script />'
    }
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(mockUrlResponse)
    );
    return App.fetch(url).then(data => { }).catch(error => expect(error).not.toBeNull())
  })
})

describe('Extract tables from Html', () => {
  it('extracts one table', () => {
    const html = '<table class="wikitable"><tbody><tr><td>1</td><td>A</td></tr><tr><td>2</td><td>B</td></tr></tbody</table>'
    return App.extractHtmlTables(html).then(tableArray => expect(tableArray.length).toEqual(1))
  })
  it('fails with error', () => {
    const html = '<table class=""><tbody><tr><td>1</td><td>A</td></tr><tr><td>2</td><td>B</td></tr></tbody</table>'
    return App.extractHtmlTables(html).then().catch(error => expect(error).not.toBeNull())
  })
})

describe('Renders Chart from input data and labels', () => {
  it('chart image stream is emitted successfully', () => {
    const labels = ['A', 'B']
    const numericData = [1, 2]
    const chartType = 'pie'

    const stream = App.chart(labels, numericData, chartType)
    return streamToBuffer(stream).then(buffer => expect(buffer.length).toBeGreaterThan(0))
  })
})

async function streamToBuffer(stream) {
  const data = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => {
      data.push(chunk);
    });
    stream.on('end', () => {
      const buffer = Buffer.concat(data);
      resolve(buffer);
    });
    stream.on('error', (error) => {
      reject(error);
    });
  });
}