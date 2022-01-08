// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
    // initialize html table body
    tbody.html("");

    // Loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");

        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}

// Create a variable to keep track of all the filters as an object.
// Where all filter criteria (entered by user) are stored
allFilters = {}

// Use this function to update the filters. 
function updateFilters() {

    // Get changed element 
    let changedElement = d3.select(this)

    // Get changed element's value
    let changedValue = changedElement.property("value");
    console.log("Changed Value: " + changedValue);

    // Get changed element's id
    let changedId = changedElement.attr("id");
    console.log("Changed id: " + changedId);

    // If there is a value in changedValue, 
    // place filter id and value into allFilter's list 
    // Else, remove filter id from allFilters.
    if (changedValue) {

        allFilters[changedId] = changedValue;
        console.log("allFilters[changedId]: " + allFilters[changedId]);

    } else {

        delete allFilters[changedId];
    }

    // Call function to apply all filters and rebuild the table
    rebuildTableWithFilterValues();
}

// Use this function to filter the table when data is entered.
function rebuildTableWithFilterValues() {

    let date = d3.select("#datetime").property("value");
    let city = d3.select("#city").property("value");
    let state = d3.select("#state").property("value");
    let country = d3.select("#country").property("value");
    let shape = d3.select("#shape").property("value");

    let filteredData = tableData;
    console.log("filterData: " + filteredData);

    if (date || city || state || country || shape) {
        if (date) {
            filteredData = filteredData.filter(row => row.datetime === date);
        }
        if (city) {
            filteredData = filteredData.filter(row => row.city === city);
        }
        if (state) {
            filteredData = filteredData.filter(row => row.state === state);
        }
        if (country) {
            filteredData = filteredData.filter(row => row.country === country);
        }
        if (shape) {
            filteredData = filteredData.filter(row => row.shape === shape);
        }
    }

    buildTable(filteredData);
};

// Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);