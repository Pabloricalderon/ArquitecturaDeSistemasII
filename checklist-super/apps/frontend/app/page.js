"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")

  const API_URL = "https://arquitecturadesistemasii-production.up.railway.app"

  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`)
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProduct = async () => {
    await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })

    setName("")
    fetchProducts()
  }

  const completeProduct = async (id) => {
    await fetch(`${API_URL}/products/${id}`, {
      method: "PUT"
    })

    fetchProducts()
  }

  return (
    <main>
      <h1>Checklist del Supermercado</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Producto"
      />

      <button onClick={addProduct}>Agregar</button>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} {p.completed ? "✔" : ""}
            {!p.completed && (
              <button onClick={() => completeProduct(p.id)}>
                Comprar
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
