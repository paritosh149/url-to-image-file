const App = require('./app/index.js')
const AppInstance = new App()

console.log('App instance ready...')

// const url = "https://en.wikipedia.org/wiki/Long_jump";

const url = "https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression";


AppInstance.fetch(url).then(data => {
    console.log('Fetched ' + data.length)
    const numeral = require('numeral')
    const tables = AppInstance.extractHtmlTables(data)
    tables.every(table => {
        // First column is assumed to be labels

        // Search for first numeric column
        const cols = table[0].length;
        let isValidTable = false
        let numericValues = []
        let indexOfValues = 0;
        for (indexOfValues = 0; indexOfValues < cols; indexOfValues++) {
            numericValues = table.map(row => numeral(row[indexOfValues].match(/[\d\.]+/)).value())
            isValidTable = numericValues.every(val => !isNaN(val) && val !== null)
            if (isValidTable)
                break;
        }
        let indexOfLabels = 0;
        let labels;
        for (indexOfLabels = 0; indexOfLabels < cols; indexOfLabels++) {
            if (indexOfLabels !== indexOfValues) {
                labels = table.map(row => row[indexOfLabels])
                break;
            }
        }
        if (isValidTable) {
            AppInstance.chart(labels, numericValues)
            // Exit loop after emiting first valid chart
            return false
        }
        return true
    })
})
