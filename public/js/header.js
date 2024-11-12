// Verificar si el usuario está conectado
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Si hay un usuario conectado, modificar el menú de navegación
        const accountMenu = document.querySelector('.navbar ul li a[href="login.html"]');
        const dropdown = accountMenu.parentNode;
        accountMenu.textContent = `¡Hola, ${loggedInUser.username}!`; // Mostrar el nombre del usuario
        dropdown.innerHTML = `
            <li><a href="account.html">Mi cuenta</a></li>
            <li><a href="#" id="logout">Cerrar sesión</a></li>
        `;

        // Añadir funcionalidad para cerrar sesión
        document.getElementById('logout').addEventListener('click', function () {
            localStorage.removeItem('loggedInUser'); // Eliminar los datos del usuario del localStorage
            localStorage.removeItem('userToken'); // Eliminar el token
            window.location.href = 'index.html'; // Redirigir al inicio
        });
    }
});
