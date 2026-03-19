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


// ─────────────────────────────────────────────────────────
// PROMESAS Y ASYNC/AWAIT
// ─────────────────────────────────────────────────────────
 
// FORMA ANTIGUA — con .then() y .catch()
// Funciona, pero se vuelve difícil de leer cuando hay muchos pasos
function cargarConThen() {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(function(respuesta) {
      // Se ejecuta cuando llega la respuesta
      return respuesta.json(); // convierte el texto a objeto JS
    })
    .then(function(datos) {
      // Se ejecuta cuando el JSON está listo
      console.log("Con .then():", datos.title);
    })
    .catch(function(error) {
      // Se ejecuta si CUALQUIER paso anterior falló
      console.error("Error con .then():", error);
    });
}
 
 
// FORMA MODERNA — con async/await
// Hace EXACTAMENTE lo mismo pero se lee de arriba a abajo como código normal
async function cargarConAwait() {
  // "async" marca la función como asíncrona
  // Una función async siempre devuelve una Promesa
 
  try {
    // "try": intenta ejecutar este bloque de código
 
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    // "await": pausa esta función hasta que fetch() termine
    // Mientras espera, el resto del navegador sigue funcionando
 
    let datos = await respuesta.json();
    // Otro await: espera a que el JSON se convierta a objeto
 
    console.log("Con async/await:", datos.title);
    // Aquí ya tenemos los datos disponibles
 
  } catch (error) {
    // "catch": si ALGO falló en el try, cae aquí
    // Captura: sin internet, URL inválida, servidor caído, etc.
    console.error("Error con async/await:", error.message);
  }
}
 
// Las dos funciones hacen lo mismo — usa async/await de ahora en adelante
cargarConAwait();
 
 
// ─────────────────────────────────────────────────────────
// LOS TRES TIPOS DE ERROR QUE DEBES MANEJAR
// ─────────────────────────────────────────────────────────
 
