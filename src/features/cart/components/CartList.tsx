'use client'
import { useCart } from "../context/CartContext"
import CartItem from "./CartItem"
import Link from "next/link"
import { ArrowRight, ShoppingBasket } from 'lucide-react'

export default function CartList() {
  const { cart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBasket className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-600">Votre panier est vide</h3>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition hover:shadow-md"
        >
          Explorer nos produits
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="divide-y divide-slate-200">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      
      <div className="pt-8">
        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-slate-800">Total</h3>
          <p className="text-2xl font-bold text-emerald-600">
            {total.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        
        <Link
          href="/checkout"
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-4 rounded-lg font-medium transition hover:shadow-md"
        >
          Passer la commande
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}