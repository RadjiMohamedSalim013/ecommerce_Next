import clientPromise from "@/features/auth/lib/mongodb"
import { Product } from "../type/product"

export async function getAllProducts(): Promise<Product[]> {
  const client = await clientPromise
  const db = client.db()

  const products = await db.collection("products")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return products.map(p => ({
    _id: p._id.toString(),
    name: p.name || "",
    description: p.description || "",
    price: p.price || 0,
    imageUrl: p.imageUrl || "",
    stock: p.stock || 0
  }))
}
