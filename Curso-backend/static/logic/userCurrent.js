const dropMenu = document.getElementById('drop-menu')

fetch('/api/current', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(resp => {
        if (resp.ok)
            return resp.json()
    })

    .then(data => {

        if (data.status === 'success') {
            localStorage.setItem('id', JSON.stringify(data.payload.cartId))
            const admin = data.payload.rol === 'admin'
            dropMenu.innerHTML = `
            <li class="li-user" id="perfil"><a class="dropdown-item text-white"
                    href="/perfil">Perfil</a>
            </li>
            <li class="li-user" id="logout"><a class="dropdown-item text-white"
                    href="/api/logout">Logout</a>
            </li>
            ${admin ?
                    `<li class="li-user"><a class="dropdown-item text-white"
                    href="/user-admin">admin</a>
                </li>`
                    :
                    ''
                }
        `
        }
    })
    .catch(error => {
        localStorage.clear()
        dropMenu.innerHTML = `
            <li class="li-user">
                <a class="dropdown-item text-white" href="/login">LogIn</a>
            </li>
            `
        return console.error('Error: ', error)
    })