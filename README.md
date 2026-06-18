# Inmobiliaria API

REST API para gestión de inmuebles con autenticación JWT.

## Tecnologías

- Node.js + Express 5
- MySQL2
- JWT (jsonwebtoken)
- bcrypt
- pnpm

## Instalación

```bash
pnpm install
```

Copia el archivo de variables de entorno y configúralo:

```bash
cp .env.example .env
```

## Variables de entorno

| Variable     | Descripción                        |
|--------------|------------------------------------|
| `PORT`       | Puerto del servidor (default: 3000)|
| `HOST`       | Host de MySQL                      |
| `USERDB`     | Usuario de MySQL                   |
| `PASSWORD`   | Contraseña de MySQL                |
| `DBNAME`     | Nombre de la base de datos         |
| `JWT_SECRET` | Clave secreta para firmar JWT      |

## Base de datos

Ejecuta el siguiente SQL para crear las tablas necesarias:

```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inmuebles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(12, 2) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Ejecutar el servidor

```bash
# Desarrollo (con recarga automática)
pnpm dev

# Producción
pnpm start
```

## Endpoints

### Autenticación

| Método | Ruta               | Descripción              | Auth |
|--------|--------------------|--------------------------|------|
| POST   | /api/auth/register | Registrar nuevo usuario  | No   |
| POST   | /api/auth/login    | Iniciar sesión           | No   |

### Inmuebles

| Método | Ruta                | Descripción                | Auth |
|--------|---------------------|----------------------------|------|
| GET    | /api/inmuebles      | Listar todos los inmuebles | No   |
| GET    | /api/inmuebles/:id  | Obtener inmueble por ID    | No   |
| POST   | /api/inmuebles      | Crear inmueble             | Sí   |
| PUT    | /api/inmuebles/:id  | Actualizar inmueble        | Sí   |
| DELETE | /api/inmuebles/:id  | Eliminar inmueble          | Sí   |

> Las rutas marcadas con **Sí** requieren el header:
> `Authorization: Bearer <token>`

## Ejemplos de uso

### Registrar usuario

```http
POST /api/auth/register
Content-Type: application/json

{
    "nombre": "Juan García",
    "email": "juan@ejemplo.com",
    "password": "miPassword123"
}
```

**Respuesta `201`:**
```json
{
    "mensaje": "Usuario registrado exitosamente",
    "id": 1
}
```

---

### Iniciar sesión

```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "juan@ejemplo.com",
    "password": "miPassword123"
}
```

**Respuesta `200`:**
```json
{
    "mensaje": "Login exitoso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
        "id": 1,
        "nombre": "Juan García",
        "email": "juan@ejemplo.com"
    }
}
```

---

### Crear inmueble

```http
POST /api/inmuebles
Authorization: Bearer <token>
Content-Type: application/json

{
    "titulo": "Apartamento en el centro",
    "descripcion": "Amplio apartamento de 3 habitaciones",
    "precio": 250000.00,
    "tipo": "apartamento",
    "ciudad": "Bogotá"
}
```

**Respuesta `201`:**
```json
{
    "mensaje": "Inmueble creado exitosamente",
    "id": 1
}
```

---

### Obtener todos los inmuebles

```http
GET /api/inmuebles
```

**Respuesta `200`:**
```json
[
    {
        "id": 1,
        "titulo": "Apartamento en el centro",
        "descripcion": "Amplio apartamento de 3 habitaciones",
        "precio": "250000.00",
        "tipo": "apartamento",
        "ciudad": "Bogotá",
        "created_at": "2026-06-17T00:00:00.000Z"
    }
]
```

---

### Actualizar inmueble

```http
PUT /api/inmuebles/1
Authorization: Bearer <token>
Content-Type: application/json

{
    "titulo": "Apartamento renovado",
    "descripcion": "Amplio apartamento recién remodelado",
    "precio": 275000.00,
    "tipo": "apartamento",
    "ciudad": "Bogotá"
}
```

**Respuesta `200`:**
```json
{
    "mensaje": "Inmueble actualizado exitosamente"
}
```

---

### Eliminar inmueble

```http
DELETE /api/inmuebles/1
Authorization: Bearer <token>
```

**Respuesta `200`:**
```json
{
    "mensaje": "Inmueble eliminado exitosamente"
}
```

## Códigos de respuesta

| Código | Significado                                      |
|--------|--------------------------------------------------|
| 200    | Éxito                                            |
| 201    | Recurso creado exitosamente                      |
| 400    | Datos inválidos o faltantes                      |
| 401    | No autenticado (token ausente o credenciales incorrectas) |
| 403    | Token inválido o expirado                        |
| 404    | Recurso no encontrado                            |
| 500    | Error interno del servidor                       |
