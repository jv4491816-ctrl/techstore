// ═══════════════════════════════════════════════════════
// js/main.js — TechStore (versión corregida)
// ═══════════════════════════════════════════════════════
 
// ─── VARIABLES ──────────────────────────────────────────
const NOMBRE_TIENDA = "TechStore";
let paginaActual = "inicio";
console.log("Tienda:", NOMBRE_TIENDA);
 
// ─── OBJETOS ────────────────────────────────────────────
const gadget1 = {
  id: 1,
  nombre: "iPhone 15 Pro",
  categoria: "smartphone",
  precio: 1199,
  disponible: true,
  emoji: "📱",
};
console.log(gadget1.nombre);
gadget1.descuento = 10;
 
// ─── ARRAY DE PRODUCTOS (mini base de datos local) ──────
const productos = [
  { id: 1, nombre: "iPhone 15 Pro",      categoria: "smartphone", precio: 1199, emoji: "📱" },
  { id: 2, nombre: "MacBook Air M3",     categoria: "laptop",     precio: 1299, emoji: "💻" },
  { id: 3, nombre: "AirPods Pro",        categoria: "accesorio",  precio: 249,  emoji: "🎧" },
  { id: 4, nombre: "Samsung Galaxy S24", categoria: "smartphone", precio: 899,  emoji: "📱" },
  { id: 5, nombre: "iPad Pro 12.9",      categoria: "tablet",     precio: 1099, emoji: "📟" },
  { id: 6, nombre: "Apple Watch Ultra",  categoria: "accesorio",  precio: 799,  emoji: "⌚" },
];
console.log("Total de productos:", productos.length);
 
// ─── FUNCIONES UTILITARIAS ──────────────────────────────
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString();
}
 
function obtenerEtiquetaPrecio(precio) {
  if (precio < 300) {
    return "💚 Económico";
  } else if (precio < 800) {
    return "💛 Precio medio";
  } else {
    return "🔴 Premium";
  }
}
 
// ─── DOM — MOSTRAR PRODUCTOS LOCALES ────────────────────
function crearTarjetaProducto(producto) {
  const etiqueta = obtenerEtiquetaPrecio(producto.precio);
  return `
    <div class="col-md-4">
      <div class="card h-100">
        <div class="card-img-top">${producto.emoji}</div>
        <div class="card-body">
          <span class="badge-categoria">${producto.categoria}</span>
          <h5 class="card-title mt-2">${producto.nombre}</h5>
          <p class="precio">${formatearPrecio(producto.precio)}</p>
          <small class="text-muted">${etiqueta}</small>
        </div>
        <div class="card-footer bg-transparent">
          <button class="btn btn-primary w-100">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `;
}
 
function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;
  if (lista.length === 0) {
    contenedor.innerHTML = "<p class='text-muted'>No hay productos en esta categoría.</p>";
    return;
  }
  let html = "";
  lista.forEach(function(producto) {
    html += crearTarjetaProducto(producto);
  });
  contenedor.innerHTML = html;
}
 
function crearFiltros() {
  const contenedorFiltros = document.getElementById("filtros");
  if (!contenedorFiltros) return;
  const categorias = ["todos", ...new Set(productos.map(function(p) { return p.categoria; }))];
  categorias.forEach(function(categoria) {
    const boton = document.createElement("button");
    boton.textContent = categoria;
    boton.className = "btn-filtro" + (categoria === "todos" ? " activo" : "");
    boton.addEventListener("click", function() {
      document.querySelectorAll(".btn-filtro").forEach(function(b) {
        b.classList.remove("activo");
      });
      boton.classList.add("activo");
      if (categoria === "todos") {
        mostrarProductos(productos);
      } else {
        const filtrados = productos.filter(function(p) {
          return p.categoria === categoria;
        });
        mostrarProductos(filtrados);
      }
    });
    contenedorFiltros.appendChild(boton);
  });
}
 
// ─── FORMULARIO DE CONTACTO ─────────────────────────────
function iniciarFormulario() {
  const form = document.getElementById("form-contacto");
  if (!form) return;
  form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const nombre  = document.getElementById("nombre").value;
    const email   = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;
    const respuestaDiv = document.getElementById("respuesta-form");
    // CORRECCIÓN: ahora sí se muestra el mensaje en la confirmación
    respuestaDiv.innerHTML = `
      <div class="alert alert-success">
        <strong>¡Gracias, ${nombre}!</strong><br>
        Recibimos tu mensaje: "${mensaje}"<br>
        Te contactaremos en ${email}.
      </div>
    `;
    form.reset();
  });
}
 
// ─── ASYNC/AWAIT — dos formas de hacer lo mismo ─────────
// FORMA ANTIGUA con .then()
function cargarConThen() {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(datos) {
      console.log("Con .then():", datos.title);
    })
    .catch(function(error) {
      console.error("Error con .then():", error);
    });
}
 
// FORMA MODERNA con async/await (hace lo mismo, más legible)
async function cargarConAwait() {
  try {
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let datos = await respuesta.json();
    console.log("Con async/await:", datos.title);
  } catch (error) {
    console.error("Error con async/await:", error.message);
  }
}
 
