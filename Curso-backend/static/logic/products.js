const parseId = JSON.parse(localStorage.getItem('id'))
function addProductToCart(id, title, stock) {
    const dataStorage = JSON.parse(localStorage.getItem(`cart-${id}`))
    if (stock > 0 && dataStorage < stock) {
        fetch(`/api/carts/${parseId}/products/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                const prodId = JSON.parse(localStorage.getItem(`cart-${id}`)) || 0;
                const newCant = prodId + 1;
                localStorage.setItem(`cart-${id}`, JSON.stringify(newCant));

                // @ts-ignore
                Toastify({
                    text: `Sumaste ${title} al carrito`,
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
            text: `El producto ${title} está fuera de stock.`,
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
}