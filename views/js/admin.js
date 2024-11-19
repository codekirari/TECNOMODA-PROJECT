const adminContenedor = document.getElementById('container-admin');
const rol = localStorage.getItem('rol')

function borrarUsuario(email) {
    fetch(`/usuarios/${email}`, {
        method: 'DELETE',
    }).then(response => {
        if (!response.ok) {
            // usamos then para leer el mensaje de error
            // debido a que response.json() retorna una promesa
            return response.json().then((data) => {
                throw new Error(data.mensaje);
            });
        }

        return response.json().then((data) => {
            // si la respuesta es correcta, se muestra en el div resultado
            const successDiv = document.createElement('div');
            successDiv.classList.add('box-success-container');
            successDiv.innerHTML = `
                    <span>${data.mensaje}</span>
                `;
            adminContenedor.innerHTML = '';
            adminContenedor.appendChild(successDiv);
            setTimeout(() => {
                location.reload();
            }, 5000);
        });
    }).catch(error => {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('box-error-container');
        errorDiv.innerHTML = `
                <span>${error}</span>
            `;
        adminContenedor.appendChild(errorDiv);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    if(rol != 'administrador') {
        localStorage.clear();
        window.location.href = '/login.html';
    }

    if (adminContenedor) {
        fetch('/usuarios', {
            method: 'GET',
        }).then(response => {
            if (!response.ok) {
                // usamos then para leer el mensaje de error
                // debido a que response.json() retorna una promesa
                return response.json().then((data) => {
                    throw new Error(data.mensaje);
                });
            }

            return response.json().then((data) => {
                const tabla = document.createElement('table');
                tabla.classList.add('order-table');
                tabla.innerHTML = `
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(usuario => `
                                <tr>
                                    <td>${usuario.Nombre}</td>
                                    <td>${usuario.Email}</td>
                                    <td>${usuario.rol}</td>
                                    <td>
                                        <button class="btn btn-danger" onclick="borrarUsuario('${usuario.Email}')">Borrar</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    `;
                adminContenedor.appendChild(tabla);
            });

        }).catch(error => {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('box-error-container');
            errorDiv.innerHTML = `
                    <span>${error}</span>
                `;
            adminContenedor.appendChild(errorDiv);
        })

    }
})