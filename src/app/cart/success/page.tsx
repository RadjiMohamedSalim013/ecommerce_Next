'use client'

import Link from "next/link"
import { CheckCircle, ShoppingBasket, Home, Package } from 'lucide-react'

export default function OrderSuccessPage() {
  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-md text-center">
          {/* Icône de succès */}
          <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-emerald-500" />
          </div>

          {/* Titre et message */}
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Commande confirmée !
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Merci pour votre achat. Votre commande a été enregistrée avec succès.
          </p>

          {/* Détails supplémentaires */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-emerald-500" />
              <h2 className="font-medium text-slate-800">
                Prochaines étapes
              </h2>
            </div>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>Vous recevrez un email de confirmation sous peu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>Préparation de votre commande dans les 24h</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>Livraison estimée sous 2-3 jours ouvrés</span>
              </li>
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition hover:shadow-md"
            >
              <ShoppingBasket className="h-5 w-5" />
              Continuer vos achats
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 px-6 py-3 rounded-lg font-medium transition"
            >
              <Home className="h-5 w-5" />
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>

        {/* Section contact */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Des questions concernant votre commande ?</p>
          <p className="mt-1">
            Contactez-nous à{' '}
            <a href="mailto:contact@panierivoirien.com" className="text-emerald-600 hover:underline">
              contact@panierivoirien.com
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
