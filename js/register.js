document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los datos del formulario
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value.trim(); // Campo de confirmación de contraseña
    const userType = document.getElementById('user-type').value;
    const username = document.querySelector('input[name="username"]').value.trim(); // Nombre de usuario
    
    // Validar que todos los campos estén completos
    if (!email || !password || !confirmPassword || !userType || !username) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
    }

    // Obtener usuarios existentes de localStorage o crear un array vacío
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el correo ya está registrado
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('Este correo ya está registrado. Intenta con otro o inicia sesión.');
        return;
    }

    // Crear un objeto para el nuevo usuario
    const newUser = {
        email: email,
        password: password,
        userType: userType,
        username: username
    };

    // Agregar el nuevo usuario al array
    users.push(newUser);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Redirigir al login o mostrar un mensaje de éxito
    alert('Registro exitoso. Puedes iniciar sesión ahora.');
    window.location.href = 'login.html'; // Redirigir al login
});
