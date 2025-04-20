const cardsContainer = document.getElementById("products-container");
const elementUnits = document.getElementById("units");
const elementPrice = document.getElementById("price");
const elementEmptyCart = document.getElementById("empty-cart");
const elementTotals = document.getElementById("totals");
const elementResetCart = document.getElementById("btnRst");

// RENDERIZA LOS PRODUCTOS GUARDADOS EN EL CARRITO Y LOS MUESTRA EN PANTALLA.
function createStartCards() {
    cardsContainer.innerHTML = "";

    // OBTENER PRODUCTOS DEL CARRITO DESDE EL LOCALSTORAGE.
    const products = JSON.parse(localStorage.getItem("cart-item")) || [];

    // SI HAY PRODUCTOS, LOS MUESTRA EN FORMA DE CARDS.
    if (products && products.length > 0) {
        products.forEach(product => {
            const newProduct = document.createElement("div");
            newProduct.classList = "product-card";
            newProduct.innerHTML = `
                <img src="./img/${product.id}.jpeg">
                <h3 class="productName">${product.name}</h3>
                <p class="priceProduct">$${product.price}</p>
                <div>
                    <button class="lessProduct">-</button>
                    <span class="amount">${product.amount}</span>
                    <button class="moreProduct">+</button>
                </div>
            `;

            // AGREGAR LA CARD AL CONTENEDOR.
            cardsContainer.appendChild(newProduct);

            // BOTÓN PARA AUMENTAR LA CANTIDAD DEL PRODUCTO.
            newProduct.querySelector(".moreProduct").addEventListener("click", (e) => {
                const countElement = e.target.parentElement.getElementsByTagName("span")[0];
                countElement.innerText = addToCart(product);
                updateTotals();
            });

            // BOTÓN PARA DISMINUIR LA CANTIDAD DEL PRODUCTO.
            newProduct.querySelector(".lessProduct").addEventListener("click", () => {
                quitToCart(product);
                createStartCards();
                updateTotals();
            });
        });
    }
}

createStartCards();
updateTotals();

function updateTotals() {
    const products = JSON.parse(localStorage.getItem("cart-item"));
    let units = 0;
    let price = 0;
    if (products && products.length > 0) {
        products.forEach(product => {
            units += product.amount;
            price += product.price * product.amount;
        })
        elementUnits.innerText = units;
        elementPrice.innerText = price;
    }
    checkEmptyMessage();
}

function checkEmptyMessage() {
    const products = JSON.parse(localStorage.getItem("cart-item"));

    if (!products || products.length === 0) {
        elementEmptyCart.classList.remove("hidden"); 
        elementTotals.classList.add("hidden");
    } else {
        elementEmptyCart.classList.add("hidden");    
        elementTotals.classList.remove("hidden");
    }
}
checkEmptyMessage();

elementResetCart.addEventListener("click", resetCart)
function resetCart() {
    localStorage.removeItem("cart-item");
    updateTotals();
    createStartCards();
    updateCartNum();
}

