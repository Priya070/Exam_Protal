const fileInput = document.getElementById("upload");
const sendButton = document.getElementById("send");

sendButton.addEventListener("click", async () => {
    try {
        // Create a new FormData object
        const formData = new FormData();

        // Get the selected file and the subject code
        const selectedFile = fileInput.files[0];
        fileInput.parentNode.removeChild(fileInput);
        // Append the file and the subject code to the FormData object
        formData.append("result", selectedFile);


        // Call the upload function with the FormData object
        await upload(formData);
        alert("result to verify are uploaded successfully");
        console.log("File uploaded successfully.");
    } catch (error) {
        console.error("Error uploading file:", error);
    }
});

async function upload(formData) {
    try {
        const response = await fetch("/api/result", {
            method: "POST",
            body: formData,
        });
        const result = await response.text();
        console.log("Server response:", result);
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}
