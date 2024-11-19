const miFormulario = document.getElementById("registerForm");

miFormulario.addEventListener("submit", (event) => {
  const miRespuesta = document.getElementById("resultado");
  event.preventDefault();
  const formData = new FormData(miFormulario);
  const nombre = formData.get("username");
  const correo = formData.get("email");
  const contrasenia = formData.get("password");
  const rol = formData.get("rol");
  const verificacionContrasenia = formData.get("confirmPassword");

  if (contrasenia !== verificacionContrasenia) {
    miRespuesta.innerHTML = `<h1>Las contraseñas no coinciden</h1>`;
    return;
  }
  // Referencia de fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch(`/register`, {
    method: "POST",
    body: JSON.stringify({ nombre, correo, contrasenia, rol }),
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
        // si la respuesta es correcta, se muestra en el div resultado
        miRespuesta.innerHTML = '';
        const successDiv = document.createElement('div');
        successDiv.classList.add('box-success-container');
        successDiv.innerHTML = `
            <span>${data.mensaje ?? JSON.stringify(data)}</span>
            <span>Haz click <a href="/login.html">aquí</a> para iniciar sesión</span>
        `;
        // Oculta mensaje de "¿Ya tienes cuenta?" si el registro fue exitoso
        const tienesCuenta = document.getElementById('tienes-cuenta');
        tienesCuenta.innerHTML = '';
        miRespuesta.appendChild(successDiv);
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