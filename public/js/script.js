let searchForm = document.querySelector('.header .search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

document.addEventListener("DOMContentLoaded", function() {
    const categoryFilter = document.getElementById('category-filter');
    const supplierFilter = document.getElementById('supplier-filter');
    const products = document.querySelectorAll('.box');

    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const selectedSupplier = supplierFilter.value;

        products.forEach(product => {
            const matchesCategory = selectedCategory === 'all' || product.getAttribute('data-category') === selectedCategory;
            const matchesSupplier = selectedSupplier === 'all' || product.getAttribute('data-supplier') === selectedSupplier;

            if (matchesCategory && matchesSupplier) {
                product.style.display = 'block'; // Mostrar producto
            } else {
                product.style.display = 'none'; // Ocultar producto
            }
        });
    }

    categoryFilter.addEventListener('change', filterProducts);
    supplierFilter.addEventListener('change', filterProducts);
});
