// CONTENEDOR DE CARDS DE PRODUCTOS.
const cardsContainer = document.getElementById("products-container");

async function loadProducts() {
    try {
        const response = await fetch (`./products.json`);
        if (!response.ok) throw new Error("Error al cargar los productos");
        const products = await response.json();
        createStartCards(products);
    } catch (error) {
        swal.fire("Error", "No se pudieron cargar los productos", "Error");
    }
}

// GENERA Y MUESTRA LAS CARDS DE PRODUCTOS EN EL HTML.
function createStartCards(products) {
    products.forEach(product => {
        const newProduct = document.createElement("div");
        newProduct.classList = "product-card";
        newProduct.innerHTML =  `
        <img src="./img/${product.id}.jpeg">
        <h3 class="productName">${product.name}</h3>
        <p class="priceProduct">$${product.price}</p>
        <button class="btnadd">Agregar al carrito</button>`
        cardsContainer.appendChild(newProduct);
        newProduct.getElementsByTagName("button")[0].addEventListener("click", () => {
            addToCart(product)
        });
    });
}

loadProducts();