// ─── CARGAR PRODUCTOS DESDE API EXTERNA ─────────────────
async function cargarProductosExternos() {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;
  contenedor.innerHTML = `
    <div class="col-12 text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Cargando desde la API...</p>
    </div>
  `;
  try {
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respuesta.ok) {
      throw new Error("Error del servidor: " + respuesta.status);
    }
    let usuarios = await respuesta.json();
    let html = "";
    usuarios.slice(0, 6).forEach(function(usuario) {
      html += `
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-img-top">👤</div>
            <div class="card-body">
              <span class="badge-categoria">usuario</span>
              <h5 class="card-title mt-2">${usuario.name}</h5>
              <p class="text-muted small">${usuario.email}</p>
              <p class="precio">${usuario.address.city}</p>
            </div>
          </div>
        </div>
      `;
    });
    contenedor.innerHTML = html;
    console.log("Datos cargados desde la API ✅");
  } catch (error) {
    console.error("Error al cargar:", error.message);
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">
          <strong>No se pudieron cargar los productos.</strong><br>
          Verifica tu conexión e intenta de nuevo.
        </div>
        <button onclick="cargarProductosExternos()" class="btn btn-outline-primary">
          Reintentar
        </button>
      </div>
    `;
  }
}
 
// ─── LOS 4 VERBOS HTTP ──────────────────────────────────
async function httpGET() {
  console.log("─── GET ───────────────────────────────");
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    console.log("Código de estado:", r.status);
    if (!r.ok) throw new Error("Código: " + r.status);
    let d = await r.json();
    console.log("Datos recibidos:", d.title);
  } catch (e) { console.error("GET falló:", e.message); }
}
 
async function httpPOST() {
  console.log("─── POST ──────────────────────────────");
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "iPhone 15 Pro", body: "El mejor", userId: 1 }),
    });
    console.log("Código de estado:", r.status);
    let d = await r.json();
    console.log("Creado con id:", d.id);
  } catch (e) { console.error("POST falló:", e.message); }
}
 
async function httpPUT() {
  console.log("─── PUT ───────────────────────────────");
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, title: "iPhone ACTUALIZADO", body: "Nueva desc", userId: 1 }),
    });
    console.log("Código de estado:", r.status);
    let d = await r.json();
    console.log("Actualizado:", d.title);
  } catch (e) { console.error("PUT falló:", e.message); }
}
 
async function httpDELETE() {
  console.log("─── DELETE ────────────────────────────");
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts/1", { method: "DELETE" });
    console.log("Código de estado:", r.status);
    if (r.ok) console.log("Borrado exitosamente ✅");
  } catch (e) { console.error("DELETE falló:", e.message); }
}
 
async function probarError404() {
  console.log("─── Probando error 404 ────────────────");
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts/99999");
    console.log("Código de estado:", r.status);
    if (!r.ok) throw new Error("No encontrado. Código: " + r.status);
  } catch (e) { console.error("Error capturado:", e.message); }
}
 
// ─── DEMO VISUAL HTTP (botones en index.html) ───────────
function mostrarResultadoDemo(verbo, codigo, esExito, datos) {
  const caja = document.getElementById("demo-resultado");
  if (!caja) return;
  const colores = { GET: "success", POST: "primary", PUT: "warning", DELETE: "danger" };
  const color = colores[verbo] || "secondary";
  caja.innerHTML = `
    <div class="d-flex align-items-center gap-2 mb-2">
      <span class="badge bg-${color}">${verbo}</span>
      <span class="badge bg-${esExito ? "success" : "danger"}">${codigo}</span>
      <small class="text-muted">${esExito ? "✅ Éxito" : "❌ Error"}</small>
    </div>
    <pre class="mb-0 small" style="white-space:pre-wrap">${JSON.stringify(datos, null, 2)}</pre>
  `;
}
 
async function demoGET() {
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let d = await r.json();
    mostrarResultadoDemo("GET", r.status, r.ok, { id: d.id, titulo: d.title });
  } catch (e) { mostrarResultadoDemo("GET", "Error de red", false, { error: e.message }); }
}
 
async function demoPOST() {
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Nuevo gadget", body: "Descripción", userId: 1 }),
    });
    let d = await r.json();
    mostrarResultadoDemo("POST", r.status, r.ok, { id_asignado: d.id, titulo: d.title });
  } catch (e) { mostrarResultadoDemo("POST", "Error de red", false, { error: e.message }); }
}
 
async function demoPUT() {
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, title: "Gadget actualizado", body: "Nueva desc", userId: 1 }),
    });
    let d = await r.json();
    mostrarResultadoDemo("PUT", r.status, r.ok, { titulo_nuevo: d.title });
  } catch (e) { mostrarResultadoDemo("PUT", "Error de red", false, { error: e.message }); }
}
 
async function demoDELETE() {
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts/1", { method: "DELETE" });
    mostrarResultadoDemo("DELETE", r.status, r.ok, {
      mensaje: r.ok ? "Recurso borrado exitosamente" : "No se pudo borrar",
    });
  } catch (e) { mostrarResultadoDemo("DELETE", "Error de red", false, { error: e.message }); }
}
 
// ═══════════════════════════════════════════════════════
// INICIALIZACIÓN — punto de entrada único
// Todo lo que se ejecuta al cargar la página va aquí.
// NADA debe llamarse fuera de este bloque.
// ═══════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", function() {
 
  iniciarFormulario();        // activa el formulario (contacto.html)
  crearFiltros();             // crea botones de filtro (productos.html)
  mostrarProductos(productos);// muestra los 6 gadgets (productos.html)
 
  // Solo en index.html (donde existe #demo-resultado)
  const hayDemo = document.getElementById("demo-resultado");
  if (hayDemo) {
    cargarConThen();    // muestra .then() en consola
    cargarConAwait();   // muestra async/await en consola
    httpGET();
    httpPOST();
    httpPUT();
    httpDELETE();
    probarError404();
  }
 
  console.log("TechStore listo ✅");
});
