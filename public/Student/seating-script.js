window.addEventListener('load', () => {
    document.getElementById('MSS').onclick = async () => {
        let data = await fetch('/api/getseating').then((res) => res.blob()).then(data => {
            const blob = new Blob([data], { type: 'application/pdf' });

            // Create a URL object from the blob data
            const url = URL.createObjectURL(blob);

            // Open a new browser tab with the URL
            window.open(url, '_blank');
        })
    }
})