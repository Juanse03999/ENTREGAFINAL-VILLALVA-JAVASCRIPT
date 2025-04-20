// SUMA PRODUCTOS AL CARRITO Y ACTUALIZA EL LOCALSTORAGE.
function addToCart(product) {
    const storage = JSON.parse(localStorage.getItem("cart-item"));
    let count = 0;
    if (!storage) {
        const OtherNewProduct = getNewProductForStorage(product);
        localStorage.setItem("cart-item",JSON.stringify ([OtherNewProduct]));
        count = 1;
    } else {
        const productIndex = storage.findIndex(Tshirt => Tshirt.id === product.id);
        const newStorage = storage;
        if (productIndex === -1) {
            newStorage.push(getNewProductForStorage(product));
            count = 1;
        } else {
            newStorage[productIndex].amount ++;
            count = newStorage[productIndex].amount;
        }
        localStorage.setItem("cart-item",JSON.stringify (newStorage));
    }
    updateCartNum();
    return count;
}

// RESTA PRODUCTOS AL CARRITO Y ACTUALIZA EL LOCALSTORAGE.
function quitToCart(product) {
    const storage = JSON.parse(localStorage.getItem("cart-item")) || [];
    const productIndex = storage.findIndex(item => item.id === product.id);

    if (productIndex === -1) {
        console.warn("Producto no encontrado en el carrito.");
        return;
    }

    if (storage[productIndex].amount > 1) {
        storage[productIndex].amount--;
        localStorage.setItem("cart-item", JSON.stringify(storage));
        updateCartNum();
    }
    else {
        Swal.fire({
            title: '¿Eliminar producto?',
            text: `¿Quieres eliminar ${product.name} del carrito?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                storage.splice(productIndex, 1);
                localStorage.setItem("cart-item", JSON.stringify(storage));
                updateCartNum();
                updateTotals();
                createStartCards();
                Swal.fire('¡Producto eliminado del carrito!', '', 'success');
            } else {
                updateTotals();
            }
        });
    }
}

// DEVUELVE UN NUEVO OBJETO RPODUCTO CON CANTIDAD INICIAL DE 1.
function getNewProductForStorage(product) {
    const newProduct = product;
    newProduct.amount = 1;
    return newProduct;
}

// ACTUALIZA EL NÚMERO QUE APARECE EN EL ÍCONO DEL CARRITO.
const cartCountdownElement = document.getElementById("cart-countdown");
function updateCartNum() {
    const storage = JSON.parse(localStorage.getItem("cart-item"));
    if (storage && storage.length > 0) {
        const count = storage.reduce((acum, current) => acum + current.amount, 0);
        cartCountdownElement.innerText = count;
    } else {
        cartCountdownElement.innerText = 0;
    }
}

updateCartNum();