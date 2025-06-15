'use client'
import { useCart } from '@/features/cart/context/CartContext'
import CartList from "@/features/cart/components/CartList"

export default function CartPage() {
  const { cart } = useCart()

  return (
    <main className="bg-slate-50 min-h-screen py-20">
      <section className="px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            Votre Panier
          </h1>
          <p className="text-slate-600 mt-2">
            {cart.length > 0 ? "Revoyez vos articles avant de passer commande" : "Commencez vos achats dès maintenant"}
          </p>
        </div>
        
        <CartList />
      </section>
    </main>
  )
}
