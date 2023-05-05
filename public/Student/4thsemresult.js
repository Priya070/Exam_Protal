// const form = document.querySelector('#grades-form');
// const table = document.getElementById('tables');

// const { response } = require("express");

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const subjectCodes = table.querySelectorAll('tr td:first-child');
//     const grades = table.querySelectorAll('tr td:last-child');
//     const data = {};

//     // Iterate over the table rows and create an object with the grades
//     for (let i = 0; i < subjectCodes.length; i++) {
//         const subjectCode = subjectCodes[i].textContent;
//         const grade = grades[i].textContent;
//         data[subjectCode] = grade;
//     }

//     // Send the data to the server
//     fetch('/studentResult', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             username: 'Priya', // Replace with the actual username
//             result: data
//         })
//     })
//         .then(response => response.json())
//         .then(result => {
//             // Display the result on the page
//             console.log(result);
//         })
//         .catch(error => console.error(error));
// });

let tableBody = document.getElementById('tables_body');
let userName = document.getElementById('username').innerHTML;
console.log(JSON.stringify({
    'username': userName
}))
fetch('/api/studentResult', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        'username':userName
    })
}).then(response => response.json())
    .then(data => {
        let tableData = '';
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                tableData += `<tr>
                                    <td>${key}</td>
                                    <td>${data[key]}</td>
                                </tr>`
            }
        }
        tableBody.innerHTML = tableData;
})