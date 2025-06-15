'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from 'lucide-react'

const products = [
  { 
    id: "1", 
    name: "Attiéké", 
    price: 3500, 
    image: "/products/attieke.png" 
  },
  { 
    id: "2", 
    name: "Gombo frais", 
    price: 2000, 
    image: "/products/gombo.jpeg" 
  },
  { 
    id: "3", 
    name: "Bananes plantains", 
    price: 4000, 
    image: "/products/plantains.jpeg" 
  },
  { 
    id: "4", 
    name: "Poulet fermier", 
    price: 8000, 
    image: "/products/poulet.jpeg" 
  },
  { 
    id: "5", 
    name: "Piment frais", 
    price: 1500, 
    image: "/products/piment.jpeg" 
  },
  { 
    id: "6", 
    name: "Igname", 
    price: 2500, 
    image: "/products/igname.jpeg" 
  },
]

export default function FeaturedProducts() {
  return (
    <section className="px-6 max-w-7xl mx-auto py-16">
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          Nos Produits Phares
        </h2>
        <Link 
          href="/products" 
          className="flex items-center text-sm text-slate-600 hover:text-emerald-600 transition-colors"
        >
          Voir tous les produits <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-square overflow-hidden relative">
              <Image
                src={product.image}
                alt={product.name}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="p-5 absolute bottom-0 left-0 right-0 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-bold text-white drop-shadow-lg">{product.name}</h3>
              <p className="text-emerald-300 font-medium drop-shadow-lg">
                {product.price.toLocaleString('fr-FR')} FCFA
              </p>
            </div>
            
            <Link 
              href={`/products/${product.id}`} 
              className="absolute inset-0 z-20"
              aria-label={`Voir ${product.name}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
        >
          Voir tous nos produits
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}
