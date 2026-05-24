# 🔴 MISIÓN 1 — "El frontend está roto"

## Contexto

Tu jefe te mandó este mensaje a las 10pm:

> "La tienda no muestra nada. Solo hay un App.jsx de 300 líneas. Arréglalo. Reunión mañana a las 8am."

## Objetivos

- [ ] Mostrar lista de productos desde la API
- [ ] Mostrar spinner mientras carga
- [ ] Mostrar mensaje de error si falla la API
- [ ] NO usar App.jsx para todo (mínimo 3 componentes separados)

## Código roto (tu punto de partida)

El archivo `src/App.jsx` contiene todo mezclado. Tu trabajo es refactorizarlo.

## API disponible

```
GET http://localhost:3001/api/products
```

La API falla aleatoriamente el 30% de las veces para que puedas probar el manejo de errores.

## Cómo correr

```bash
# Terminal 1 - Backend (desde mision-1-backend/)
npm install && npm start

# Terminal 2 - Frontend (desde mision-1-frontend/)
npm install
npm run dev
```

## Criterios de éxito

1. ✅ Existe `ProductList.jsx` separado
2. ✅ Existe `ProductCard.jsx` separado
3. ✅ Existe `useProducts.js` (custom hook)
4. ✅ Loading y error se muestran correctamente
5. ✅ App.jsx tiene menos de 20 líneas

## Pista

Piensa: ¿qué es UI? ¿qué es lógica de datos? ¿qué es una pieza visual reutilizable?
