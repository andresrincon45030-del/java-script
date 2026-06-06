let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

mostrarResultados();

function guardarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function obtenerProducto() {
    let nombre = document.getElementById("nombre").value;
    let precio = Number(document.getElementById("precio").value);
    let cantidad = Number(document.getElementById("cantidad").value);

    return {
        nombre,
        precio,
        cantidad,
    };
}

function limpiarInputs() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
}

function agregarProducto() {
    let producto = obtenerProducto();

    if (
        producto.nombre === "" ||
        producto.precio <= 0 ||
        producto.cantidad <= 0
    ) {
        document.getElementById("resultado").innerHTML =
            "Complete todos los campos";

        return;
    }

    carrito.push(producto);

    guardarLocalStorage();

    document.getElementById("resultado").innerHTML =
        "Producto agregado correctamente";

    limpiarInputs();
}

function eliminarProducto() {
    let nombreEliminar = document.getElementById("eliminar").value;
    let nuevoCarrito = [];

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre !== nombreEliminar) {
            nuevoCarrito.push(carrito[i]);
        }
    }

    carrito = nuevoCarrito;

    guardarLocalStorage();

    mostrarResultados();
}

function calcularTotal() {
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].cantidad;
    }

    return total;
}

function calcularDescuento(total) {
    let descuento = total * 0.1;

    return total - descuento;
}

function obtenerProductos() {
    let texto = "";

    for (let i = 0; i < carrito.length; i++) {
        texto += `
        
        ${carrito[i].nombre}
        - $${carrito[i].precio}
        - Cantidad: ${carrito[i].cantidad}

        <br><br>

        `;
    }

    return texto;
}

function mostrarResultados() {
    if (carrito.length === 0) {
        document.getElementById("resultado").innerHTML = "El carrito está vacío";

        return;
    }

    let productos = obtenerProductos();
    let total = calcularTotal();
    let totalDescuento = calcularDescuento(total);

    document.getElementById("resultado").innerHTML = `
    
    <h3>Productos:</h3>

    ${productos}

    <h3>Total:</h3>

    $${total}

    <h3>Total con descuento:</h3>

    $${totalDescuento}

    `;
}
