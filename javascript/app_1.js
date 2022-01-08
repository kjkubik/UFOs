// import data.js
const tableData = data;

// Reference the HTML table using D3
var tbody = d3.select("tbody");

function buildTable(data) {
    // initialization
    tbody.html("");

    data.forEach((dataRow) => { // for each row of data we iterate through
        let row = tbody.append("tr"); // "give me the table tag (<tr>)
        Object.values(dataRow).forEach((val) => { // for each value in a row
            let cell = row.append("td"); // 'wrap' a td tag around
            cell.text(val); //   each cell found
        });
    });
}
// you will be replacing this function with function saving element, value and id of the filter changed. (What only one can be changed at the same time?)
// then loop through the dataset and keep only the results mathing the search criteria. When [enter], update with search criteria.
function handleClick() {
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
};

// event handler to listen for 'on(click)'
d3.selectAll("#filter-btn").on("click", handleClick);

// When page load, build table
buildTable(tableData);