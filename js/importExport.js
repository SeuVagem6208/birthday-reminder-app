// Function to export birthday data to JSON
function exportBirthdayData(birthdayData) {
    const json = JSON.stringify(birthdayData);
    // Save JSON to a file or handle it as needed
    console.log('Exported birthday data:', json);
    return json;
}

// Function to import birthday data from JSON
function importBirthdayData(json) {
    const birthdayData = JSON.parse(json);
    // Process the imported birthday data
    console.log('Imported birthday data:', birthdayData);
    return birthdayData;
}