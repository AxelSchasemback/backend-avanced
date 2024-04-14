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

        // Fetch a url + '/populate'
        fetch(url + '/populate', {
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
                        <div class="border border-warning">
                            <div class="infoPay bg-black bg-opacity-50 d-flex"
                                <div class="info">
                                    <img src="/static/public/img/productos/${element.product.thumbnail}" class="imgPay">
                                    <h5 class="fw-bolder">${element.product.title}</h5>
                                    <h4>${element.product.price}x${element.quantity}</h4>
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
                const inputEmail = document.getElementById('email');
                Compra.addEventListener('click', () => {
                    try {

                        // Realizar la compra mediante POST
                        fetch('/api/order', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },

                            // @ts-ignore
                            body: JSON.stringify({ email: user.payload.email, ref: inputEmail.value, products: products })
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