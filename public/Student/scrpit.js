var dt = new Date();
        var mo=dt.getMonth()+1;
        document.getElementById('date').innerHTML=dt.getDate()+" / "+mo+" / "+dt.getFullYear();
        
        function menuToggle(){
            const togglemenu=document.querySelector('.profile_down');
            togglemenu.classList.toggle('active');
}
        
window.addEventListener('load', () => {
    document.getElementById('subCodeSubmit').onclick = async () => {
        let code = document.getElementById('subCode').value;
        let data = await fetch('/api/getsyllabus', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"code": code})
        }).then((res) => res.blob()).then(data => {
            const blob = new Blob([data], { type: 'application/pdf' });

            // Create a URL object from the blob data
            const url = URL.createObjectURL(blob);

            // Open a new browser tab with the URL
            window.open(url, '_blank');
        })
    }
    
})