// @ts-nocheck
fetch('/api/current', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(resp => {
        if (resp.ok) return resp.json();
    })
    .then(data => {
        const user = data.payload;
        const dropMenu = document.getElementById('drop-menu');
        const admin = user.rol === 'admin';
        dropMenu.innerHTML = `
        <li class="li-user" id="perfil"><a class="dropdown-item text-white" href="/perfil">Perfil</a></li>
        <li class="li-user" id="logout"><a class="dropdown-item text-white" href="/api/logout">Logout</a></li>
        ${admin ? '<li class="li-user"><a class="dropdown-item text-white" href="/user-admin">admin</a></li>' : ''}
      `;

        const avatar = user.documents.find(doc => doc);
        const imgAvatar = document.getElementById('avatarImg');
        imgAvatar.innerHTML = `
        <img class="avatar" src="${avatar ? `/static/public/img/avatar/${avatar.title}` : '/static/public/img/usuario2.png'}" alt="Avatar">
        <input type="file" class="change-avatar-text" onchange="updateAvatar(this.files[0], '${user.email}')">
      `;

        const userInfoElement = document.getElementById('userInfo');
        userInfoElement.innerHTML = `
        <p>Nombre y Apellido: ${user.name}</p>
        <p>Fecha de Nacimiento: ${user.date}</p>
        <p>Sexo: ${user.sex}</p>
        <p>Descripción:</p>
        <form id="descriptionForm">
          <label for="description">Actualizar Descripción:</label>
          <textarea placeholder="Descripción Opcional" name="description" id="description" rows="6"></textarea>
          <button type="submit" class="des-submit">Submit</button>
        </form>
      `;
        const descriptionForm = document.getElementById('descriptionForm');

        if (user.description) {
            document.querySelector('#userInfo p:nth-child(4)').textContent = `Descripción: ${user.description}`;
            document.getElementById('description').value = '';
        } 
        // Actualizar la descripción del usuario
        descriptionForm.addEventListener('submit', event => {
            event.preventDefault();
            const newDescription = document.getElementById('description').value;
            fetch('/api/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: newDescription }),
            })
                .then(response => response.json())
                .then(data => {
                    document.querySelector('#userInfo p:nth-child(4)').textContent = `Descripción: ${data.payload.description}`;
                    document.getElementById('description').value = '';
                })
                .catch(error => console.error(error));
        });
    })
    .catch(error => console.error(error));