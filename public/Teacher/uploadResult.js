// Get the input element for the file upload
const fileInput = document.getElementById("upload");

// Listen for changes to the file input
fileInput.addEventListener("change", handleFileUpload);

// Function to handle the file upload
function handleFileUpload(event) {
    // Get the uploaded file
    const file = event.target.files[0];

    // Create a FileReader object to read the file
    const reader = new FileReader();

    // When the file has been loaded, parse it as an XLSX file
    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Convert the first worksheet to JSON
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Send the JSON data to the server using an HTTP request
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/UploadResult");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(jsonData));
    };

    // Read the file as an array buffer
    reader.readAsArrayBuffer(file);
}
