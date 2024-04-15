async function updateAvatar(file, email) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
  
      const response = await fetch(`/api/account/${email}/avatar`, {
        method: 'PUT',
        body: formData
      });
  
      if (response.ok) {
        // Obtener la información actualizada del usuario
        const currentUserResponse = await fetch('/api/current', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (currentUserResponse.ok) {
          const currentUser = await currentUserResponse.json();
          const avatarDocument = currentUser.payload.documents?.find(doc => doc.title === file.name);
  
          const imgAvatar = document.getElementById('avatarImg');
          imgAvatar.innerHTML = `
            <img class="avatar" src="${avatarDocument ? `/static/public/img/avatar/${avatarDocument.title}` : '/static/public/img/usuario2.png'}" alt="Avatar">
            <input type="file" class="change-avatar-text" onchange="updateAvatar(this.files[0], '${email}')">
          `;
        } else {
          console.error('Error obtaining updated user information');
        }
      } else {
        console.error('Error updating avatar');
      }
    } catch (error) {
      console.error(error);
    }
  }