import { NextResponse } from "next/server"
import clientPromise from "@/features/auth/lib/mongodb"
import { hash } from "bcrypt"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: "Champs requis" }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db()
  const users = db.collection("users")

  const existing = await users.findOne({ email })
  if (existing) {
    return NextResponse.json({ message: "Cet email existe déjà" }, { status: 400 })
  }

  const hashed = await hash(password, 10)

  await users.insertOne({ email, password: hashed })

  return NextResponse.json({ message: "Inscription réussie" }, { status: 201 })
}
