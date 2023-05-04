const form = document.querySelector('#grades-form');
const table = document.getElementById('tables');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const subjectCodes = table.querySelectorAll('tr td:first-child');
    const grades = table.querySelectorAll('tr td:last-child');
    const data = {};

    // Iterate over the table rows and create an object with the grades
    for (let i = 0; i < subjectCodes.length; i++) {
        const subjectCode = subjectCodes[i].textContent;
        const grade = grades[i].textContent;
        data[subjectCode] = grade;
    }

    // Send the data to the server
    fetch('/studentResult', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'Priya', // Replace with the actual username
            result: data
        })
    })
        .then(response => response.json())
        .then(result => {
            // Display the result on the page
            console.log(result);
        })
        .catch(error => console.error(error));
});
