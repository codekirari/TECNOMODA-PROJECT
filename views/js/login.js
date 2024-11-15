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
            // si la respuesta no es correcta, se lanza un error
            if (!response.ok) {
                // usamos then para leer el mensaje de error
                // debido a que response.json() retorna una promesa
                return response.json().then((data) => {
                    throw new Error(data.mensaje);
                });
            }
            return response.json().then((data) => {
                if (data.mensaje === 'Sesion iniciada') {
                    window.location.href = '/index.html';
                    localStorage.setItem('correo', correo);
                }
            });
        })
        .catch((error) => {
            // si hay un error, se muestra en el div resultado
            miRespuesta.innerHTML = '';
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('box-error-container');
            errorDiv.innerHTML = `
                <span>${error}</span>
            `;
            miRespuesta.appendChild(errorDiv);
        });
});