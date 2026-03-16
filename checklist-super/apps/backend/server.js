const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "API Checklist funcionando" })
})

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany()
  res.json(products)
})

app.post("/products", async (req, res) => {
  const { name } = req.body

  const product = await prisma.product.create({
    data: { name }
  })

  res.json(product)
})

app.put("/products/:id", async (req, res) => {
  const id = Number(req.params.id)

  const product = await prisma.product.update({
    where: { id },
    data: { completed: true }
  })

  res.json(product)
})

app.listen(4000, () => {
  console.log("Server running on port 4000")
})
