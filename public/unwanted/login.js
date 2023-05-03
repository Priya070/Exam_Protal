// (function(){
//             var inputs = document.querySelectorAll('.form .input-group input');
// 			var button = document.getElementById('login');

// const { get } = require("mongoose");

//             inputs.forEach((input) => {
//                 input.addEventListener('focusout', (e) => {
//                     if (e.target.value === "") {
//                         return e.target.classList.remove('has-value');
//                     }

//                     return e.target.classList.add('has-value');
//                 });
//             });
//         })();

window.addEventListener('load', () => {
    document.getElementById('loginbtn').onclick = async() => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        console.log('skdjfef')
        let data = await fetch('/api/login', {
            method: "POST", headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email ,
                "password": password
            })
        }).then((res) => res.text())

        console.log(data)
        if (data === 'student') {
            window.location.href = '/student'
        }
        else if (data === "teacher") {
            window.location.href = '/teacher'
        }
        else if (data === 'admin') {
            window.location.href = '/admin'
        }
        else {
            window.location.href = '/login'
        }
    }
})