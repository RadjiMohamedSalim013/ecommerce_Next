'use client'

import Image from "next/image"
import Link from "next/link"
import { ShoppingBasket, ChevronRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/hero-ivoire.jpeg" // Remplacez par votre image (marché ivoirien, produits locaux, etc.
          alt="Produits ivoiriens frais"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fill
          priority
        />
      </div>

      {/* Contenu */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-6xl mx-auto">
          {/* Badge promotionnel */}
          <div className="inline-flex items-center bg-emerald-600/90 text-white px-4 py-2 rounded-full mb-6 animate-fade-in">
            <span className="text-sm font-semibold">Livraison gratuite d&apos;ès 50 000 FCFA</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">
              Panier Ivoirien
            </span>
            <br />
            L&apos;authenticité dans votre assiette
          </h1>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-slide-up delay-100">
            Produits frais, bio et 100% locaux directement livrés chez vous.
            <br />
            Soutenez l&apos;agriculture ivoirienne 🇨🇮
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-200">
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
            >
              Explorer nos produits
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Élément décoratif bas */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-900 to-transparent z-20" />
    </section>
  )
}
