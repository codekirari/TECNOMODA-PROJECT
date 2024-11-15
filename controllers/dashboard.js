document.addEventListener('DOMContentLoaded', function() {
    // Obtener la información del usuario logueado
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Si no hay un usuario logueado, redirigir al login
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // Mostrar un mensaje de bienvenida
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.innerText = `¡Bienvenido, ${loggedInUser.username}!`;

    // Mostrar u ocultar elementos según el tipo de usuario
    const userType = loggedInUser.userType;

    if (userType === 'admin') {
        // Mostrar el panel de administrador
        document.getElementById('admin-panel').style.display = 'block';
    } else if (userType === 'seller') {
        // Mostrar el panel de vendedor
        document.getElementById('seller-panel').style.display = 'block';
    } else {
        // Mostrar el panel de usuario (cliente)
        document.getElementById('user-panel').style.display = 'block';
    }

    // Cerrar sesión
    document.getElementById('logout').addEventListener('click', function() {
        // Eliminar el usuario logueado del localStorage
        localStorage.removeItem('loggedInUser');
        // Redirigir a la página de inicio de sesión
        window.location.href = 'login.html';
    });
});
