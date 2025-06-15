'use client'
import dynamic from 'next/dynamic'

const CheckoutForm = dynamic(() => import('@/features/checkout/components/CheckoutForm'), { ssr: false })

export default function CheckoutPage() {
  return (
    <main className="bg-slate-50 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <CheckoutForm />
      </div>
    </main>
  )
}
