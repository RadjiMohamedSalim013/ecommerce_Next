'use client'

import { Product } from "@/types/product"
import Image from "next/image"
import { useCart } from "@/features/cart/context/CartContext"
import { useState } from "react"
import { ShoppingCart, Check } from 'lucide-react'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (added) return
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="group relative border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.category && (
          <span className="absolute top-3 right-3 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.category}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-slate-800">{product.name}</h2>
          <p className="text-lg font-semibold text-emerald-600">
            {product.price.toLocaleString('fr-FR')} FCFA
          </p>
        </div>

        <p className="text-slate-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-300 ${
            added
              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
              : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white hover:shadow-md"
          }`}
        >
          {added ? (
            <>
              <Check className="h-5 w-5" />
              Ajouté
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Ajouter au panier
            </>
          )}
        </button>
      </div>
    </div>
  )
}