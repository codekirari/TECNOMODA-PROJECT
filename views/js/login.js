const formularioLogin = document.getElementById("loginForm");

formularioLogin.addEventListener("submit", (event) => {
    const miRespuesta = document.getElementById("resultado");
    event.preventDefault();
    const formData = new FormData(formularioLogin);
    const correo = formData.get("email");
    const contrasenia = formData.get("password");
    // Leer en MDN sobre fetch
    fetch(`/login`, {
        method: "POST",
        body: JSON.stringify({ correo, contrasenia }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la peticion. Mira la consola");
              }
            return response.json();
        })
        .then((data) => {
            if (data.mensaje === 'Sesion iniciada') {
                window.location.href = '/index.html';
                localStorage.setItem('correo', correo);
            }
        })
        .catch((error) => {
            miRespuesta.innerHTML = `<h2>${error}</h2>`;
        });
});