// EVENTO AL HACER CLICK EN EL BOTON COMPRAR.
document.getElementById("btnBuyDiscount").addEventListener("click", buyProduct);

// SIMULA UNA COMPRA MOSTRANDO EL PRECIO TOTAL.
function buyProduct() {
    getPrice();
}

function cancelPurchase() {
    alert("Compra cancelada, ¡vuelva pronto!");
    return null;
}

function getPrice() {

    const products = JSON.parse(localStorage.getItem("cart-item"));
    const total = products.reduce((sum, product) => sum + (product.price * product.amount),0);

    Swal.fire({
        title: '¡Gracias por su compra!',
        text: `El precio pagado es de: $${total} pesos.`,
        icon: 'success',
        confirmButtonText: 'Volver'
    })

}