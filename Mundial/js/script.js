// Arreglo con los partidos disponibles
const partidos = [
  {
    id: 1,
    encuentro: "Colombia vs Brasil",
    fecha: "15/06/2026",
    estadio: "MetLife Stadium",
  },
  {
    id: 2,
    encuentro: "Argentina vs Francia",
    fecha: "18/06/2026",
    estadio: "SoFi Stadium",
  },
  {
    id: 3,
    encuentro: "España vs Alemania",
    fecha: "21/06/2026",
    estadio: "AT&T Stadium",
  },
  {
    id: 4,
    encuentro: "Inglaterra vs Portugal",
    fecha: "24/06/2026",
    estadio: "Mercedes-Benz Stadium",
  },
  {
    id: 5,
    encuentro: "Mexico vs Estados Unidos",
    fecha: "27/06/2026",
    estadio: "Estadio Azteca",
  },
];

// Precios por tribuna
const precios = {
  Norte: 100000,
  Sur: 100000,
  Oriental: 180000,
  Occidental: 250000,
  VIP: 500000,
};

// Referencias a los elementos HTML
const selectPartido = document.getElementById("partido");
const selectTribuna = document.getElementById("tribuna");
const inputCantidad = document.getElementById("cantidad");
const total = document.getElementById("total");
const listaTickets = document.getElementById("listaTickets");
const btnComprar = document.getElementById("btnComprar");

// Recuperar compras almacenadas
let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

// Carga los partidos dentro del selector
function cargarPartidos() {
  for (let partido of partidos) {
    selectPartido.innerHTML += `
            <option value="${partido.id}">
                ${partido.encuentro}
            </option>
        `;
  }
}

// Calcular el total según la tribuna y cantidad
function calcularTotal() {
  let precio = precios[selectTribuna.value];
  let cantidad = Number(inputCantidad.value);
  let resultado = precio * cantidad;

  total.textContent = `Total: $${resultado.toLocaleString()}`;
}

// Guardar tickets en localStorage
function guardarTickets() {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

// Mostrar tickets comprados
function mostrarTickets() {
  listaTickets.innerHTML = "";

  for (let ticket of tickets) {
    listaTickets.innerHTML += `
        <div class="ticket">
            <h3>🎟 Ticket Mundial 2026</h3>
            <p><strong>Cliente:</strong> ${ticket.nombre}</p>
            <p><strong>Documento:</strong> ${ticket.documento}</p>
            <p><strong>Partido:</strong> ${ticket.partido}</p>
            <p><strong>Fecha:</strong> ${ticket.fecha}</p>
            <p><strong>Estadio:</strong> ${ticket.estadio}</p>
            <p><strong>Tribuna:</strong> ${ticket.tribuna}</p>
            <p><strong>Cantidad:</strong> ${ticket.cantidad}</p>
            <p><strong>Total:</strong> $${ticket.total.toLocaleString()}</p>

            <button class="imprimir" onclick="prepararImpresion(${ticket.id})">
                🖨 Imprimir Ticket
            </button>

            <button onclick="eliminarTicket(${ticket.id})">
                Eliminar Ticket
            </button>
        </div>
        `;
  }
}

// Crear una compra
function comprarTicket() {
  let nombre = document.getElementById("nombre").value.trim();
  let documento = document.getElementById("documento").value.trim();

  if (nombre === "" || documento === "") {
    alert("Complete todos los campos");
    return;
  }

  let partidoSeleccionado = partidos.find(
    (partido) => partido.id == selectPartido.value,
  );

  let valorTotal = precios[selectTribuna.value] * Number(inputCantidad.value);

  let nuevoTicket = {
    id: Date.now(),
    nombre: nombre,
    documento: documento,
    partido: partidoSeleccionado.encuentro,
    fecha: partidoSeleccionado.fecha,
    estadio: partidoSeleccionado.estadio,
    tribuna: selectTribuna.value,
    cantidad: Number(inputCantidad.value),
    total: valorTotal,
  };

  tickets.push(nuevoTicket);
  guardarTickets();
  mostrarTickets();

  // Se eliminó por completo la línea de impresión automática aquí

  document.getElementById("nombre").value = "";
  document.getElementById("documento").value = "";
  inputCantidad.value = 1;
  calcularTotal();
}

// Eliminar un ticket
function eliminarTicket(id) {
  tickets = tickets.filter((ticket) => ticket.id !== id);
  guardarTickets();
  mostrarTickets();
}

// Buscar el objeto del ticket para enviarlo a la ventana de impresión
function prepararImpresion(id) {
  let ticketEncontrado = tickets.find((ticket) => ticket.id === id);
  if (ticketEncontrado) {
    imprimirTicket(ticketEncontrado);
  }
}

// Generar la impresión del ticket
function imprimirTicket(ticket) {
  let ventana = window.open("", "_blank");

  ventana.document.write(`
        <html>
        <head>
            <title>Ticket Mundial 2026</title>
            <style>
                body {
                    font-family: Arial;
                    padding: 30px;
                }
                h1 {
                    text-align: center;
                }
                .boleta {
                    border: 2px dashed black;
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            <div class="boleta">
                <h1>MUNDIAL FIFA 2026</h1>
                <hr>
                <p><strong>Cliente:</strong> ${ticket.nombre}</p>
                <p><strong>Documento:</strong> ${ticket.documento}</p>
                <p><strong>Partido:</strong> ${ticket.partido}</p>
                <p><strong>Fecha:</strong> ${ticket.fecha}</p>
                <p><strong>Estadio:</strong> ${ticket.estadio}</p>
                <p><strong>Tribuna:</strong> ${ticket.tribuna}</p>
                <p><strong>Cantidad:</strong> ${ticket.cantidad}</p>
                <p><strong>Total:</strong> $${ticket.total.toLocaleString()}</p>
            </div>
        </body>
        </html>
    `);

  ventana.document.close();
  ventana.print();
}

// Eventos de la aplicación
selectTribuna.addEventListener("change", calcularTotal);
inputCantidad.addEventListener("input", calcularTotal);
btnComprar.addEventListener("click", comprarTicket);

// Inicio de la aplicación
cargarPartidos();
calcularTotal();
mostrarTickets();
