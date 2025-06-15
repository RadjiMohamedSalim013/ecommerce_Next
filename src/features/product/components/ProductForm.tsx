'use client'

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Product } from "../type/product"

type ProductFormProps = {
  existingProduct?: Product
}

export default function ProductForm({ existingProduct }: ProductFormProps) {
  const [name, setName] = useState(existingProduct?.name || "")
  const [price, setPrice] = useState(existingProduct?.price.toString() || "")
  const [stock, setStock] = useState(existingProduct?.stock.toString() || "")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const product = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
    }

    if (existingProduct) {
      await axios.put(`/api/products/${existingProduct._id}`, product)
    } else {
      await axios.post("/api/products", product)
    }

    setName("")
    setPrice("")
    setStock("")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="inline">
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border px-2 py-1 rounded mr-2"
        required
      />
      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={e => setPrice(e.target.value)}
        className="border px-2 py-1 rounded mr-2"
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={e => setStock(e.target.value)}
        className="border px-2 py-1 rounded mr-2"
        required
      />
      <button className="bg-blue-600 text-white px-3 py-1 rounded">
        {existingProduct ? "Modifier" : "Ajouter"}
      </button>
    </form>
  )
}
