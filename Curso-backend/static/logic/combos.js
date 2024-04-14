
fetch('/api/combo', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
        // Puedes agregar más headers si es necesario
    }
})
    .then(response => response.json())
    .then(data => {
        // Maneja la respuesta y actualiza las tarjetas de productos
        combosCards(data);
    })
    .catch(error => {
        console.error('Error al hacer la solicitud Fetch:', error);
    });

const amdCard = document.getElementById('AMD')
const intelCard = document.getElementById('INTEL')

function combosCards(productos) {
    const productosAMDCategory = productos.filter(producto => producto.category == "AMD")
    const productosINTELCategory = productos.filter(producto => producto.category == "Intel")
    const cartId = JSON.parse(localStorage.getItem('id'))

    amdCard.innerHTML = ''
    productosAMDCategory.forEach(producto => {
        amdCard.innerHTML +=
            `<td class="prdt-1 card-product">
        <div class="fond-card2">
            <img class="img-p" src="/static/public/img/productos/${producto.thumbnail}" alt="${producto.title}">
                <span class="stock">${producto.stock}</span>
                <span class="fav-start fa fa-star"></span>
                <div class="col-md-subCard">
                    <p class="name-prod">${producto.title}</p>
                    <span class="price-prod">$${producto.price}</span>
                    ${cartId
                ? `<button class="btn-cart btn-outline-dark" id="btn-add-${producto._id}">Add to Cart</button>`
                : `<a href="/login" class="btn-cart btn-outline-dark">iniciar session</a>`
            }
                </div>
        </div>
    </td >`
    })
    intelCard.innerHTML = ''
    productosINTELCategory.forEach(producto => {
        intelCard.innerHTML +=
            `<td class="card-product">
    <div class="fond-card1">
        <img class="img-p" src="/static/public/img/productos/${producto.thumbnail}" alt="${producto.title}">
            <span class="stock">${producto.stock}</span>
            <span class="fav-start fa fa-star"></span>
            <div class="col-md-subCard">
                <p class="name-prod">${producto.title}</p>
                <span class="price-prod">$${producto.price}</span>
                ${cartId
                ? `<button class="btn-cart btn-outline-dark" id="btn-add-${producto._id}">Add to Cart</button>`
                : `<a href="/login" class="btn-cart btn-outline-dark">iniciar session</a>`
            }
            </div>
    </div>
</td >`
    })
    productos.forEach(producto => {
        const botonAddToCart = document.getElementById(`btn-add-${producto._id}`);

        if (botonAddToCart) {
            botonAddToCart.addEventListener('click', () => {
                addProductToCart(producto._Id, producto.title, producto.stock)
            })
        }
    })
}