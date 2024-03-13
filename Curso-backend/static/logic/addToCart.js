// @ts-nocheck
const cartId = JSON.parse(localStorage.getItem('id'));

async function addToCart(productId, productName, productStock) {
    try {
        const dataStorage = JSON.parse(localStorage.getItem(`cart-${productId}`))
        // Realiza la validación del stock
        if (productStock > 0 && dataStorage < productStock) {
            await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const prodId = JSON.parse(localStorage.getItem(`cart-${productId}`)) || 0;
            const newCant = prodId + 1;
            localStorage.setItem(`cart-${productId}`, JSON.stringify(newCant));

            Toastify({
                text: `Sumaste ${productName} al carrito`,
                duration: 4000,
                destination: `/api/carts/${cartId}`,
                newWindow: true,
                close: true,
                gravity: 'bottom',
                position: 'right',
                stopOnFocus: true,
                style: {
                    background: 'linear-gradient(313deg, #ffc107, #e13b11, #00000080, #000000)',
                },
            }).showToast();
        } else {
            Toastify({
                text: `El producto ${productName} está fuera de stock.`,
                duration: 4000,
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
    } catch (error) {
        console.error('Error:', error);
    }
}
