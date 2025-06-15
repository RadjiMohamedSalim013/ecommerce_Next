import { NextResponse } from "next/server"
import clientPromise from "@/features/auth/lib/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/features/auth/lib/authOptions"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
  }

  const { items, total } = await req.json()

  if (!items || !total) {
    return NextResponse.json({ message: "Commande invalide" }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db()

  await db.collection("orders").insertOne({
    userEmail: session.user.email,
    items,
    total,
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({ message: "Commande enregistrée" }, { status: 201 })
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()

  const orders = await db
    .collection("orders")
    .find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .toArray()

  const mappedOrders = orders.map(order => ({
    ...order,
    _id: order._id.toString()
  }))

  return NextResponse.json(mappedOrders, { status: 200 })
}
