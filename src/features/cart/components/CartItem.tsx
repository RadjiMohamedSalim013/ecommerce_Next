'use client'
import { CartItem as CartItemType } from "../types/cart-item"
import { useCart } from "../context/CartContext"
import Image from "next/image"
import { Minus, Plus, Trash2 } from 'lucide-react'

type Props = {
  item: CartItemType
}

export default function CartItem({ item }: Props) {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center border-b border-slate-200 py-6">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>
      
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-lg font-semibold text-slate-800">{item.name}</h2>
        <p className="text-slate-600 text-sm mt-1 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
          <div className="flex items-center border border-slate-200 rounded-lg">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 text-slate-500 hover:bg-slate-100 transition"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 text-sm font-medium">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-slate-500 hover:bg-slate-100 transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <p className="font-bold text-emerald-600">
            {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
          </p>
        </div>
      </div>
      
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition"
        aria-label="Supprimer"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  )
}