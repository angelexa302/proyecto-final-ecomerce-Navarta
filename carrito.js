document.addEventListener("DOMContentLoaded", mostrarProductosCarrito);

function mostrarProductosCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const listaProductosCarrito = document.getElementById("productos-carrito");

 
  listaProductosCarrito.innerHTML = "";

  if (carrito.length > 0) {
    carrito.forEach((producto) => {
      const li = document.createElement("li");
      li.innerHTML = `${producto.titulo} - $${producto.precio}`;
      listaProductosCarrito.appendChild(li);
    });
  } else {
    listaProductosCarrito.innerHTML =
      "<li>No hay productos en el carrito.</li>";
  }
}
mostrarProductosCarrito();

function actualizarCarrito() {
  const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedorProductosCarrito =
    document.getElementById("productos-carrito");
  const totalCarritoProductos = document.getElementById("total-carrito");

  contenedorProductosCarrito.innerHTML = "";

  let totalCarrito = 0;

  productosCarrito.forEach((producto) => {
    const div = document.createElement("div");
    div.innerHTML = `<img class="imagen-carrito" src="${producto.imagen}"></img> <p>${producto.titulo} - $${producto.precio}</p>
        <button onclick= "removerDelCarrito('${producto.id}')">Remover</button> 
        `;
    contenedorProductosCarrito.appendChild(div);
    totalCarrito += producto.precio;
  });
  totalCarritoProductos.innerText = totalCarrito.toFixed(2);
  
}
document.addEventListener("DOMContentLoaded", actualizarCarrito);

document.getElementById("vaciar-carrito").addEventListener("click", () => {
  localStorage.setItem("carrito", JSON.stringify([]));
  actualizarCarrito();
});

function removerDelCarrito(productId) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const nuevoCarrito = carrito.filter((producto) => producto.id !== productId);
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  actualizarCarrito();
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
  document
    .querySelector(".cart-summ")
    .setAttribute("data-items-count", totalArticulos);
  document.querySelector(
    ".contador-carrito"
  ).innerHTML = `Carrito ${totalArticulos} artículos de <span class="price-summ cart-totals"><span class="woocommerce-Price-amount amount"><bdi><span id="total-carrito">$${totalPrecio.toFixed(
    2
  )}</span></bdi></span></span>`;
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
