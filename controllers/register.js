document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value.trim();
    const userType = document.getElementById('user-type').value;
    const username = document.querySelector('input[name="username"]').value.trim();

    // Validaciones
    if (!email || !password || !confirmPassword || !userType || !username) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    fetch('http://localhost:30 00/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: username, correo: email, contrasena: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje === 'Usuario registrado exitosamente') {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        } else {
            alert(data.mensaje);  // Mostrar el mensaje del servidor
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al registrar el usuario.');
    });
});
