// Esto permite que el DOM se cargue antes de ejecutar el código
const rutas = [
    {
        nombre: 'Inicio',
        url: 'index.html'
    },
    {
        nombre: 'Catálogo',
        url: 'catalog.html'
    },
    {
        nombre: 'Proveedores',
        url: 'sellers.html'
    },
    {
        nombre: '¿Quiénes somos?',
        url: 'about.html'
    },
    {
        nombre: 'Cuenta',
        url: '#',
        idLi: 'sin-sesion',
        subRutas: [
            {
                nombre: 'Iniciar sesión',
                url: 'login.html'
            },
            {
                nombre: 'Registrarse',
                url: 'register.html'
            }
        ]
    },
    {
        nombre: 'Cuenta',
        url: '#',
        idLi: 'con-sesion',
        id: 'correo-mostrar',
        subRutas: [
            {
                nombre: 'Perfil',
                url: 'profile.html'
            },
            {
                nombre: 'Cerrar sesión',
                url: 'login.html',
                id: 'cerrar-sesion'
            }
        ]
    }
]

const iconos = [
    {
        nombre: 'fas fa-shopping-cart',
        url: 'cart.html'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Crear seccion header
    const header = document.createElement('header');
    header.classList.add('header');
    agregarLogo(header);
    agregarNavegacion(header);
    agregarIconos(header);

    document.body.insertBefore(header, document.body.firstChild);

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

function agregarIconos(header) {
    const divIconos = document.createElement('div');
    divIconos.classList.add('icons');
    iconos.forEach(icono => {
        const a = document.createElement('a');
        a.href = icono.url;
        a.className = icono.nombre;
        divIconos.appendChild(a);
    });
    header.appendChild(divIconos);
}

function agregarNavegacion(header) {
    const nav = document.createElement('nav');
    nav.classList.add('navbar');
    const ul = document.createElement('ul');
    rutas.forEach(ruta => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = ruta.url;
        a.innerText = ruta.nombre;
        li.appendChild(a);
        if (ruta.subRutas) {
            const ulSub = document.createElement('ul');
            ruta.subRutas.forEach(subRuta => {
                const liSub = document.createElement('li');
                const aSub = document.createElement('a');
                aSub.href = subRuta.url;
                aSub.innerText = subRuta.nombre;
                if (subRuta.id) {
                    aSub.id = subRuta.id;
                }
                if (subRuta.idLi) {
                    liSub.id = subRuta.idLi;
                }
                liSub.appendChild(aSub);
                ulSub.appendChild(liSub);
            });
            li.appendChild(ulSub);
        }
        if (ruta.id) {
            a.id = ruta.id;
        }
        if (ruta.idLi) {
            li.id = ruta.idLi;
        }
        ul.appendChild(li);
    });
    nav.appendChild(ul);
    header.appendChild(nav);
}

function agregarLogo(header) {
    const contenedorImagen = document.createElement('a');
    contenedorImagen.href = '/';
    contenedorImagen.classList.add('logo');
    const img = document.createElement('img');
    img.src = 'images/logo/logo-no-background.png';
    img.alt = 'Logo';
    contenedorImagen.appendChild(img);
    header.appendChild(contenedorImagen);
}
