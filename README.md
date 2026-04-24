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
MONGO_URI=mongodb://localhost:27017/ecommerce-cursos
JWT_SECRET=tu_clave_secreta_aqui
```

### 4. Poblar la base de datos (opcional)

```bash
node src/seed.js
```

### 5. Iniciar el servidor

```bash
# Desarrollo (con recarga automática)
npm run dev

# Producción
npm start
```

El servidor corre en `http://localhost:3000`

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
| `customer` | Usuario estándar. Puede gestionar su carrito, wishlist y órdenes. |
| `admin` | Acceso completo. Puede gestionar usuarios, cursos, categorías y pagos. |

---

## 📌 Endpoints

### 🔑 Auth

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión, retorna JWT | No |

### 👤 Usuarios

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/users/User` | Listar usuarios (paginado) | Admin |
| GET | `/api/users/User/:id` | Obtener usuario por ID | Admin |
| POST | `/api/users/User` | Crear usuario | Admin |
| PUT | `/api/users/User/:id` | Actualizar usuario | Admin |
| DELETE | `/api/users/User/:id` | Eliminar usuario | Admin |

Parámetros de paginación: `?page=1&limit=10`

### 🗂️ Categorías

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/categories/` | Listar categorías | No |
| GET | `/api/categories/:id` | Obtener categoría por ID | No |
| POST | `/api/categories/` | Crear categoría | Admin |
| PUT | `/api/categories/:id` | Actualizar categoría | Admin |
| DELETE | `/api/categories/:id` | Eliminar categoría | Admin |

### 📚 Cursos

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/courses/courses` | Listar cursos (paginado) | No |
| GET | `/api/courses/courses/:id` | Obtener curso por ID | No |
| POST | `/api/courses/courses` | Crear curso | Admin |
| PUT | `/api/courses/courses/:id` | Actualizar curso | Admin |
| DELETE | `/api/courses/courses/:id` | Eliminar curso | Admin |

Parámetros de paginación: `?page=1&limit=10`

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
| GET | `/api/payment/payment` | Listar métodos de pago | Admin |
| GET | `/api/payment/payment/:id` | Obtener pago por ID | Admin |
| POST | `/api/payment/payment` | Registrar método de pago | Token |
| PUT | `/api/payment/payment/:id` | Actualizar método de pago | Admin |
| DELETE | `/api/payment/payment/:id` | Eliminar método de pago | Admin |

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

## 📦 Ejemplos de body (Postman)

### POST `/api/auth/register`
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```

### POST `/api/auth/login`
```json
{
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```
**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/api/categories/`
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
  "category": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

---

### POST `/api/cart/cart`
> Requiere header: `Authorization: Bearer <token>`
```json
{
  "user_id": "64f1a2b3c4d5e6f7a8b9c0d2",
  "items": [
    { "course_id": "64f1a2b3c4d5e6f7a8b9c0d3", "quantity": 1 }
  ]
}
```

---

### POST `/api/orders/Order`
> Requiere header: `Authorization: Bearer <token>`

Valores válidos para `status`: `pending`, `processing`, `shipped`, `delivered`, `cancelled`

```json
{
  "user": "64f1a2b3c4d5e6f7a8b9c0d2",
  "items": [
    { "courses": "64f1a2b3c4d5e6f7a8b9c0d3", "quantity": 1 }
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
  "user": "64f1a2b3c4d5e6f7a8b9c0d2",
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
  "userId": "64f1a2b3c4d5e6f7a8b9c0d2",
  "courseId": "64f1a2b3c4d5e6f7a8b9c0d3"
}
```

### DELETE `/api/wishlist/wishlist/:id/product/:courseId`
> No requiere body. Los IDs van en la URL.
```
DELETE /api/wishlist/wishlist/64f1a2b3c4d5e6f7a8b9c0d4/product/64f1a2b3c4d5e6f7a8b9c0d3
```

---

### POST `/api/reviews/reviews`
> Requiere header: `Authorization: Bearer <token>`

`rating` debe ser un número entero entre 1 y 5.

```json
{
  "user_id": "64f1a2b3c4d5e6f7a8b9c0d2",
  "course_id": "64f1a2b3c4d5e6f7a8b9c0d3",
  "rating": 5,
  "comment": "Excelente curso, muy bien explicado."
}
```

### PUT `/api/reviews/reviews/:id`
> Requiere header: `Authorization: Bearer <token_admin>`

Solo se actualizan los campos enviados.
```json
{
  "rating": 4,
  "comment": "Muy buen curso, aunque podría tener más ejercicios."
}
```

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