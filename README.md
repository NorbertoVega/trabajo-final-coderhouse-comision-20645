# Trabajo Final Coderhouse Comisión 20645

Proyecto ecommerce Backend que implementa un servidor basado en Node.js, Express y Websockets.

## Routes

## Producto: /api/productos

#### GET: '/' 
Obtiene una lista con todos los productos disponibles. Si no hay ningún producto se obtiene una lista vacía.
#### GET: '/:id' 
Obtiene un producto (si existe) por su id.
#### GET: 'api/producto/category/:category'
Obtiene los productos que son de la categoría ingresada por param.
#### POST: '/' 
Para incorporar productos al listado (disponible solo para administradores).
#### PUT: '/:id' 
Actualiza un producto por su id (disponible solo para administradores).
#### DELETE: '/:id' 
Borra un producto por su id (disponible solo para administradores).

## Carrito: /api/carrito

#### POST: '/' 
Crea un carrito y devuelve su id.
#### DELETE: '/:id' 
Elimina el carrito (si existe) con el id ingresado por param.
#### GET: '/:id/productos' 
Obtiene una lista de todos los productos guardados en el carrito con el id ingresado por param.
#### POST: '/:id/productos/:id_prod' 
Agrega un producto al carrito por su id de carrito y de producto.
#### DELETE: '/:id/productos/:id_prod' 
Eliminar un producto del carrito por su id de carrito y de producto.

## Usuario /api/usuario

#### POST: '/registro'
Registra un nuevo usuario guardando su informacion en BD. Se envía un email al admin con los datos del nuevo cliente. El email y pass del admin se puede obtener de la ruta '/api/info'.
#### POST: '/login' 
Realiza autenticación de un usuario ya registrado. Se utiliza la estrategia de Passport Local y se genera una sesión cuyo tiempo está determinado por la variable COOKIE_MAX_AGE del .env.
#### GET: '/loginsuccess'
Ruta a la que se redirecciona cuando el login fue exitoso.
#### GET: '/loginerror'
Ruta a la que se redirecciona cuando el login falla.
#### GET: '/logout'
Finaliza la sesión del usuario.
#### GET: '/sessionstatus'
Checkea si el usuario está autenticado.
### POST: '/convertUserToAdmin'
Este endpoint transforma en admin a un usuario ya registrado.

## Checkout /api/checkout

#### POST: '/:idCart'
Este endpoint a traves del id de carrito pasado por param se encarga de verificar si hay stock suficiente en cada uno de los items del carrito, luego
genera una orden y envía al usuario un mail con la lista de productos seleccionados indicando cantidad y precio de cada uno.

## Chat /api/chats

#### GET: '/'
Renderiza la plantilla 'messages' que se encuentra en /views. Esta vista a través de un websocket, muestra y actualiza (a medida que se van agregando) los mensajes de un chat general.
#### GET: '/:email'
Obtiene todos los mensajes generados por el usaurio con el mail ingresado por param.

## Info '/api/info'

#### GET: '/'
Este endpoint devuelve información relativa al servidor y sus configuraciones. Recopila datos del .env y del objeto process.

## Error Codes

## errorcode = 1: ruta no autorizada
## errorcode = 2: producto no se pudo guardar en la BD
## errorcode = 3: producto a agregar con formato inválido
## errorcode = 4: producto no encontrado
## errorcode = 5: carrito ya existe
## errorcode = 6: usuario no encontrado
## errorcode = 7: carrito no encontrado
## errorcode = 8: no hay suficiente stock 
## errorcode = 9: problema al actualizar el carrito
## errorcode = 10: hay productos sin stock suficiente
## errorcode = 11: error al generar la orden

## Información adicional

### Se usa winston para los logs
### Nodemailer para hacer el envío de mails
### Passport Local para la autenticación
### En /src/db está todo lo relacionando a la persistencia de datos
### La persistencia de los datos se hace MongoDB Atlas.
