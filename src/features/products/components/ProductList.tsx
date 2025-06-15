'use client'

import { mockProducts } from "@/features/products/data/products.mocks"
import ProductCard from "./ProductCard"

export default function ProductList() {
  return (
    <section className="px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}