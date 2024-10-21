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

    console.log('Usuarios en localStorage:', users); // Verificar qué usuarios están almacenados

    // Buscar un usuario que coincida con el email, contraseña y tipo de usuario
    const authenticatedUser = users.find(user => {
        console.log('Comparando:', user.email, email, user.password, password, user.userType, userType); // Depuración
        return user.email === email && user.password === password && user.userType === userType;
    });

    if (authenticatedUser) {
        alert(`¡Bienvenido, ${authenticatedUser.username}!`);

        // Guardar un token en localStorage para mantener la sesión activa
        const userToken = generateToken(); // Generar un token
        localStorage.setItem('userToken', userToken);

        // Guardar información del usuario en localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser));

        // Redirigir según el tipo de usuario
        switch (authenticatedUser.userType) {
            case 'user':
                window.location.href = 'user-profile.html'; // Redirigir a perfil de usuario
                break;
            case 'seller':
                window.location.href = 'seller-profile.html'; // Redirigir a perfil de vendedor
                break;
            case 'admin':
                window.location.href = 'admin-profile.html'; // Redirigir a perfil de administrador
                break;
            default:
                alert('Tipo de usuario no reconocido.');
        }

    } else {
        alert('Credenciales incorrectas. Por favor, verifica tu correo, contraseña y tipo de usuario.');
    }
});

// Función para generar un token de usuario (puedes adaptarla según tus necesidades)
function generateToken() {
    return 'token-' + Math.random().toString(36).substr(2); // Generar un token aleatorio simple
}
