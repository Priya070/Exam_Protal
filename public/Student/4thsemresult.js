fetch("/api/getresult").then((data) => {
    return data.json();
}).then((objectData) => {
    console.log(objectData[0].name);
    let tableData = "";
    objectData.map((values) => {
        tableData += `<tr>
                                    <td>${}</td>
                                    <td>${}</td>
                                </tr> `
    });
    document.getElementById("table_body").innerHTML = tableData;
});
