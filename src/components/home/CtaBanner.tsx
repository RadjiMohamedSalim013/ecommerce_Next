'use client'

import Link from "next/link"
import { ShoppingBasket, ChevronRight } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Savourez l&apos;authenticité ivoirienne
            </span>
            <br />
            Commandez vos produits locaux préférés !
          </h2>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Livraison rapide et produits 100% frais directement des producteurs locaux.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
            >
              <ShoppingBasket className="h-5 w-5" />
              Explorer nos produits
              <ChevronRight className="h-5 w-5" />
            </Link>
            
          </div>
        </div>
      </div>
      
      {/* Vague décorative basse */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-[url('/wave.svg')] bg-repeat-x opacity-20"></div>
    </section>
  )
}
