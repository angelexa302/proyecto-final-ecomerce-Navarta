const URL = "productos.json";
let productos = [];

const contenedorProductos = document.querySelector("#contenedor-productos");

function cargarProductos(productos) {
  contenedorProductos.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="producto-detalles">
      <h3 class="producto-titulo">${producto.titulo}</h3>
      <p class="producto-precio">$${producto.precio}</p>
      <button class="producto-agregar" id="${producto.id}">Agregar</button>
    </div>`;
    contenedorProductos.appendChild(div);
    document
      .getElementById(producto.id)
      .addEventListener("click", () => agregarAlCarrito(producto));
  });
}

function obtenerProductos() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      productos = data;
      cargarProductos(productos);
    })
    .catch((error) => console.error("Error al cargar los productos:", error));
}

function mostrarProductos(categoria) {
  const productosFiltrados = productos.filter(
    (producto) => producto.categoria === categoria
  );
  cargarProductos(productosFiltrados);
}

document.getElementById("vinos-blancos").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarProductos("Vinos Blancos");
});
document.getElementById("vinos-tintos").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarProductos("Vinos Tintos");
});
document.getElementById("vinos-rosados").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarProductos("Vinos Rosados");
});

obtenerProductos();

function agregarAlCarrito(productoSeleccionado) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(productoSeleccionado);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  Swal.fire(`${productoSeleccionado.titulo} Agregado al carrito!`);
}
function actualizarTotalCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let totalPrecio = carrito.reduce(
    (total, producto) => total + producto.precio,
    0
  );
  let totalArticulos = carrito.length;

  document.getElementById(
    "total-carrito"
  ).textContent = `${totalPrecio.toFixed(2)}`;
  document.querySelector(".cart-summ").setAttribute("data-items-count", totalArticulos);
  document.querySelector(".contador-carrito").innerHTML = `Carrito ${totalArticulos} artículos de <span class="price-summ cart-totals"><span class="woocommerce-Price-amount amount"><bdi><span id="total-carrito">$${totalPrecio.toFixed(2)}</span></bdi></span></span>`;
  const mensajeCarritoVacio = document.querySelector(".mensaje-carrito-vacio");
  if(carrito.length > 0) {
    mensajeCarritoVacio.style.display = "none";
  } else {
    mensajeCarritoVacio.style.display = "block";
  }
}

function agregarAlCarrito(productoSeleccionado) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(productoSeleccionado);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  Swal.fire(`${productoSeleccionado.titulo} agregado al carrito!`);
  actualizarTotalCarrito();
}

document.addEventListener("DOMContentLoaded", (event) => {
  actualizarTotalCarrito();
});
