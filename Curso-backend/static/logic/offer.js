// Realiza la solicitud Fetch al endpoint /api/offer
fetch('/api/offer', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
        // Puedes agregar más headers si es necesario
    }
})
    .then(response => response.json())
    .then(data => {
        // Maneja la respuesta y actualiza las tarjetas de productos
        actualizarTarjetas(data);
    })
    .catch(error => {
        console.error('Error al hacer la solicitud Fetch:', error);
    });

function actualizarTarjetas(productos) {
    // Filtra los productos con stock bajo (menor a 4)
    const productosBajoStock = productos.filter(producto => producto.stock < 4);
    const productosCategory = productos.filter(producto => producto.category == "Procesador")

    const generadorDeCard = document.getElementById('gen-card');
    const generadorCardStock = document.getElementById('gen-card2');

    const cartId = JSON.parse(localStorage.getItem('cart-id')) || null
    // Actualiza el contenido de generadorDeCard con las tarjetas de todos los productos
    generadorDeCard.innerHTML = '';
    productosCategory.forEach(producto => {
        generadorDeCard.innerHTML += `
                    <td class="prdt-1 card-product">
                        <div class="fond-card1">
                            <img class="img-p" src="/static/public/img/productos/${producto.thumbnail}" alt="${producto.title}">
                            <span class="stock">${producto.stock}</span>
                            <span class="fav-start fa fa-star"></span>
                            <div class="col-md-subCard">
                                <p class="name-prod">${producto.title}</p>
                                <p class="price-prod text-success"><s>$${producto.price + 5000}</s> $${producto.price}</p>
                                ${cartId
                ? `<button class="btn-cart btn-outline-dark" id="btn-add-${producto._id}">Add to Cart</button>`
                : `<a href="/api/login" class="btn-cart btn-outline-dark">iniciar session</a>`
            }
                            </div>
                        </div>
                    </td>
                `;
    });

    // Actualiza el contenido de generadorCardStock con las tarjetas de productos bajo stock
    generadorCardStock.innerHTML = '';
    productosBajoStock.forEach(producto => {
        generadorCardStock.innerHTML += `
                <td class="card-product">
                    <div class="col-md-card">
                        <img class="img-p" src="/static/public/img/productos/${producto.thumbnail}" alt="${producto.title}">
                        <span class="stock red">${producto.stock}</span>
                        <span class="fav-start fa fa-star"></span>
                        <div class="col-md-subCard">
                            <p class="name-prod">${producto.title}</p>
                            <span class="price-prod">$${producto.price}</span>
                            ${cartId
                ? `<button class="btn-cart btn-outline-dark" id="btn-add-${producto._id}">Add to Cart</button>`
                : `<a href="/api/login" class="btn-cart btn-outline-dark">iniciar session</a>`
            }
                        </div>
                    </div>
                </td>
            `;
    });

    productos.forEach(producto => {

        const botonAddToCart = document.getElementById(`btn-add-${producto._id}`);

        if (botonAddToCart) {
            botonAddToCart.addEventListener('click', () => {
                fetch(`/api/carts/${cartId}/products/${producto._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        response.json
                        Toastify({
                            text: `Sumaste ${producto.title} al carrito`,
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
                        }).showToast();
                    })
                    .catch(error => console.error('Error:', error));
            })
        }
    })
}