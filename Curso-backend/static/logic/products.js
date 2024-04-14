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
        genProducts(data);
        generatePagination(data);
    })
    .catch(error => {
        console.error(error)
    })

// @ts-ignore
const htmlProducts = document.getElementById('productsId')
const htmlPagination = document.getElementById('pagination')

function genProducts(data) {
    const productsRes = data.docs.filter(product => product.stock > 0)
    const parseId = JSON.parse(localStorage.getItem('id')) || null

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
                ? `<button class="btn-cart btn-outline-dark" id="compra-${product._id}">Add to Cart</button>`
                : `<a href="/login" class="btn-cart btn-outline-dark">Iniciar sesión</a>`
            }
        </div>
        </div>`;
    })
    productsRes.forEach(product => {
        const buttonBuy = document.getElementById(`compra-${product._id}`)

        if (buttonBuy) {
            buttonBuy.addEventListener('click', () => {
                addProductToCart(product._id, product.title, product.stock)
            })
        }
    })
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