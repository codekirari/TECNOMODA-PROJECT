document.addEventListener('DOMContentLoaded', function() {
    // Obtener el carrito almacenado en localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para agregar un producto al carrito
    function addToCart(productId, productName, productPrice) {
        const product = { id: productId, name: productName, price: productPrice };
        cart.push(product);

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${productName} ha sido añadido al carrito.`);
    }

    // Ejemplo de uso: agregar un producto desde el catálogo
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        const productId = 1; // ID del producto
        const productName = 'Producto Ejemplo';
        const productPrice = 100; // Precio del producto

        addToCart(productId, productName, productPrice);
    });

    // Mostrar los productos en el carrito
    const cartList = document.getElementById('cart-list');
    cart.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerText = `${product.name} - $${product.price}`;
        cartList.appendChild(listItem);
    });
});
