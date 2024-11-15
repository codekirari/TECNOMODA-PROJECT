// Esto permite que el DOM se cargue antes de ejecutar el código

document.addEventListener('DOMContentLoaded', function() {
    const conSesion = document.getElementById('con-sesion');
    const sinSesion = document.getElementById('sin-sesion');

    const correo = localStorage.getItem('correo');

    if (correo) {
        conSesion.style.display = 'block';
        sinSesion.style.display = 'none';
    } else {
        conSesion.style.display = 'none';
        sinSesion.style.display = 'block';
    }

    const cerrarSesion = document.getElementById('cerrar-sesion');
    const correoMostrar = document.getElementById('correo-mostrar');
    correoMostrar.innerText = `👤 ${correo}`;
    cerrarSesion.addEventListener('click', () => {
        localStorage.removeItem('correo');
        location.reload();
    });

});