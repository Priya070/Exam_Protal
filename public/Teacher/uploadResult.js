// Get the input element for the file upload
const fileInput = document.getElementById("upload");
const sendFile = document.getElementById("uploadBtn");

// Listen for changes to the file input
fileInput.addEventListener("change", (event) => {
    const input = event.target;
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload =  (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        console.log(json); // display the JSON data in the console

        // Send the JSON data to the backend API
        fetch("http://localhost:3000/api/UploadResult", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        })
            .then(response => {
                if (response.ok) {
                    // alert("uploaded successfully");
                    console.log("File uploaded successfully");
                } else {
                    response.json().then(data => {
                        console.error("Error uploading file:", data);
                    })
                }
            })
            .catch(error => {
                console.error(error);
            });
        };
        
        reader.readAsBinaryString(file);
    });

sendFile.addEventListener('click', () => {
    alert('file uploaded');
})