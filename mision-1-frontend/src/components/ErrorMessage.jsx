export default function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{
      background: '#fee2e2',
      border: '1px solid #ef4444',
      borderRadius: 8,
      padding: '1rem',
      color: '#dc2626'
    }}>
      ❌ Error: {message}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{ marginLeft: '1rem', cursor: 'pointer' }}
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
