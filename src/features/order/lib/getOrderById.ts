import clientPromise from "@/features/auth/lib/mongodb"
import { ObjectId } from "mongodb"

export async function getOrderById(orderId: string) {
  const client = await clientPromise
  const db = client.db()

  const order = await db.collection("orders").findOne({ _id: new ObjectId(orderId) })

  if (!order) return null

  return {
    ...order,
    _id: order._id.toString()
  }
}
