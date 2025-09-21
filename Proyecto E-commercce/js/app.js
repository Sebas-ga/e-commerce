const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
const comprarBtn = document.getElementById("comprar");

let articulosCarrito = [];
// Cargar eventos
cargarEventListeners();

function cargarEventListeners() {
  // Traer productos  con fetch
  document.addEventListener('DOMContentLoaded', cargarProductos);

  // Cuando agregas un producto
  listaProductos.addEventListener('click', agregarproducto);

  // Elimina producto del carrito
  carrito.addEventListener('click', eliminarProducto);

  // Mostrar los productos del storage
    document.addEventListener('DOMContentLoaded', () => {
      cargarProductos();
      const dataCarrito = JSON.parse(localStorage.getItem('carrito')) || { productos: [], total: 0 };
      articulosCarrito = dataCarrito.productos;
      carritoHTML();
    });

  // Vaciar carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    total = 0;
    limpiarHTML();

    sincronizarStorage()
  
  });
};
// Cargar productos desde productos.json ===
 
function cargarProductos(){
  fetch('data/productos.json')
      .then(res => res.json())
      .then(productos => mostrarProductos(productos))
      .catch(error=>console.error("error cargando los productos",error));
};
function mostrarProductos(productos) {
  const listaProductos = document.querySelector('#lista-productos.container');
  listaProductos.innerHTML ='';
  productos.forEach(prod => {
    //console.log (prod);
    const div = document.createElement('div');
    div.classList.add('four', 'columns');
    div.innerHTML = `
      <div class="card">
        <img src="${prod.imagen}" class="u-full-width">
        <div class="info-card">
          <h4>${prod.nombre}</h4>
          <p>${prod.descripcion}</p>
          <p class="precio">${prod.precio}
          <span class="u-pull-right">${prod.oferta}</span>
          </p>
          <button class="u-full-width button-primary" data-id="${prod.id}">Ver detalle</button>
         <a href="#" class="u-full-width button-primary button input agregar-carrito"
          data-id="${prod.id}">
           Agregar al Carrito
       </a>
        </div>
      </div>
    `;
    listaProductos.appendChild(div);
  });
    //<button class="detalle-btn" data-id="${prod.id}">Ver detalle</button>
   // Evento a los botones
    document.querySelectorAll(".detalle-btn").forEach(boton => {
      boton.addEventListener("click", e => {
        const id = e.target.getAttribute("data-id");
        // Redirige pasando el id en la URL
        window.location.href = `detalle.html?id=${id}`;
      });
    });

  //Rellenar si sobran columnas (para mantener filas de 3)
 const resto = productos.length % 10;
 if (resto !== 0) {
  for (let i = resto; i < 3; i++) {
const filler = document.createElement('div');
    filler.classList.add('four', 'columns');
     filler.innerHTML = `<div style="visibility:hidden">.</div>`;
     listaProductos.appendChild(filler);
   }
 }
}

// === Carrito ===
function agregarproducto(e) {
    e.preventDefault();
      
    if( e.target.classList.contains('agregar-carrito') ) {
        console.log('se agrego');
        // alert('producto agregado');
       Swal.fire({
            title: "Producto agregado al carrito!",
            timer: 1500,
            icon: "success",
            showConfirmButton: false,
            color:"#feffffff"
});     
    const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    } 

}
function eliminarProducto(e) {
  if (e.target.classList.contains('borrar-producto')) {
    const productoId = e.target.getAttribute('data-id');
    articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
    carritoHTML();
  }
}

function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector('img').src,
    nombre: producto.querySelector('h4').textContent,
    precio: producto.querySelector('.precio span').textContent,
    id: producto.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    //
  };

  const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
  if (existe) {
    const productos = articulosCarrito.map(producto => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
    articulosCarrito = [...productos];
  } else {
    articulosCarrito = [...articulosCarrito, infoProducto];
  }

  carritoHTML();
}

// Mostrar carrito en HTML
function carritoHTML() {
  limpiarHTML();
   let total = 0;
  articulosCarrito.forEach(producto => {
    const { imagen, nombre, precio, cantidad, id } = producto;
      // convertir precio a número quitando el "$"
    const precioNumerico = parseFloat(precio.replace('$', '').replace('.', ''));
    total += precioNumerico * cantidad;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-producto" data-id="${id}">X</a></td>
    `;
    contenedorCarrito.appendChild(row);
  });
  // mostrar el total en el HTML
  const totalHTML = document.querySelector('#total');
  totalHTML.textContent = `Total: ${total}`;

  sincronizarStorage();
}

function sincronizarStorage(total) {
  console.log(articulosCarrito);
     const dataCarrito = {
    productos: articulosCarrito,
    total: total
  };
  localStorage.setItem('carrito', JSON.stringify(dataCarrito));
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    document.getElementById("total").textContent = `Total: $${total}`;
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
// Función que simula el pago con una Promesa

function procesarPago(total) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Procesando pago...",
      color:"#feffff",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // spinner de carga
      }
    });

    // Simulamos demora del servidor (2 segundos)
    setTimeout(() => {
      // Podrías meter lógica de éxito/error
      const exito = true; // simular que el pago salió bien
      if (exito) {
        resolve("Pago aprobado");
      } else {
        reject("Error en el pago");
      }
    }, 5000);
  });
}

// Evento de comprar
comprarBtn.addEventListener("click", () => {
  if (articulosCarrito.length === 0) {
    Swal.fire({
      title: "Tu carrito está vacío",
      icon: "warning",
      color:"#feffffff",
      timer: 1500,
      showConfirmButton: false
    });
    return;
  }

  procesarPago(total)
    .then((mensaje) => {
      Swal.fire({
        title: "¡Compra realizada!",
        text: mensaje,
        icon: "success",
        color:"#feffff",
        confirmButtonText: "OK"
      });

      // Reiniciar carrito
      articulosCarrito = [];
      total = 0;
      limpiarHTML();
      sincronizarStorage();
      document.getElementById("total").textContent = `Total: $${total}`;
    })
    .catch((error) => {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonText: "Intentar de nuevo"
      });
    });
});

