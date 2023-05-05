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