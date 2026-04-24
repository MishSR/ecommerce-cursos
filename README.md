# 🛒 Ecommerce Cursos API

REST API para una plataforma de venta de cursos en línea. Construida con **Node.js**, **Express** y **MongoDB** (Mongoose).

---

## 🚀 Tecnologías

- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- express-validator
- dotenv
- nodemon (desarrollo)

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ecommerce-cursos.git
cd ecommerce-cursos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Variables requeridas en `.env`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce-cursos
JWT_SECRET=tu_clave_secreta_aqui
JWT_REFRESH_SECRET=tu_refresh_secret_aqui
```

### 4. Iniciar MongoDB (Windows)

Abre una terminal **como administrador** y ejecuta:

```bash
net start MongoDB
```

> Si ves "El servicio ya ha sido iniciado", MongoDB ya está corriendo — puedes continuar.

### 5. Poblar la base de datos (opcional)

```bash
node src/seed.js
```

### 6. Iniciar el servidor

```bash
# Desarrollo (con recarga automática)
npm run dev

# Producción
npm start
```

El servidor corre en `http://localhost:3000`

---

## ⚠️ Errores comunes al iniciar

| Error | Causa | Solución |
|-------|-------|----------|
| `ECONNREFUSED 127.0.0.1:3000` | El servidor no está corriendo | Ejecutar `npm run dev` |
| `net start MongoDB` — Error sistema 5 | Sin permisos | Abrir terminal como administrador |
| `ReferenceError: isAdmin is not defined` | Falta import en alguna route | Agregar `import isAdmin from '../Middlewares/isAdminMiddleware.js'` |
| `%0A` al final de la URL en Postman | Salto de línea invisible en la URL | Hacer clic en la URL y borrar con Backspace al final |

---

## 🔐 Autenticación

La API usa **JWT (JSON Web Tokens)**. Para acceder a rutas protegidas incluye el token en el header:

```
Authorization: Bearer <tu_token>
```

El token se obtiene al hacer login en `POST /api/auth/login`.

| Nivel | Descripción |
|-------|-------------|
| `No` | Ruta pública, no requiere token |
| `Token` | Requiere token JWT válido |
| `Admin` | Requiere token JWT con rol `admin` |

---

## 👥 Roles

| Rol | Descripción |
|-----|-------------|
| `customer` | Usuario estándar. Se asigna automáticamente al registrarse. Puede gestionar su carrito, wishlist y órdenes. |
| `admin` | Acceso completo. Puede gestionar usuarios, cursos, categorías y pagos. |

---

## 📌 Endpoints

### 🔑 Auth

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión, retorna JWT | No |

### 👤 Usuarios

> ⚠️ Nota: las rutas de usuarios usan `/User` con U mayúscula.

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/users/User` | Listar usuarios | Admin |
| GET | `/api/users/User/:id` | Obtener usuario por ID | Admin |
| POST | `/api/users/User` | Crear usuario | Admin |
| PUT | `/api/users/User/:id` | Actualizar usuario | Admin |
| DELETE | `/api/users/User/:id` | Eliminar usuario | Admin |

### 🗂️ Categorías

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/categories/` | Listar categorías | No |
| GET | `/api/categories/:id` | Obtener categoría por ID | No |
| POST | `/api/categories/` | Crear categoría | Admin |
| PUT | `/api/categories/:id` | Actualizar categoría | Admin |
| DELETE | `/api/categories/:id` | Eliminar categoría | Admin |

### 📚 Cursos

> ⚠️ Nota: las rutas de cursos tienen el segmento `/courses` duplicado. Esto es por el prefijo del router + la definición interna de la ruta.

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/courses/courses` | Listar cursos | No |
| GET | `/api/courses/courses/:id` | Obtener curso por ID | No |
| POST | `/api/courses/courses` | Crear curso | Admin |
| PUT | `/api/courses/courses/:id` | Actualizar curso | Admin |
| DELETE | `/api/courses/courses/:id` | Eliminar curso | Admin |

### 🛒 Carrito

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/cart/Cart` | Listar todos los carritos | Admin |
| GET | `/api/cart/cart/:id` | Obtener carrito por ID | Admin |
| GET | `/api/cart/cart/user/:id` | Obtener carrito por usuario | Token |
| POST | `/api/cart/cart` | Crear carrito | Token |
| PUT | `/api/cart/cart/:id` | Actualizar carrito | Token |
| DELETE | `/api/cart/cart/:id` | Eliminar carrito | Token |

### 📦 Órdenes

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/orders/Order` | Listar todas las órdenes | Token |
| GET | `/api/orders/Order/:id` | Obtener orden por ID | Token |
| GET | `/api/orders/Order/user/:id` | Órdenes por usuario | Token |
| POST | `/api/orders/Order` | Crear orden | Token |
| PUT | `/api/orders/Order/:id` | Actualizar orden | Token |
| DELETE | `/api/orders/Order/:id` | Eliminar orden | Token |

### 💳 Pagos

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/payment/payment` | Listar pagos | Admin |
| GET | `/api/payment/payment/:id` | Obtener pago por ID | Admin |
| POST | `/api/payment/payment` | Registrar pago | Token |
| PUT | `/api/payment/payment/:id` | Actualizar pago | Admin |
| DELETE | `/api/payment/payment/:id` | Eliminar pago | Admin |

