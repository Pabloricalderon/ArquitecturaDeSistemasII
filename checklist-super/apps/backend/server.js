require("dotenv").config()

const { swaggerUi, specs } = require("./swagger")
const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

const PORT = process.env.PORT || 4000
const HOST = "0.0.0.0"

app.use(cors())
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

app.get("/", (req, res) => {
  res.json({ message: "API Checklist funcionando" })
})

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ ok: true, db: true })
  } catch (error) {
    console.error("Health check error:", error)
    res.status(500).json({ ok: false, db: false, error: error.message })
  }
})

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "asc" }
    })
    res.json(products)
  } catch (error) {
    console.error("GET /products error:", error)
    res.status(500).json({ error: "No se pudieron obtener los productos" })
  }
})

app.post("/products", async (req, res) => {
  try {
    const { name } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "El nombre es obligatorio" })
    }

    const product = await prisma.product.create({
      data: { name: name.trim() }
    })

    res.status(201).json(product)
  } catch (error) {
    console.error("POST /products error:", error)
    res.status(500).json({ error: "No se pudo crear el producto" })
  }
})

app.put("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id)

    const product = await prisma.product.update({
      where: { id },
      data: { completed: true }
    })

    res.json(product)
  } catch (error) {
    console.error("PUT /products/:id error:", error)
    res.status(500).json({ error: "No se pudo actualizar el producto" })
  }
})

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
})