export async function fetchProducts() {
  const response = await fetch('/api/products')

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`)
  }

  return response.json()
}
