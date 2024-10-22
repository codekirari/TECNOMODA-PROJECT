// Obtener referencia al formulario de inicio de sesión
const loginForm = document.getElementById('loginForm');

// Escuchar el evento de envío del formulario
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se recargue

    // Obtener los valores del formulario
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    const userType = loginForm.userType.value; // Tipo de usuario

    // Verificar que se haya seleccionado un tipo de usuario
    if (!userType) {
        alert('Por favor, selecciona tu tipo de usuario.');
        return;
    }

    // Obtener usuarios almacenados en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar un usuario que coincida con el email, contraseña y tipo de usuario
    const authenticatedUser = users.find(user => 
        user.email === email && user.password === password && user.userType === userType
    );

    if (authenticatedUser) {
        alert(`¡Bienvenido, ${authenticatedUser.username}!`);

        // Guardar un token en localStorage para mantener la sesión activa
        const userToken = generateToken();
        localStorage.setItem('userToken', userToken);

        // Guardar información del usuario en localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser));

        // Redirigir a profile.html (todos los usuarios van a la misma página)
        window.location.href = 'profile.html';  // Cambiado a "profile.html"
    } else {
        alert('Credenciales incorrectas. Por favor, verifica tu correo, contraseña y tipo de usuario.');
    }
});

// Función para generar un token de usuario (puedes adaptarla según tus necesidades)
function generateToken() {
    return 'token-' + Math.random().toString(36).substr(2);
}
