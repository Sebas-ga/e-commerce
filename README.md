# e-commerce
proyecto e-commerce con JavaScript

Este proyecto implementa un carrito de compras dinámico utilizando JavaScript, SweetAlert2 para notificaciones y almacenamiento en LocalStorage para persistencia de datos.  
El sistema carga los productos desde un archivo "productos.json" permite agregarlos al carrito, eliminarlos, vaciar el carrito y simular un proceso de pago con promesas.

 Características principales
- Carga dinámica de productos desde `data/productos.json`.
- Renderizado de productos en tarjetas (`cards`) con imagen, descripción y botones.
- Funcionalidad para:
  - Agregar productos al carrito.
  - Eliminar productos individualmente.
  - Vaciar el carrito completo.
  - Persistir datos en LocalStorage.
  - Mostrar el total acumulado de la compra.
- Simulación de proceso de compra con un spinner de carga.
- Notificaciones elegantes con SweetAlert2.
