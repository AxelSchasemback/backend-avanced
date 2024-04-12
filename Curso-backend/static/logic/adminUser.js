// @ts-nocheck
// Obtener la referencia a la tabla y al botón de guardar
const tableBody = document.getElementById('tablaUsers');
const saveButton = document.getElementById('saveUser');
const table = document.getElementById('tablaUsers')
// Función para obtener la lista de usuarios
async function getUsersList() {
  try {
    const response = await fetch('/api/account/users');
    const users = await response.json();

    // Llenar la tabla con los datos de los usuarios
    table.innerHTML = `
    <thead class="table-h" id="tablaTitulo">
      <tr>
        <th scope="col">#ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Date</th>
        <th scope="col">Sex</th>
        <th scope="col">Email</th>
        <th scope="col">Rol</th>
      </tr >
    </thead> `

    users.forEach(user => {
      table.innerHTML += `
        <tr class="table-scale">
          <td class="text-center align-middle" id="idUser">${user._id}</td>
          <td class="text-center align-middle" id="nombreUser">${user.name}</td>
          <td class="text-center align-middle" id="dateUser">${user.date}</td>
          <td class="text-center align-middle" id="sexUser">${user.sex}</td>
          <td class="text-center align-middle mark" id="emailUser">${user.email}</td>
          <td class="text-center align-middle mark" id="rolUser">
            <select class="opt-url" id="rol" name="rol">
              <option value="user" ${user.rol == 'user' ? 'selected' : ''}>User</option>
              <option value="premium" ${user.rol == 'premium' ? 'selected' : ''}>Premium</option>
              <option value="admin" ${user.rol == 'admin' ? 'selected' : ''}>Admin</option>
            </select>
          </td>
        </tr> `
    });
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
  }
}

// Función para actualizar el rol de un usuario
async function updateUserRole(userId, newRole) {
  try {
    const response = await fetch(`/api/account/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rol: newRole })
    });
    if (response.ok) {
      Toastify({
        text: `Rol cambiado con Exito`,
        duration: 2000,
        close: true,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        style: {
            background: 'linear-gradient(45deg, #79a164, #63db5c, #a0e79b)',
            color: 'black'
        },
    }).showToast();
    } else {
      Toastify({
        text: `Error al cambiar el Rol del Usuario`,
        duration: 2000,
        close: true,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        style: {
            background: 'linear-gradient(45deg, #dc3545, #d3192b, #e73958)',
        },
    }).showToast();
    }
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error);
  }
}

// Llamar a la función para obtener la lista de usuarios
getUsersList();

// Escuchar los cambios en el campo de selección de rol
tableBody.addEventListener('change', (event) => {
  const userId = event.target.closest('tr').querySelector('#idUser').textContent;
  const newRole = event.target.value;
  updateUserRole(userId, newRole);
});