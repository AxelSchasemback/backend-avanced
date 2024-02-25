fetch('/api/current', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(resp => resp.json())

    .then(data => {

        if (data.payload) {
            localStorage.setItem('id', JSON.stringify(data.payload.cartId))
            Toastify({
                text: `Bienvenido ${data.payload.name}`,
                duration: 4000,
                destination: `/api/account`,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(313deg, #ffc107, #e13b11, #00000080, #000000)",
                },
            }).showToast();
        }
        else { 
            localStorage.clear()
        }

    })
    .catch(error => console.error('Error: ', error))