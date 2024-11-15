document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("category-filter");
    const supplierFilter = document.getElementById("supplier-filter");
    const productBoxes = document.querySelectorAll(".box");

    function filterProducts() {
        const category = categoryFilter.value;
        const supplier = supplierFilter.value;

        productBoxes.forEach((box) => {
            const productCategory = box.getAttribute("data-category");
            const productSupplier = box.getAttribute("data-supplier");

            if ((category === "all" || productCategory === category) &&
                (supplier === "all" || productSupplier === supplier)) {
                box.style.display = "block";
            } else {
                box.style.display = "none";
            }
        });
    }

    categoryFilter.addEventListener("change", filterProducts);
    supplierFilter.addEventListener("change", filterProducts);
});
