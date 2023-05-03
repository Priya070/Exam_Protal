// fetch("/api/studentResult").then((data) => {
//     return data.json();
// }).then((objectData) => {
//     console.log(objectData[0].name);
//     let tableData = "";
//     objectData.map((values) => {
//         tableData += `<tr>
//                                     <td>${values.subject}</td>
//                                     <td>${values.grade}</td>
//                                 </tr> `
//     });
//     document.getElementById("table_body").innerHTML = tableData;
// });

const table = document.getElementById('tables');

// Add a click event listener to the table
table.addEventListener('click', (event) => {
    // Check if the user clicked on a row
    if (event.target.tagName === 'TD') {
        // Get the row and its data
        const row = event.target.parentNode;
        const username = "Priya";

        // Create an object with the data
        const data = {
            username
        };

        // Send the data to the backend via a POST request
        fetch('/api/studentResult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // Handle the response from the backend
                console.log(response);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
    }
});

<tbody>
    <tr>
        <td>SMA140C(T)</td>
        <td>A+</td>
    </tr>
    <tr>
        <td>IOT140C(T)</td>
        <td>B+</td>
    </tr>
    <tr>
        <td colspan="2">SGPA-9.5</td>
    </tr>

</tbody>