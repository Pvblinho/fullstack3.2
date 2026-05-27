import { useEffect, useState } from 'react'
import { fetchProducts } from '../service/productService.js'

export default function useUserProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchProducts()
      .then(data => {
        setProducts(data)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { products, loading, error }
}
