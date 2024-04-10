// @ts-nocheck
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })
        .then(response => {
            if (response.status === 200) {
                window.location.href = '/api/products';
            } else {

                Toastify({
                    text: 'Email o contraseña incorrectos',
                    duration: 3000,
                    close: true,
                    gravity: 'top',
                    backgroundColor: '#ff6347'
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});