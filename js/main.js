// ═══════════════════════════════════════════════════════════
// js/main.js — TechStore
// ═══════════════════════════════════════════════════════════
 
 
// ─────────────────────────────────────────────────────────
// VARIABLES — tres formas de declarar variables en JS
// ─────────────────────────────────────────────────────────
 
const NOMBRE_TIENDA = "TechStore";
// const: no puede cambiar — úsala para valores fijos
// Convención: nombres en MAYÚSCULAS para constantes
 
let paginaActual = "inicio";
// let: puede cambiar — úsala para valores que se modifican
 
var antiguo = "esto funciona pero no se usa";
// var: forma antigua, tiene comportamientos raros — evítala
 
console.log("Tienda:", NOMBRE_TIENDA);
// console.log: escribe en la consola del navegador (F12 > Console)
// Es la herramienta número 1 para debuggear (encontrar errores)
 
 
// ─────────────────────────────────────────────────────────
// OBJETOS — agrupan datos relacionados de un mismo elemento
// ─────────────────────────────────────────────────────────
 
// Un objeto representa un gadget con todas sus propiedades
const gadget1 = {
  id: 1,                          // propiedad: número único
  nombre: "iPhone 15 Pro",         // propiedad: texto
  categoria: "smartphone",         // propiedad: texto
  precio: 1199,                    // propiedad: número
  disponible: true,                // propiedad: booleano (true/false)
  emoji: "📱",                     // propiedad: emoji como imagen
};
 
console.log(gadget1.nombre);       // "iPhone 15 Pro" — acceso con punto
console.log(gadget1["precio"]);    // 1199 — acceso con corchetes (igual)
 
// Agregar una propiedad que no existía:
gadget1.descuento = 10;            // ahora el gadget tiene % de descuento
console.log(gadget1);              // muestra el objeto completo
 
 
// ─────────────────────────────────────────────────────────
// ARRAYS — listas de elementos (aquí: lista de gadgets)
// ─────────────────────────────────────────────────────────
 
// Este array es el "mini-base de datos" de nuestra tienda
const productos = [
  {
    id: 1,
    nombre: "iPhone 15 Pro",
    categoria: "smartphone",
    precio: 1199,
    emoji: "📱",
  },
  {
    id: 2,
    nombre: 'MacBook Air M3',
    categoria: "laptop",
    precio: 1299,
    emoji: "💻",
  },
  {
    id: 3,
    nombre: "AirPods Pro",
    categoria: "accesorio",
    precio: 249,
    emoji: "🎧",
  },
  {
    id: 4,
    nombre: "Samsung Galaxy S24",
    categoria: "smartphone",
    precio: 899,
    emoji: "📱",
  },
  {
    id: 5,
    nombre: "iPad Pro 12.9",
    categoria: "tablet",
    precio: 1099,
    emoji: "📟",
  },
  {
    id: 6,
    nombre: "Apple Watch Ultra",
    categoria: "accesorio",
    precio: 799,
    emoji: "⌚",
  },
];
 
console.log("Total de productos:", productos.length);
// .length: cuántos elementos tiene el array
 
console.log("Primer producto:", productos[0].nombre);
// productos[0]: primer elemento (los arrays empiezan en 0)
 
 
// ─────────────────────────────────────────────────────────
// FUNCIONES — bloques de código reutilizables
// ─────────────────────────────────────────────────────────
 
// Función que formatea el precio con símbolo de dólar
function formatearPrecio(numero) {
  // "numero" es el parámetro (dato de entrada)
  return "$" + numero.toLocaleString();
  // return: devuelve el resultado hacia afuera
  // toLocaleString(): agrega separadores de miles: 1199 → "1,199"
}
 
console.log(formatearPrecio(1199));  // "$1,199"
console.log(formatearPrecio(249));   // "$249"
 
 
// ─────────────────────────────────────────────────────────
// CONDICIONALES — toman decisiones
// ─────────────────────────────────────────────────────────
 
function obtenerEtiquetaPrecio(precio) {
  if (precio < 300) {
    return "💚 Económico";      // menos de $300
  } else if (precio < 800) {
    return "💛 Precio medio";   // entre $300 y $799
  } else {
    return "🔴 Premium";        // $800 o más
  }
}
 
console.log(obtenerEtiquetaPrecio(249));   // "💚 Económico"
console.log(obtenerEtiquetaPrecio(899));   // "🔴 Premium"}

