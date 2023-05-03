fetch("/api/getStudent").then((data) => {
    return data.json();
}).then((objectData) => {
    console.log(objectData[0].name);
    let tableData = "";
    objectData.map((values) => {
        tableData += `<tr>
                                    <td>${values.name}</td>
                                    <td>${values.rollNo}</td>
                                    <td>${values.code}</td>
                                    <td>Success</td>
                                </tr> `
    });
    document.getElementById("table_body").innerHTML= tableData;
    // alert("uploaded successfully");
});
