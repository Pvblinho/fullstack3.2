export default function ProductCard({ product }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: 12,
      padding: '1.25rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    }}>
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
  )
}
