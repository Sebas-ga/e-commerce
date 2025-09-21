const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("data/productos.json")
  .then(res => res.json())
  .then(data => {
    const producto = data.find(p => p.id == id);
    if (!producto) {
      document.getElementById("detalle").innerHTML = "<p>Producto no encontrado</p>";
      return;
    }

    document.getElementById("detalle").innerHTML = `
    <div class="detalle-header">
    <button id="volver-btn">⬅ Volver</button>
    </div>

      <h2>${producto.nombre}</h2>
      <p>Precio: ${producto.oferta}</p>
      <p>${producto.descripcion}</p>
      <img src="${producto.imagen}" alt="${producto.nombre}" />
    
    `;
     document.getElementById("volver-btn").addEventListener("click", () => {
      window.location.href = "index.html";
    });
  });
     //<button id="volver-btn">⬅ Volver a la tienda</button>