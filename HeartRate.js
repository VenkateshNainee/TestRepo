const fs = require('fs');

function calculateMedian(values) {
    const sortedValues = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
        return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
    } else {
        return sortedValues[middle];
    }
}

// Read heart rate data from input file
const heartRateData = JSON.parse(fs.readFileSync('heartrate.json', 'utf8'));

// Process the data and calculate statistics
const outputData = [];

heartRateData.forEach(dayData => {
    const date = dayData.date;
    //const measurements = dayData.measurements;
    if (dayData.measurements && Array.isArray(dayData.measurements)) {
        const measurements = dayData.measurements;

    // Extract beats per minute and timestamps
    const bpmValues = measurements.map(measurement => measurement.bpm);
    const timestamps = measurements.map(measurement => new Date(measurement.timestamp).getTime());

    // Calculate statistics
    const minBpm = Math.min(...bpmValues);
    const maxBpm = Math.max(...bpmValues);
    const medianBpm = calculateMedian(bpmValues);
    const latestDataTimestamp = new Date(Math.max(...timestamps)).toISOString();

    // Format the output
    const outputEntry = {
        date,
        min: minBpm,
        max: maxBpm,
        median: medianBpm,
        latestDataTimestamp,
    };

 
    outputData.push(outputEntry);
};

// Write the output to the output file
fs.writeFileSync('output.json', JSON.stringify(outputData, null, 2));

//console.log('Output written to output.json.');
})