// ─────────────────────────────────────────────────────────
// DOM — Document Object Model
// DOM = el árbol de todos los elementos HTML de la página.
// JavaScript puede leer y modificar cualquier elemento del DOM.
// ─────────────────────────────────────────────────────────
 
 
// Función que crea el HTML de una tarjeta de producto
function crearTarjetaProducto(producto) {
  // Recibe un objeto "producto" y devuelve texto HTML
 
  const etiqueta = obtenerEtiquetaPrecio(producto.precio);
  // Llama la función que ya definimos arriba
 
  // Template literal: usamos ` ` (backtick) para escribir HTML con variables
  // Las variables se insertan así: ${nombre_variable}
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
  // Nota: este HTML es una string (texto). Para que aparezca en pantalla
  // necesitas insertarlo en un elemento del DOM.
}
 
 
// Función que muestra una lista de productos en la página
function mostrarProductos(lista) {
  // "lista" es un array de productos (puede ser todos o solo algunos)
 
  const contenedor = document.getElementById("contenedor-productos");
  // document.getElementById: busca el elemento con ese id en el HTML
  // Si no encuentra el elemento, devuelve null
 
  if (!contenedor) return;
  // Si el contenedor no existe (estamos en index.html o contacto.html),
  // salimos de la función. El ! significa "si NO existe".
 
  if (lista.length === 0) {
    // Si no hay productos que mostrar (el filtro no encontró nada)
    contenedor.innerHTML = "<p class='text-muted'>No hay productos en esta categoría.</p>";
    return;
  }
 
  // Construimos el HTML de todas las tarjetas juntas
  let html = "";
  // Empezamos con un string vacío
 
  lista.forEach(function(producto) {
    // forEach: recorre cada elemento del array
    // "producto" es cada objeto del array en cada vuelta
    html += crearTarjetaProducto(producto);
    // += agrega el HTML de cada tarjeta al string
  });
 
  contenedor.innerHTML = html;
  // innerHTML: reemplaza TODO el contenido del div con el nuevo HTML
  // Esto es lo que hace que las tarjetas aparezcan en pantalla
}
 
 
// Función para crear los botones de filtro
function crearFiltros() {
  const contenedorFiltros = document.getElementById("filtros");
  if (!contenedorFiltros) return;
  // Si no existe el div de filtros, salimos
 
  // Extraemos las categorías únicas del array de productos
  const categorias = ["todos", ...new Set(productos.map(p => p.categoria))];
  // .map: transforma cada producto en solo su categoría
  // new Set: elimina duplicados
  // ...: spread operator, convierte el Set de vuelta en array
  // "todos": agregamos esta opción al inicio
 
  categorias.forEach(function(categoria) {
    // Por cada categoría, creamos un botón
    const boton = document.createElement("button");
    // createElement: crea un nuevo elemento HTML (pero aún no está en la página)
 
    boton.textContent = categoria;
    // textContent: el texto que muestra el botón
 
    boton.className = "btn-filtro" + (categoria === "todos" ? " activo" : "");
    // Le damos la clase CSS. El primer botón ("todos") empieza activo.
 
    boton.addEventListener("click", function() {
      // addEventListener: escucha el evento "click" en este botón
 
      // Quitar la clase "activo" de todos los botones
      document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("activo"));
      // querySelectorAll: selecciona TODOS los elementos con esa clase CSS
 
      // Agregar "activo" al botón que se hizo clic
      boton.classList.add("activo");
 
      // Filtrar los productos según la categoría
      if (categoria === "todos") {
        mostrarProductos(productos);
        // Muestra todos
      } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        // .filter: crea un nuevo array con solo los que cumplen la condición
        mostrarProductos(filtrados);
      }
    });
 
    contenedorFiltros.appendChild(boton);
    // appendChild: agrega el botón al div de filtros (ahora sí aparece en pantalla)
  });
}
 
 
// Manejar el formulario de contacto
function iniciarFormulario() {
  const form = document.getElementById("form-contacto");
  if (!form) return;
  // Si no existe el formulario, salimos
 
  form.addEventListener("submit", function(evento) {
    // "submit": se dispara cuando el usuario hace clic en "Enviar"
 
    evento.preventDefault();
    // preventDefault: evita que el formulario recargue la página
    // Sin esto, la página se recargaría y perderías los datos
 
    // Leer los valores de los campos
    const nombre  = document.getElementById("nombre").value;
    const email   = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;
    // .value: el texto que el usuario escribió en el input
 
    const respuestaDiv = document.getElementById("respuesta-form");
 
    // Mostrar mensaje de confirmación
    respuestaDiv.innerHTML = `
      <div class="alert alert-success">
        <strong>¡Gracias, ${nombre}!</strong><br>
        Recibimos tu mensaje. Te contactaremos en ${email}.
      </div>
    `;
    // alert alert-success: clase de Bootstrap para alerta verde
 
    form.reset();
    // form.reset(): limpia todos los campos del formulario
  });
}
 
 
// ─────────────────────────────────────────────────────────
// INICIALIZACIÓN — ejecutar cuando la página termina de cargar
// ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  // DOMContentLoaded: se dispara cuando TODO el HTML está cargado
  // Es el momento seguro para buscar elementos del DOM
 
  crearFiltros();          // crea los botones de categoría
  mostrarProductos(productos); // muestra todos los productos
  iniciarFormulario();     // activa el formulario de contacto
 
  console.log("TechStore listo ✅");
});

