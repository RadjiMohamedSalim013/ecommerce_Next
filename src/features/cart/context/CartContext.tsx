'use client'

import { createContext, useContext, useState, ReactNode } from "react"
import { CartItem } from "../types/cart-item"
import { Product } from "@/types/product"

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  updateQuantity: (id: string, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  /**
   * Ajoute un produit au panier. Si le produit est déja  dans le panier, incremente
   * sa quantit  de 1.
   * @param {Product} product Le produit   ajouter au panier
   */
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }
  

  /**
   * Supprime un produit du panier.
   * @param {string} id L'ID du produit   supprimer
   */
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  /**
   * Vide le panier.
   */
  const clearCart = () => {
    setCart([])
  }

  /**
   * Met à jour la quantité d'un produit dans le panier.
   * @param {string} id L'ID du produit
   * @param {number} quantity La nouvelle quantité
   */
  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}


export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
