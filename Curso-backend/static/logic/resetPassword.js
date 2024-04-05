// @ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
    const emailForm = document.getElementById('emailForm');
    const resetForm = document.getElementById('resetForm');

    if (emailForm) {
        emailForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;

            fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to request password reset');
                    }
                    return response.json();
                })
                .then(data => {
                    // Assuming data.token is returned after requesting password reset
                    // You may need to adjust this based on your server response
                    const token = data.token;
                    // Redirect or update UI with token
                    // For simplicity, I'm reloading the page with token as a query parameter
                    window.location.href = `/reset-password?token=${token}`;
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error, show error message to user, etc.
                });
        });
    }

    if (resetForm) {
        resetForm.addEventListener('submit', function (event) {
            event.preventDefault()
            const newPassword = document.getElementById('password').value;
            const resetPassword = document.getElementById('reset').value;

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (newPassword !== resetPassword) {
                Toastify({
                    text: "Error: Las contraseñas no coinciden",
                    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                    duration: 3000 // Duración de la notificación en milisegundos
                }).showToast();
                return;
            }
            if (!passwordRegex.test(newPassword)) {
                // Mostrar una notificación Toastify si la contraseña no cumple con los requisitos
                Toastify({
                    text: "La nueva contraseña debe contener al menos una letra mayúscula y un número, y tener al menos 8 caracteres.",
                    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                    duration: 3000 // Duración de la notificación en milisegundos
                }).showToast();
                return; // Detener la ejecución de la función si la contraseña no cumple con los requisitos
            }

            // Verificar si las contraseñas son iguales
            if (newPassword !== resetPassword) {
                // Mostrar una notificación Toastify si las contraseñas no coinciden
                Toastify({
                    text: "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.",
                    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                    duration: 3000 // Duración de la notificación en milisegundos
                }).showToast();
                return; // Detener la ejecución de la función si las contraseñas no coinciden
            }

            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            console.log(token)

            // Objeto con los datos del formulario
            const formData = {
                newPassword: newPassword,
                token: token // Agregar el token al objeto formData
            }

            fetch(`/api/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to reset password');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle success response, maybe redirect user to login page, show success message, etc.
                    console.log('Password reset successfully', data);
                    if (data.ok) {
                        window.location.href = '/products'
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error, show error message to user, etc.
                });
        });
    }
});
