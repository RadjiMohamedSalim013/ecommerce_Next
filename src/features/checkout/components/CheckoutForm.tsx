'use client'
import { useState, useEffect } from "react"
import { useCart } from "@/features/cart/context/CartContext"
import { Order } from "@/features/order/types/order"
import { useRouter } from "next/navigation"
import axios from "axios"
import { CheckCircle, Loader2, ShoppingBasket, MapPin, User, Mail } from 'lucide-react'
import Image from "next/image"

export default function CheckoutForm() {
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const [order, setOrder] = useState<Order>({
    name: "",
    email: "",
    address: "",
    phone: undefined,
    items: [],
    total: 0,
    status: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrder((prev: Order) => ({ ...prev, [name]: value }))
  }

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validation
      if (!order.name || !order.email || !order.address) {
        throw new Error("Veuillez remplir tous les champs obligatoires")
      }

      if (cart.length === 0) {
        throw new Error("Votre panier est vide")
      }

      // Envoi de la commande
      const response = await axios.post("/api/orders", {
        ...order,
        items: cart,
        total: calculateTotal(),
        status: "pending"
      })

      if (response.status === 201) {
        setIsSuccess(true)
        clearCart()
      } else {
        throw new Error("Erreur lors de l'enregistrement de la commande")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur est survenue")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/cart/success")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, router])

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Commande confirmée !</h2>
        <p className="text-slate-600 mb-6">
          Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
        </p>
        <div className="animate-pulse text-emerald-500 text-sm">
          Redirection en cours...
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 p-4">
      {/* Formulaire */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <ShoppingBasket className="text-emerald-500" />
          Informations de livraison
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <User className="h-4 w-4 text-slate-500" />
              Nom complet *
            </label>
          <input
            type="text"
            name="name"
            value={order.name}
            onChange={handleChange}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
            placeholder="Entrez votre nom complet"
            title="Nom complet"
          />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-500" />
              Email *
            </label>
          <input
            type="email"
            name="email"
            value={order.email}
            onChange={handleChange}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
            placeholder="Entrez votre email"
            title="Email"
          />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              Adresse de livraison *
            </label>
          <input
            type="text"
            name="address"
            value={order.address}
            onChange={handleChange}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
            placeholder="Entrez votre adresse de livraison"
            title="Adresse de livraison"
          />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Téléphone (optionnel)
            </label>
          <input
            type="tel"
            name="phone"
            value={order.phone}
            onChange={handleChange}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Entrez votre numéro de téléphone"
            title="Téléphone (optionnel)"
          />
          </div>

          {error && (
            <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Traitement...
              </>
            ) : (
              `Payer ${calculateTotal().toLocaleString('fr-FR')} FCFA`
            )}
          </button>
        </form>
      </div>

      {/* Récapitulatif */}
      <div className="bg-slate-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Votre commande</h3>
        
        {cart.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            Votre panier est vide
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-200">
              {cart.map(item => (
                <div key={item.id} className="py-4 flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="absolute inset-0 object-cover w-full h-full"
                        fill
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">{item.name}</h4>
                      <p className="text-sm text-slate-500">
                        {item.quantity} × {item.price.toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg text-slate-800">
                <span>Total</span>
                <span>{calculateTotal().toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