### ❤️ Wishlist

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/wishlist/wishlist` | Listar wishlists | Admin |
| GET | `/api/wishlist/wishlist/user/:id` | Wishlist por usuario | Token |
| POST | `/api/wishlist/wishlist` | Agregar curso a wishlist | Token |
| DELETE | `/api/wishlist/wishlist/:id/product/:courseId` | Quitar curso de wishlist | Token |
| DELETE | `/api/wishlist/wishlist/:id` | Eliminar wishlist completa | Token |

### ⭐ Reseñas

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/reviews/reviews` | Listar reseñas | Admin |
| GET | `/api/reviews/reviews/:id` | Obtener reseña por ID | Admin |
| POST | `/api/reviews/reviews` | Crear reseña | Token |
| PUT | `/api/reviews/reviews/:id` | Actualizar reseña | Admin |
| DELETE | `/api/reviews/reviews/:id` | Eliminar reseña | Admin |

---

## 📦 Ejemplos de body para Postman

### POST `/api/auth/register`
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```
**Respuesta exitosa (201):**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "role": "customer",
  "_id": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### POST `/api/auth/login`
```json
{
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```
**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/api/categories/`
> Requiere header: `Authorization: Bearer <token_admin>`
```json
{
  "name": "Desarrollo Web",
  "description": "Cursos de frontend, backend y fullstack."
}
```

---

### POST `/api/courses/courses`
> Requiere header: `Authorization: Bearer <token_admin>`
```json
{
  "title": "Node.js desde cero",
  "description": "Aprende a construir APIs REST con Node.js y Express paso a paso.",
  "price": 299,
  "duration": "6 semanas",
  "instructor": "Ana García",
  "category": "<id_de_categoria>"
}
```

---

### POST `/api/orders/Order`
> Requiere header: `Authorization: Bearer <token>`

Valores válidos para `status`: `pending`, `processing`, `shipped`, `delivered`, `cancelled`

```json
{
  "user": "<id_de_usuario>",
  "items": [
    { "courses": "<id_de_curso>", "quantity": 1 }
  ],
  "total_price": 299,
  "status": "pending"
}
```

---

### POST `/api/payment/payment`
> Requiere header: `Authorization: Bearer <token>`

Valores válidos para `method`: `Credit Card`, `Debit Card`, `Paypal`, `Bank Transfer`

```json
{
  "user": "<id_de_usuario>",
  "method": "Credit Card",
  "cardNumber": "4111111111111111",
  "cardHolder": "Juan Pérez",
  "expiryDate": "12/27",
  "isADefault": true
}
```

---

### POST `/api/wishlist/wishlist`
> Requiere header: `Authorization: Bearer <token>`
```json
{
  "userId": "<id_de_usuario>",
  "courseId": "<id_de_curso>"
}
```

---

### POST `/api/reviews/reviews`
> Requiere header: `Authorization: Bearer <token>`

`rating` debe ser un número entero entre 1 y 5.

```json
{
  "user_id": "<id_de_usuario>",
  "course_id": "<id_de_curso>",
  "rating": 5,
  "comment": "Excelente curso, muy bien explicado."
}
```

---

## 💡 Tips para Postman

- Siempre selecciona **Body → raw → JSON** al enviar datos.
- Asegúrate de que no haya espacios o saltos de línea al final de la URL (causa error `%0A`).
- Para rutas protegidas ve a **Authorization → Bearer Token** y pega tu token.
- El token tiene duración de **1 día**. Si expira, vuelve a hacer login.

---

## 📁 Estructura del proyecto

```
ecommerce-cursos/
├── src/
│   ├── Config/
│   │   └── db.config.js
│   ├── Controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── categoryController.js
│   │   ├── coursesController.js
│   │   ├── ordersController.js
│   │   ├── paymentController.js
│   │   ├── reviewsController.js
│   │   ├── userController.js
│   │   └── wishListController.js
│   ├── Middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── isAdminMiddleware.js
│   │   ├── logger.js
│   │   └── validation.js
│   ├── Models/
│   │   ├── Cart.js
│   │   ├── Category.js
│   │   ├── Courses.js
│   │   ├── Orders.js
│   │   ├── Payment.js
│   │   ├── Reviews.js
│   │   ├── User.js
│   │   └── WishList.js
│   ├── Routes/
│   │   ├── authRoute.js
│   │   ├── cartRoute.js
│   │   ├── categoryRoute.js
│   │   ├── coursesRoute.js
│   │   ├── index.js
│   │   ├── ordersRoute.js
│   │   ├── paymentRoute.js
│   │   ├── reviewsRoute.js
│   │   ├── userRoute.js
│   │   └── wishListRoute.js
│   └── seed.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js
```