async function cargarProductosExternos() {
  // Esta función carga datos desde la API pública JSONPlaceholder
  // Usamos /users porque tiene datos con nombre y email, útil para practicar
 
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;
 
  // Mostrar indicador de carga mientras esperamos la respuesta
  contenedor.innerHTML = `
    <div class="col-12 text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Cargando desde la API...</p>
    </div>
  `;
  // spinner-border: animación de carga de Bootstrap
 
  try {
 
    // ── Error tipo 1: sin internet o URL inválida ──────────
    // Si no hay conexión, fetch() lanza un error aquí mismo
    // El catch() lo captura automáticamente
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
 
    // ── Error tipo 2: el servidor respondió con error ──────
    // fetch() NO lanza error aunque el servidor responda 404 o 500
    // Debemos verificar manualmente con respuesta.ok
    if (!respuesta.ok) {
      // respuesta.ok = true solo si el código HTTP es 200-299
      throw new Error("Error del servidor: " + respuesta.status);
      // throw: lanza un error manualmente → va al catch()
    }
 
    // ── Error tipo 3: JSON inválido ────────────────────────
    // Si el servidor envió texto malformado, .json() falla aquí
    let usuarios = await respuesta.json();
 
    // Si llegamos aquí, todo salió bien
    // Ahora construimos las tarjetas con datos reales
    let html = "";
    usuarios.slice(0, 6).forEach(function(usuario) {
      // .slice(0, 6): toma solo los primeros 6 usuarios
      html += `
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-img-top">👤</div>
            <div class="card-body">
              <span class="badge-categoria">usuario</span>
              <h5 class="card-title mt-2">${usuario.name}</h5>
              <p class="text-muted small">${usuario.email}</p>
              <p class="precio small text-success">📍 ${usuario.address.city}</p>
            </div>
          </div>
        </div>
      `;
    });
 
    contenedor.innerHTML = html;
    console.log("Datos cargados desde la API ✅");
 
  } catch (error) {
    // Cualquiera de los 3 tipos de error llega aquí
    console.error("Error al cargar:", error.message);
 
    // Mostramos el error de forma amigable al usuario
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">
          <strong>No se pudieron cargar los productos.</strong><br>
          Verifica tu conexión a internet e intenta de nuevo.
        </div>
        <button onclick="cargarProductosExternos()" class="btn btn-outline-primary">
          Reintentar
        </button>
      </div>
    `;
    // REGLA: nunca muestres el error técnico al usuario
    // El console.error() es para los developers (F12)
    // El alert es para el usuario común
  }
}
 
// Para probar: llama esta función en lugar de mostrarProductos()
// Descomenta la línea de abajo y comenta la de mostrarProductos() en DOMContentLoaded
// cargarProductosExternos();

// ── PETICIÓN que tu navegador envía ──────────────────────
//
// GET /users/1 HTTP/1.1
// ↑verbo  ↑ruta  ↑versión del protocolo
//
// Host: jsonplaceholder.typicode.com   ← a qué servidor va
// Accept: application/json             ← quiero recibir JSON
// User-Agent: Mozilla/5.0 ...          ← qué navegador soy
//
// (línea vacía)
// [en GET no hay body — solo pedimos, no enviamos datos]
 
 
// ── RESPUESTA que el servidor devuelve ───────────────────
//
// HTTP/1.1 200 OK
// ↑versión  ↑código  ↑texto del código
//
// Content-Type: application/json    ← los datos son JSON
// Content-Length: 450               ← cuántos bytes tiene
//
// (línea vacía)
// { "id": 1, "name": "TechStore" }  ← el body con los datos

// ─────────────────────────────────────────────────────────
// HTTP EN CÓDIGO — los 4 verbos con fetch()
// Usamos JSONPlaceholder como servidor de práctica
// Es una API pública que acepta todos los verbos
// ─────────────────────────────────────────────────────────
 
 
// ══ VERBO GET — pedir datos ══════════════════════════════
// Úsalo cuando: quieres leer información sin modificar nada
// Tiene: solo la URL. Sin body, sin Content-Type.
 
async function httpGET() {
  console.log("─── GET ───────────────────────────────");
 
  try {
    // fetch() sin segundo parámetro = GET por defecto
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/1");
 
    console.log("Código de estado:", respuesta.status);
    // Muestra: 200 (si todo bien)
 
    console.log("respuesta.ok:", respuesta.ok);
    // Muestra: true (porque 200 está en el rango 200-299)
 
    if (!respuesta.ok) throw new Error("Código: " + respuesta.status);
 
    let datos = await respuesta.json();
    console.log("Datos recibidos:", datos.title);
 
  } catch (error) {
    console.error("GET falló:", error.message);
  }
}
 
 
// ══ VERBO POST — crear algo nuevo ════════════════════════
// Úsalo cuando: quieres guardar algo nuevo en el servidor
// Tiene: method, headers con Content-Type, y body con los datos
 
async function httpPOST() {
  console.log("─── POST ──────────────────────────────");
 
  // Los datos que quiero guardar en el servidor
  const nuevoProducto = {
    title: "iPhone 15 Pro",
    body: "El mejor smartphone del año",
    userId: 1,
  };
 
  try {
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
      // El segundo parámetro de fetch() es el objeto de configuración
 
      method: "POST",
      // ↑ Le dice al servidor qué verbo usar
      // Sin esto, fetch() usa GET por defecto
 
      headers: {
        "Content-Type": "application/json",
        // ↑ Le avisa al servidor que los datos son JSON
        // Sin este header, el servidor no sabe cómo leer el body
      },
 
      body: JSON.stringify(nuevoProducto),
      // ↑ Los datos a enviar, convertidos de objeto JS a texto JSON
      // JSON.stringify({ a: 1 }) → '{"a":1}'
      // El servidor recibe el texto y lo convierte de vuelta a objeto
    });
 
    console.log("Código de estado:", respuesta.status);
    // Deberías ver: 201 (Created)
 
    let creado = await respuesta.json();
    console.log("El servidor creó el recurso con id:", creado.id);
    // JSONPlaceholder devuelve el objeto con un id asignado
 
  } catch (error) {
    console.error("POST falló:", error.message);
  }
}
 
 
// ══ VERBO PUT — reemplazar completamente ═════════════════
// Úsalo cuando: quieres actualizar TODOS los campos de un recurso
// El id va en la URL, los datos nuevos van en el body
 
async function httpPUT() {
  console.log("─── PUT ───────────────────────────────");
 
  // El objeto COMPLETO con todos sus campos actualizados
  const productoActualizado = {
    id: 1,
    title: "iPhone 15 Pro — EDICIÓN ACTUALIZADA",
    body: "Descripción actualizada completa",
    userId: 1,
  };
 
  try {
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    // ↑ El /1 al final de la URL indica QUÉ recurso actualizar
 
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoActualizado),
    });
 
    console.log("Código de estado:", respuesta.status);
    // Deberías ver: 200 (OK)
 
    let resultado = await respuesta.json();
    console.log("Recurso actualizado:", resultado.title);
 
  } catch (error) {
    console.error("PUT falló:", error.message);
  }
}
 
 
// ══ VERBO DELETE — borrar ════════════════════════════════
// Úsalo cuando: quieres eliminar un recurso del servidor
// El id va en la URL — generalmente no hay body
 
async function httpDELETE() {
  console.log("─── DELETE ────────────────────────────");
 
  try {
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    // ↑ /1 al final: borrar el recurso con id 1
 
      method: "DELETE",
      // En DELETE: solo el método. Sin headers, sin body.
    });
 
    console.log("Código de estado:", respuesta.status);
    // Deberías ver: 200 (JSONPlaceholder usa 200 en DELETE)
    // En APIs reales: 204 No Content (borrado sin datos que devolver)
 
    if (respuesta.ok) {
      console.log("Recurso borrado exitosamente ✅");
    }
 
  } catch (error) {
    console.error("DELETE falló:", error.message);
  }
}
 
 
// ══ PRUEBA EL ERROR 404 — cuando el recurso no existe ════
 
async function probarError404() {
  console.log("─── Probando error 404 ────────────────");
 
  try {
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/99999");
    // El post con id 99999 no existe → servidor responde 404
 
    console.log("Código de estado:", respuesta.status);
    // Verás: 404
 
    console.log("respuesta.ok:", respuesta.ok);
    // Verás: false  (porque 404 no está en el rango 200-299)
 
    // ⚠️ PUNTO CRÍTICO: fetch() NO lanza error cuando el servidor
    // responde 404 o 500. La petición "llegó y tuvo respuesta".
    // Por eso SIEMPRE debes verificar respuesta.ok manualmente.
 
    if (!respuesta.ok) {
      throw new Error("No encontrado. Código: " + respuesta.status);
    }
 
  } catch (error) {
    console.error("Error capturado:", error.message);
    // Aquí sí llegamos porque lanzamos el error manualmente con throw
  }
}
 
 
// ═══════════════════════════════════════════════════════
// EJECUTAR TODAS LAS PRUEBAS
// Abre F12 > Console y verás los resultados de cada verbo
// ═══════════════════════════════════════════════════════
httpGET();
httpPOST();
httpPUT();
httpDELETE();
probarError404();

// ─────────────────────────────────────────────────────────
// Funciones de demo visual para index.html
// Cada función hace una petición HTTP y muestra el resultado
// ─────────────────────────────────────────────────────────
 
// Helper: muestra el resultado en la caja de demo
function mostrarResultadoDemo(verbo, codigo, esExito, datos) {
  const caja = document.getElementById("demo-resultado");
  if (!caja) return;
 
  // Definir el color según el resultado
  const colorVerbo = {
    GET: "success", POST: "primary", PUT: "warning", DELETE: "danger"
  };
  const color = colorVerbo[verbo] || "secondary";
 
  caja.innerHTML = `
    <div class="d-flex align-items-center gap-2 mb-2">
      <span class="badge bg-${color}">${verbo}</span>
      <span class="badge bg-${esExito ? "success" : "danger"}">${codigo}</span>
      <small class="text-muted">${esExito ? "✅ Éxito" : "❌ Error"}</small>
    </div>
    <pre class="mb-0 small" style="white-space:pre-wrap">${JSON.stringify(datos, null, 2)}</pre>
  `;
  // <pre>: respeta espacios y saltos de línea (ideal para mostrar JSON)
  // JSON.stringify(datos, null, 2): convierte el objeto a texto con 2 espacios de indentación
}
 
 
async function demoGET() {
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let d = await r.json();
    mostrarResultadoDemo("GET", r.status, r.ok, { id: d.id, titulo: d.title });
  } catch (e) {
    mostrarResultadoDemo("GET", "Error de red", false, { error: e.message });
  }
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
  } catch (e) {
    mostrarResultadoDemo("POST", "Error de red", false, { error: e.message });
  }
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
  } catch (e) {
    mostrarResultadoDemo("PUT", "Error de red", false, { error: e.message });
  }
}
 
 
async function demoDELETE() {
  try {
    let r = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    });
    mostrarResultadoDemo("DELETE", r.status, r.ok, {
      mensaje: r.ok ? "Recurso borrado exitosamente" : "No se pudo borrar",
    });
  } catch (e) {
    mostrarResultadoDemo("DELETE", "Error de red", false, { error: e.message });
  }
}

