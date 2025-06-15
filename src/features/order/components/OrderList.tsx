import { Order } from "../types/order"
import { Package, User, Calendar, ChevronRight } from 'lucide-react'
import Link from "next/link"
import OrderStatusBadge from "./OrderStatusForm"

export default function OrderList({ orders }: { orders: Order[] }) {
  if (!orders.length) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-600">Aucune commande trouvée</h3>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <Link 
          href={`/admin/orders/${order._id}`}
          key={order._id}
          className="block bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <OrderStatusBadge orderId={order._id || ''} currentStatus={order.status} />
                <span className="text-sm text-slate-500 font-medium">
                  #{order._id?.substring(0, 8).toUpperCase()}
                </span>
              </div>
              <h3 className="font-medium text-slate-800 flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                {order.email || "Client inconnu"}
              </h3>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : ''}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-emerald-600">
                {order.total?.toLocaleString('fr-FR')} FCFA
              </p>
              <div className="flex items-center justify-end gap-1 text-slate-400 mt-1">
                <span className="text-sm">Voir détails</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
