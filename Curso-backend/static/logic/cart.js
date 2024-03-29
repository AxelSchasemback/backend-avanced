const cartId = JSON.parse(localStorage.getItem('id'));
const urlCart = `/api/carts/${cartId}`;

function putCart(products) {
    fetch(urlCart, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(products)
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error al procesar la compra', error);
        });
}

fetch(`${url}/purchase`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response => response.json())
    .then(data => {
        const validProducts = data.filter(element => element.product);

        validProducts.forEach(product => {
            const storedQuantity = JSON.parse(localStorage.getItem(`cart-${product.product._id}`)) || 0;
            product.quantity = storedQuantity;
        });

        const products = validProducts.filter(data => data.quantity > 0);

        function getCartItemsAsArray() {
            const cartItemsArray = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('cart-')) {
                    const productId = key.substring('cart-'.length);
                    const quantity = JSON.parse(localStorage.getItem(key));
                    cartItemsArray.push({ product: productId, quantity });
                }
            }
            return cartItemsArray;
        }

        const cartItemsArray = getCartItemsAsArray();
        const itemValue = cartItemsArray.filter(item => item.quantity > 0);

        putCart(itemValue);

        const totalProducto = () => products.reduce((total, product) => total + (product.quantity * product.product.price), 0);

        const mostrarCards = (card) => document.getElementById('tablaProductos').innerHTML = card;

        const mostrarResumen = (precios) => {
            document.getElementById('tablaTotal').innerHTML = `${precios}
            <tr>
            <th>.</th>
            <td id="total">Total: $${totalProducto()}</td>
            </tr>`;
        };

        const mostrarTabla = (carrito) => {
            const carritoFiltrado = carrito.filter(data => data.quantity > 0);

            let acumuladorDeCards = `<thead class="table-h" id="tablaTitulo">
            <tr>
                <th scope="col">#</th>
                <th scope="col">PRODUCTO</th>
                <th scope="col">PRECIO</th>
                <th scope="col">CANTIDAD</th>
                <th scope="col">SUBTOTAL</th>
            </tr>
            </thead>`;

            let acumuladorResumen = `<tr>
            <th class="text-center align-middle">#</th>
            <th class="text-center fs-6">RESUMEN DE COMPRA</th>
            </tr>`;

            let botonCompra = document.getElementById("botonCompra");
            botonCompra.innerHTML = `<button class="btn-cart btn-outline-dark buy align-self-end" id="comprar">Comprar</button>`;

            let numeracion = 0;

            carritoFiltrado.forEach(data => {
                const products = data.product;
                const cantPorProducto = products.price * data.quantity;
                numeracion++;

                acumuladorDeCards += `<tr class="table-scale">
                <th class="align-middle" scope="row">${numeracion}</th>
                <td>
                    <div class="desc col-sm-1 col-10 d-flex p-2 w-100">
                        <img class="cart-img" src="/static/public/img/productos/${products.thumbnail}" alt=${products.title}>
                            <h2 class="fs-4 w-100 align-middle text-center"> ${products.title} </h2>
                    </div>
                </td>
                <td class="text-center align-middle" id="precio">$${products.price}</td>
                <td class="text-center align-middle">
                    <div class="d-flex flex-column id="movement">
                        <i class="sum bi bi-cart-plus" id="sumar${products._id}"></i>
                        <span class="fs-4 quantity" id="cnt-prod1">${data.quantity}</span>
                        <i class="min bi bi-cart-dash" id="restar${products._id}"></i>
                    </div>
                </td >
                <td class="text-center align-middle mark" id="totalProducto">$${cantPorProducto}</td>
            </tr >`;

                mostrarCards(acumuladorDeCards);

                acumuladorResumen += `<tr>
                <th class="text-center">${numeracion}</th>
                <td id="totalPorCantidad1">$${cantPorProducto}</td>
                </tr>`;

                mostrarResumen(acumuladorResumen);
            });

            if (!carritoFiltrado.length) {
                document.getElementById('tablaProductos').innerHTML = `
                <div 
                style=" display: flex; justify-content: space-evenly;">
                No Hay productos en el carrito 
                </div>`;
                document.getElementById('tablaTotal').innerHTML = "";
                document.getElementById("botonCompra").innerHTML = `<button style="display: none" id="comprar">compra</button>`;
            }

            carritoFiltrado.forEach(data => {
                const products = data.product;
                const sumarCantidad = document.getElementById(`sumar${products._id}`);
                sumarCantidad.addEventListener('click', () => sumarCant(products._id));

                const restarCantidad = document.getElementById(`restar${products._id}`);
                restarCantidad.addEventListener('click', () => restaCant(products._id));
            });

            const finalizarCompra = document.getElementById('comprar');
            finalizarCompra.addEventListener('click', () => {
                if (carritoFiltrado.length) {

                    putCart(carritoFiltrado);

                    function removeZeroQuantityItems() {
                        for (let i = localStorage.length - 1; i >= 0; i--) {
                            const key = localStorage.key(i);
                            if (key.startsWith('cart-')) {
                                JSON.parse(localStorage.getItem(key));
                                localStorage.removeItem(key);

                            }
                        }
                    }

                    removeZeroQuantityItems();

                    window.location.href = '/payment'

                }
            });
        };

        mostrarTabla(products);

        const sumarCant = (id) => {

            const newQuantity = JSON.parse(localStorage.getItem(`cart-${id}`))

            data.quantity = newQuantity || data.quantity

            let suma = data.find(e => e.product._id === id)

            if (suma.quantity < suma.product.stock) {

                suma.quantity = suma.quantity + 1

                localStorage.setItem(`cart-${id}`, JSON.stringify(suma.quantity))
                totalProducto()
                mostrarTabla(data)

            }
            return suma.quantity
        }

        const restaCant = (id) => {

            const newQuantity = JSON.parse(localStorage.getItem(`cart-${id}`))

            data.quantity = newQuantity || data.quantity

            let resta = data.find(product => product.product._id === id)

            resta.quantity = resta.quantity - 1

            localStorage.setItem(`cart-${id}`, JSON.stringify(resta.quantity))

            totalProducto()
            mostrarTabla(data)

            return resta.quantity
        }

    })
    .catch(error => console.error('Error: ', error))