'use client'

import Link from "next/link"
import { useCart } from "@/features/cart/context/CartContext"
import { useSession, signOut } from "next-auth/react"
import { Home, ShoppingBag, CreditCard, User, LogIn, LogOut } from 'lucide-react'

export default function Header() {
  const { cart } = useCart()
  const { data: session } = useSession()

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl z-50 border-b border-slate-700">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo et navigation principale */}
        <div className="flex items-center gap-10">
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <ShoppingBag className="h-6 w-6 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              PannierIvoire
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              href="/products" 
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Boutique</span>
            </Link>
            
            <Link 
              href="/cart" 
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors relative group"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full animate-pulse">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="font-medium">Panier</span>
            </Link>
            
            <Link 
              href="/checkout" 
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
            >
              <CreditCard className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Paiement</span>
            </Link>
          </div>
        </div>

        {/* Section utilisateur */}
        <div className="flex items-center gap-6">
          {session?.user ? (
            <>
              <Link 
                href="/account" 
                className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
              >
                <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Mon Espace</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <span className="hidden xl:block text-sm text-slate-400 font-medium">
                  {session.user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors group"
                >
                  <LogOut className="h-5 w-5 text-rose-400 group-hover:rotate-180 transition-transform" />
                  <span className="text-sm font-medium">Déconnexion</span>
                </button>
              </div>
            </>
          ) : (
            <Link 
              href="/auth/signin" 
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-colors group"
            >
              <LogIn className="h-5 w-5 text-white group-hover:translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Connexion</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}