import clientPromise from "@/features/auth/lib/mongodb"
import type { Order } from "@/features/order/types/order"

export async function getUserOrders(email: string): Promise<Order[]> {
  const client = await clientPromise
  const db = client.db()

  const orders = await db.collection("orders")
    .find({ userEmail: email })
    .sort({ createdAt: -1 })
    .toArray()

  return orders.map(order => ({
    _id: order._id.toString(),
    userEmail: order.userEmail,
    items: order.items,
    total: order.total,
    createdAt: order.createdAt,
    status: order.status,
  }))
}
