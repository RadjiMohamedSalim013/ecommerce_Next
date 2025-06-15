import clientPromise from "@/features/auth/lib/mongodb"
import type { Order } from "@/features/order/types/order"

export async function getAllOrders(): Promise<Order[]> {
  const client = await clientPromise
  const db = client.db()

  const orders = await db.collection("orders")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return orders.map(o => ({
    _id: o._id.toString(),
    name: o.name || "",
    email: o.userEmail || "",
    address: o.address || "",
    phone: o.phone || "",
    items: o.items || [],
    total: o.total || 0,
    status: o.status || "unknown"
  }))
}
