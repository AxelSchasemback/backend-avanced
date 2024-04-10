// @ts-nocheck
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-reg');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Realiza las validaciones aquí
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const dateInput = document.getElementById('date'); // Agrega el id al campo de fecha
        const sexInputs = document.getElementsByName('sex'); // Todos los radio buttons con name 'sex'

        // Validación del nombre (al menos 2 caracteres)
        if (nameInput.value.length < 2) {
            showAlert('El nombre debe tener al menos 2 caracteres');
            return;
        }

        // Validación del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showAlert('Por favor, ingrese un correo electrónico válido');
            return;
        }

        // Validación de la contraseña (al menos 8 caracteres, una mayúscula y un número)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(passwordInput.value)) {
            showAlert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número');
            return;
        }

        // Validación de la fecha de nacimiento (agrega tu propia validación si es necesario)
        if (!dateInput.value) {
            showAlert('Por favor, ingrese la fecha de nacimiento');
            return;
        }

        // Validación del sexo
        let selectedSex;
        for (const sexInput of sexInputs) {
            if (sexInput.checked) {
                selectedSex = sexInput.value;
                break;
            }
        }

        if (!selectedSex) {
            showAlert('Por favor, seleccione su sexo');
            return;
        }

        const body = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            date: dateInput.value,
            sex: selectedSex 
        };

        await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (response.ok) window.location.href = "/api/products"
                else window.location.href = "/register"
            })
    })

    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger';
        alertDiv.innerHTML = message;
        form.prepend(alertDiv);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Puedes ajustar esto según tus preferencias
        });

        setTimeout(function () {
            alertDiv.remove();
        }, 5000);
    }
});
