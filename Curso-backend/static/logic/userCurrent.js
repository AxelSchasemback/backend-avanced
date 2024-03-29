fetch('/api/current', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(resp => resp.json())

    .then(data => {

        if (data.payload) {
            localStorage.setItem('id', JSON.stringify(data.payload.cartId))
        }
        else { 
            localStorage.clear()
        }

    })
    .catch(error => console.error('Error: ', error))