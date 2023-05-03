window.addEventListener('load', () => {
    document.getElementById('MSE').onclick = async () => {
        console.log("mse")
        let data = await fetch('/api/getschedule').then((res) => res.blob()).then(data => {
            const blob = new Blob([data], { type: 'application/pdf' });

            // Create a URL object from the blob data
            const url = URL.createObjectURL(blob);

            // Open a new browser tab with the URL
            window.open(url, '_blank');
        })
    }
})