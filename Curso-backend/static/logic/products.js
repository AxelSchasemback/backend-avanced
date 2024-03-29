let page;
let limit;
let sort;

// Obtener los parámetros de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);

// Asignar los valores de los parámetros de consulta a las variables correspondientes
page = parseInt(urlParams.get('page')) || 1;
limit = parseInt(urlParams.get('limit')) || 10;
sort = urlParams.get('sort') || '';

    fetch(`/api/products?limit=${limit}&page=${page}${sort ? '&sort=' + sort : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            genProducts(data);
            generatePagination(data);
        })
        .catch(error => {
            console.error(error)
        })

const parseId = JSON.parse(localStorage.getItem('id')) || null
const htmlProducts = document.getElementById('productsId')
const htmlPagination = document.getElementById('pagination')
const buttonBuy = document.getElementById('botonCompra')

function genProducts(data) {
    const productsRes = data.docs.filter(product => product.stock > 0)

    htmlProducts.innerHTML = ''
    productsRes.forEach(product => {
        htmlProducts.innerHTML +=
            `<div class="fond-card1">
            <img class="img-p" src="../static/public/img/productos/${product.thumbnail}" alt="${product.thumstail}">
            <span class="stock" id="segunStock">${product.stock}</span>
            <span class="fav-start fa fa-star"></span>
            <div class="col-md-subCard">
            <p class="name-prod">${product.title}</p>
            <span class="price-prod">$${product.price}</span>
            ${parseId
                ? `<button class="btn-cart btn-outline-dark" id="botonCompra">Add to Cart</button>`
                : `<a href="/login" class="btn-cart btn-outline-dark">Iniciar sesión</a>`
            }
            </div>
            </div>`;
    })

    if (buttonBuy) {
        buttonBuy.addEventListener('click', () => {
            const products = data.docs.filter(product => product)
            const dataStorage = JSON.parse(localStorage.getItem(`cart-${products._id}`))
            if (products.stock > 0 && dataStorage < products.stock) {
                fetch(`/api/carts/${parseId}/products/${products._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        const prodId = JSON.parse(localStorage.getItem(`cart-${products._id}`)) || 0;
                        const newCant = prodId + 1;
                        localStorage.setItem(`cart-${products._id}`, JSON.stringify(newCant));

                        // @ts-ignore
                        Toastify({
                            text: `Sumaste ${products.title} al carrito`,
                            duration: 2500,
                            destination: `/carrito`,
                            newWindow: true,
                            close: true,
                            gravity: 'bottom',
                            position: 'right',
                            stopOnFocus: true,
                            style: {
                                background: 'linear-gradient(313deg, #ffc107, #e13b11, #00000080, #000000)',
                            },
                        }).showToast();
                    })
                    .catch(error => {
                        console.error('Error:', error);

                    })
            } else {
                // @ts-ignore
                Toastify({
                    text: `El producto ${products.title} está fuera de stock.`,
                    duration: 2500,
                    newWindow: true,
                    close: true,
                    gravity: 'bottom',
                    position: 'right',
                    stopOnFocus: true,
                    style: {
                        background: 'linear-gradient(313deg, #ffc107, #e13b11, #00000080, #000000)',
                    },
                }).showToast();
            }
        })
    }
}

function generatePagination(data) {
    limit = data.limit;
    page = data.page;
    const nextPageExist = data.hasNextPage
    const prevPageExist = data.hasPrevPage
    const nextPage = data.nextPage
    const prevPage = data.prevPage
    sort = data.sort || '';

    const paginationHTML = document.getElementById('pagination');

    paginationHTML.innerHTML =
        `
        ${(prevPageExist) ?
            `<a id="prevPageButton" href="/products?limit=${limit}&page=${prevPage}${sort ? "& sort= " : sort}" >«</a >`
            :
            ''
        }
        <b> ${page} </b>
        ${nextPageExist ?
            `<a id="nextPageButton" href="/products?limit=${limit}&page=${nextPage}${sort ? "& sort=" : sort}" >»</a >`
            :
            ''
        }
        `
}