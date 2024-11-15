const miFormulario = document.getElementById("registerForm");

miFormulario.addEventListener("submit", (event) => {
  const miRespuesta = document.getElementById("resultado");
  event.preventDefault();
  const formData = new FormData(miFormulario);
  const nombre = formData.get("username");
  const correo = formData.get("email");
  const contrasenia = formData.get("password");
  // Referencia de fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch(`/register`, {
    method: "POST",
    body: JSON.stringify({ nombre, correo, contrasenia }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error inesperado. Contacta al administrador.");
      }
      return response.json();
    })
    .then((data) => {
      miRespuesta.innerHTML = `<h1>${data.mensaje}</h1>`;
    })
    .catch((error) => {
      miRespuesta.innerHTML = `<h1>${error}</h1>`;
    });
});