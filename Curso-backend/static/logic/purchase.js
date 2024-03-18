// Fetch a api/current
fetch('/api/current', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(resp => resp.json())
    .then(async user => {

        const cartId = JSON.parse(localStorage.getItem('id'));
        const url = `/api/carts/${cartId}`;

        // Fetch a url + '/purchase'
        fetch(url + '/purchase', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(data => {

                const products = data.filter(data => data);

                const total = products.reduce((total, product) => total + (product.quantity * product.product.price), 0);

                const card = document.getElementById('card');

                function genCard() {
                    for (const element of products) {
                        card.innerHTML += `
                        <div class="border border-warning col h-25 p-0 w-100">
                            <div class="h-100 bg-black bg-opacity-50 w-100" style="
                                background-color: #0a0a0a;
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                ">
                                <img class="bg-dark card-img-top h-100 oscuro w-50 w-auto"
                                    src="/static/public/img/productos/${element.product.thumbnail}" style="">
                                <div class="card-body d-flex flex-row p-4">
                                    <div class="d-flex justify-content-evenly flex-lg-shrink-0 text-center w-100">
                                        <h5 class="fw-bolder">${element.product.title}</h5>
                                        <h4>${element.product.price}x${element.quantity}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    }
                    card.innerHTML += `
                    <div class="d-flex flex-lg-shrink-0 justify-content-evenly w-100">
                        <h2 class="bg-black bg-opacity-50 border border-warning px-3">Total</h2>
                        <h2 class="bg-black bg-opacity-50 border border-warning px-3">${total}</h2>
                    </div>
                `;
                }

                genCard();

                const Compra = document.getElementById('botonCompra');
                const inputEmail = document.getElementById('email')
                Compra.addEventListener('click', () => {
                    try {

                        // Realizar la compra mediante POST
                        fetch('/api/order', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            // @ts-ignore
                            body: JSON.stringify({ email: user.payload.email, ref: inputEmail.value, products: products }),
                        })

                        // Resetear el carrito
                        fetch(`${url}/reset`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        // Redirigir a la página de cuenta
                        window.location.href = '/api/account';
                    } catch (error) {
                        console.error('Error al realizar la compra:', error);
                    }
                });
            });
    });