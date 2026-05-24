// ⚠️  ESTE ARCHIVO ES EL CÓDIGO ROTO — NO LO USES DIRECTAMENTE
// Tu misión: refactoriza esto creando componentes y un custom hook separados.
//
// Problemas que debes resolver:
// 1. Todo está en un solo componente (App)
// 2. La lógica de fetch está mezclada con el render
// 3. No hay separación de responsabilidades
// 4. El manejo de error es inconsistente
// 5. Si quisieras reusar ProductCard en otra página, no puedes
//
// ──────────────────────────────────────────────
// SOLUCIÓN ESPERADA: crear estos archivos:
//   src/hooks/useProducts.js
//   src/services/productService.js
//   src/components/ProductCard.jsx
//   src/components/ProductList.jsx
//   src/App.jsx  (limpio, < 20 líneas)
// ──────────────────────────────────────────────

import { useState, useEffect } from 'react'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Error del servidor: ' + res.status)
        return res.json()
      })
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>
        🛒 Catálogo de Productos
      </h1>

      {/* TODO: esto debería ser un componente <LoadingSpinner /> */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }}>
          ⏳ Cargando productos...
        </div>
      )}

      {/* TODO: esto debería ser un componente <ErrorMessage /> */}
      {error && (
        <div style={{
          background: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: 8,
          padding: '1rem',
          color: '#dc2626'
        }}>
          ❌ Error: {error}
          <button
            onClick={() => window.location.reload()}
            style={{ marginLeft: '1rem', cursor: 'pointer' }}
          >
            Reintentar
          </button>
        </div>
      )}

      {/* TODO: esto debería ser el componente <ProductList /> */}
      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {products.map(product => (
            // TODO: esto debería ser el componente <ProductCard />
            <div
              key={product.id}
              style={{
                background: 'white',
                borderRadius: 12,
                padding: '1.25rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {product.emoji}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                {product.name}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                {product.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '1.1rem' }}>
                  ${product.price}
                </span>
                <span style={{
                  background: product.stock > 0 ? '#dcfce7' : '#fee2e2',
                  color: product.stock > 0 ? '#16a34a' : '#dc2626',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: 20
                }}>
                  {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
