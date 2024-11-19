const container = document.getElementById('container-datos');
const div = document.createElement('section');
const correo = localStorage.getItem('correo');
const rol = localStorage.getItem('rol');
div.classList.add('catalog');

document.addEventListener('DOMContentLoaded', () => {
    if (!correo) {
        location.href = '/login.html';
    }

    fetch(`/profile?correo=${correo}`)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.mensaje);
                });
            }
            return response.json().then((data) => {
                procesarDatos(data);
            });
        })
        .catch((error) => {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('box-error-container');
            errorDiv.innerHTML = `
                <span>${error}</span>
            `;
            container.appendChild(errorDiv);
        });
});

function procesarDatos(data) {
    if(rol === 'administrador') {
        const admin = document.createElement('a');
        admin.href = '/admin.html';
        admin.innerText = 'Ir a administrador';
        div.appendChild(admin);
    }

    const { Nombre, Email, Celular, Direccion, Programa } = data;
    const datos = [
        { nombre: 'Nombre', valor: Nombre },
        { nombre: 'Email', valor: Email },
        { nombre: 'Celular', valor: Celular, type: 'number', limit: 10, editar: true },
        { nombre: 'Direccion', valor: Direccion, editar: true },
        { nombre: 'Programa', valor: Programa, editar: true }
    ];
    datos.forEach((dato) => {
        const p = document.createElement('p');
        p.id = dato.nombre;
        p.innerHTML = `
                        <strong>${dato.nombre}:</strong>
                        <span>${dato.valor ?? 'No registra'}</span>
                    `;
        div.appendChild(p);
    });
    container.appendChild(div);
    editarFormulario(datos);
}

function editarFormulario(datos) {
    const contenedorBoton = document.createElement('div');
    const editar = document.createElement('button');
    editar.innerText = 'Editar';
    editar.classList.add('btn');
    contenedorBoton.appendChild(editar);
    div.appendChild(contenedorBoton);
    editar.addEventListener('click', () => {
        crearInputs(datos);
        contenedorBoton.setAttribute('hidden', true);
    });
}

function crearInputs(datos) {
    const form = document.createElement('form');
    form.classList.add('form-data');
    const inputs = datos.filter(dato => dato.editar);
    const guardar = document.createElement('button');
    guardar.innerText = 'Guardar';
    guardar.classList.add('btn');
    inputs.forEach(input => {
        const p = document.getElementById(input.nombre);
        p.setAttribute('hidden', true);
        const myInput = document.createElement('input');
        myInput.placeholder = input.nombre;
        myInput.classList.add('box');
        myInput.type = input.type ?? 'text';
        if (input.limit) {
            myInput.maxLength = input.limit;
        }
        myInput.value = input.valor ?? '';
        myInput.name = input.nombre;
        myInput.id = input.nombre;
        form.appendChild(myInput);
    });
    guardar.addEventListener('click', (event) => {
        actualizarDatos(event, form);
    });
    form.appendChild(guardar);

    div.appendChild(form);
}

function actualizarDatos(event, form) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {
        Celular: formData.get('Celular'),
        Direccion: formData.get('Direccion'),
        Programa: formData.get('Programa')
    };
    fetch(`/profile?correo=${correo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.mensaje);
                });
            }
            return response.json().then((data) => {
                setTimeout(() => {
                    location.reload();
                }, 3000);
                const successDiv = document.createElement('div');
                successDiv.classList.add('box-success-container');
                successDiv.innerHTML = `
                        <span>${data.mensaje}. Redirigiendo...</span>
                    `;
                container.appendChild(successDiv);
            });
        })
        .catch((error) => {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('box-error-container');
            errorDiv.innerHTML = `
                    <span>${error}</span>
                `;
            container.appendChild(errorDiv);
        });
}

