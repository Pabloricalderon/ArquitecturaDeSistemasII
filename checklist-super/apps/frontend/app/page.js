"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://localhost:4000"

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError("")

      const res = await fetch(`${API_URL}/products`, { cache: "no-store" })

      if (!res.ok) {
        throw new Error(`Error ${res.status}`)
      }

      const data = await res.json()

      if (!Array.isArray(data)) {
        throw new Error("Respuesta inválida de la API")
      }

      setProducts(data)
    } catch (err) {
      console.error("Error cargando productos:", err)
      setError("No se pudieron cargar los productos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProduct = async () => {
    try {
      setError("")

      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}`)
      }

      setName("")
      fetchProducts()
    } catch (err) {
      console.error("Error agregando producto:", err)
      setError("No se pudo agregar el producto")
    }
  }

  const completeProduct = async (id) => {
    try {
      setError("")

      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT"
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}`)
      }

      fetchProducts()
    } catch (err) {
      console.error("Error actualizando producto:", err)
      setError("No se pudo actualizar el producto")
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Checklist del SUPERMERCADO</h1>

      <div style={{ margin: "1rem 0" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Producto"
          style={{ marginRight: "0.5rem", padding: "0.5rem" }}
        />
        <button onClick={addProduct}>Agregar</button>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "0.5rem" }}>
            {p.name} {p.completed ? "✔" : ""}
            {!p.completed && (
              <button
                onClick={() => completeProduct(p.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Comprar
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}