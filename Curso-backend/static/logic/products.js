fetch('/api/current', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(resp => resp.json())

    .then(data => {

        localStorage.setItem('cart-id', JSON.stringify(data.payload.cartId))

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
            onClick: function () { }
        }).showToast();
    })
    .catch(error => console.error('Error: ', error))

function addToCart(productId, nombre) {

    const cartId = JSON.parse(localStorage.getItem('cart-id'))
    console.log(cartId)

    Toastify({
        text: `Sumaste ${nombre} al carrito`,
        duration: 4000,
        destination: `/api/carts/${cartId}`,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(313deg, #ffc107, #e13b11, #00000080, #000000)",
        },
        onClick: function () { }
    }).showToast();



    fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            console.log(response)

            console.log('Producto agregado al carrito');
        })
        .catch(error => console.error('Error:', error));
}




