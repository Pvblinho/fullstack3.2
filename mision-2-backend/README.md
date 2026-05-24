# 🟠 MISIÓN 2 — "El backend es inmantenible"

## Contexto

> "index.js tiene 400 líneas. Nadie sabe qué hace qué.
> El nuevo dev renunció después de leerlo. Refactoriza esto."

## El problema

El archivo `src/index.js` mezcla rutas, lógica de negocio y acceso a datos
en un solo archivo. Es imposible de testear, mantener o escalar.

## Arquitectura objetivo

```
src/
├── routes/         ← solo define las rutas HTTP (URLs y métodos)
├── controllers/    ← recibe req/res, llama al service, devuelve respuesta
├── services/       ← lógica de negocio (reglas, validaciones)
├── repositories/   ← acceso a datos (consultas, transformaciones)
└── models/         ← estructuras de datos (en prod: esquemas de DB)
```

## Regla de oro

Cada capa solo habla con la capa inmediatamente inferior:

```
Router → Controller → Service → Repository → Datos
```

## Cómo correr

```bash
npm install && npm start
# API en http://localhost:3002
```

## Endpoints disponibles

| Método | Ruta              | Descripción  |
| ------ | ----------------- | ------------ |
| GET    | /api/products     | Listar todos |
| GET    | /api/products/:id | Obtener uno  |
| POST   | /api/products     | Crear        |
| PUT    | /api/products/:id | Actualizar   |
| DELETE | /api/products/:id | Eliminar     |

## Criterios de éxito

1. ✅ Ningún archivo tiene más de 60 líneas
2. ✅ El controller NO accede a los datos directamente
3. ✅ El repository NO tiene lógica de negocio
4. ✅ Se puede cambiar el "storage" sin tocar controller ni service
