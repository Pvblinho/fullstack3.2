import ProductList from './components/ProductList.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import useUserProducts from './hooks/userProducts.js'

export default function App() {
  const { products, loading, error } = useUserProducts()

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>
        🛒 Catálogo de Productos
      </h1>

      {/* TODO: esto debería ser un componente <LoadingSpinner /> */}
      {loading && (
        <LoadingSpinner />
      )}

      {/* TODO: esto debería ser un componente <ErrorMessage /> */}
      {error && (
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      )}

      {!loading && !error && <ProductList products={products} />}
    </div>
  )
}
