'use client'

import ProductList from "@/features/products/components/ProductList"

export default function ProductsPage() {
  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <section className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 py-20  to-emerald-500 bg-clip-text text-transparent mb-4">
            Nos Produits Locaux
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl  mx-auto">
            Découvrez des produits frais et authentiques directement des producteurs ivoiriens
          </p>
        </div>
        
        <ProductList />
      </section>
    </main>
  )
}