const cartId = JSON.parse(localStorage.getItem('cart-id'))

const url = `/api/carts/${cartId}`

fetch(url + '/purchase', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(resp => resp.json())
    .then(data => {

        console.log(data)

        const products = data.filter((data) => data)

        console.log(products)

        const card = document.getElementById('card')

        function genCard() {

            // const product = products.product
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
                    `
            }
        }
        genCard()

        function prueba() {
            const { product, quantity } = data;
            const { _id, ...productDetails } = product;
            fetch('/purchase/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify()
            })

            const newStock = productDetails.stock - quantity;
            console.log('nuevo Stock: ' + newStock)
            fetch(`/api/products/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id, ...productDetails, stock: newStock }),
            })

            fetch(url + '/reset', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
    })
