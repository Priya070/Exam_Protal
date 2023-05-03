window.addEventListener('load', () => {
    document.getElementById('submitt').onclick = async () => {
        console.log("hii")
        let name = document.getElementById('name').value;
        let rollNo = document.getElementById('rollNo').value;
        let subcode = document.getElementById('subCode').value;
        let fileInput = document.getElementById('receipt');

        const formData = new FormData();
        const selectedFile = fileInput.files[0];
        formData.append("receipt", selectedFile);
        formData.append('name', name);
        formData.append('rollNo', rollNo);
        formData.append('code', subcode);

        const response = await fetch("/api/register", {
            method: "POST",
            body: formData,
        });
        const result = await response.text();
        alert("u registered for backpaper");
        
        console.log("Server response:", result);
        // location.reload(true);
    }
    document.getElementById('submitt').addEventListener('submit', (event) => {
        event.preventDefault();
    });

})