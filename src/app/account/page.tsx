import { getServerSession } from "next-auth"
import { authOptions } from "@/features/auth/lib/authOptions"
import { redirect } from "next/navigation"
import { getUserOrders } from "@/features/order/lib/getUserOrders"
import type { Order, OrderItem } from "@/features/order/types/order"
import Link from "next/link"
import { CreditCard, LogOut, Package, User,  } from 'lucide-react'

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return redirect("/auth/signin")
  }

  const email = session.user.email
  const orders: Order[] = await getUserOrders(email)

  return (
    <div className="max-w-6xl mx-auto px-4 py-30">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Section profil */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-emerald-500" />
              Mon profil
            </h2>
            <div className="space-y-2">
              <p className="text-slate-600">
                <span className="font-medium">Email :</span> {email}
              </p>
            </div>
            <Link
              href="/api/auth/signout"
              className="mt-6 inline-flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </Link>
          </div>
        </div>

        {/* Section commandes */}
        <div className="w-full md:w-2/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Package className="h-5 w-5 text-emerald-500" />
              Historique des commandes
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 mb-4">Vous n&apos;avez pas encore passé de commande.</p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition hover:shadow-md"
                >
                  Explorer nos produits
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order: Order) => (
                  <div key={order._id} className="border border-slate-200 rounded-lg p-5 hover:shadow-sm transition">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-slate-400" />
                        <div>
                          <h3 className="font-medium text-slate-800">Commande du {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR') : ''}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'completed' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : order.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                              {order.status === 'completed' ? 'Livrée' : order.status === 'pending' ? 'En cours' : 'Traitement'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-emerald-600">
                        {order.total.toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-700 flex items-center gap-2">
                        <Package className="h-4 w-4 text-slate-400" />
                        Produits commandés
                      </h4>
                      <ul className="space-y-2">
                        {order.items.map((item: OrderItem, index: number) => (
                          <li key={index} className="flex justify-between text-sm">
                            <span className="text-slate-600">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="text-slate-800 font-medium">
                              {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}