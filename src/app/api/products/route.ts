import { NextResponse } from "next/server"
import clientPromise from "@/features/auth/lib/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/features/auth/lib/authOptions"
import { isAdmin } from "@/features/admin/lib/isAdmin"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
  }

  const { name, price, stock } = await req.json()
  if (!name || !price || !stock) {
    return NextResponse.json({ message: "Champs manquants" }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db()

  await db.collection("products").insertOne({
    name,
    price,
    stock,
    createdAt: new Date().toISOString()
  })

  return NextResponse.json({ message: "Produit créé" }, { status: 201 })
}
