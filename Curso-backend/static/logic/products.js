const parseId = JSON.parse(localStorage.getItem('id'))
const buttonBuy = document.getElementById('botonCompra')
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