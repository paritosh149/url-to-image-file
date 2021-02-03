module.exports = (tables) => {
    const numeral = require('numeral')
    const chartData = { labels: [], numericValues: [] }
    tables.every(table => {
        if (table.length === 0)
            return true
        const columnCount = table[0].length
        let isValidTable = false
        let numericValues = []
        let indexOfValuesColumn = 0
        // Search for first numeric column
        for (indexOfValuesColumn = 0; indexOfValuesColumn < columnCount; indexOfValuesColumn++) {
            numericValues = table.map(row => numeral(row[indexOfValuesColumn].match(/[\d\.]+/)).value())
            isValidTable = numericValues.every(val => !isNaN(val) && val !== null)
            if (isValidTable)
                break
        }
        if (isValidTable) {
            // Search for First column that is not 'numeric' and assume it to be labels
            let labels
            for (indexOfLabels = 0; indexOfLabels < columnCount; indexOfLabels++) {
                if (indexOfLabels !== indexOfValuesColumn) {
                    labels = table.map(row => row[indexOfLabels])
                    break
                }
            }
            chartData.labels = labels
            chartData.numericValues = numericValues
            // Exit loop after emiting first valid chart
            return false
        }
        // Continue to process next table
        return true
    })
    return chartData
}