import { Clock, Truck, CheckCircle } from 'lucide-react'

export default function OrderStatusBadge({ status }: { status?: string }) {
  const statusConfig = {
    "pending": {
      text: "En attente",
      icon: <Clock className="h-3 w-3" />,
      bg: "bg-amber-100",
      textColor: "text-amber-800"
    },
    "shipped": {
      text: "Expédiée",
      icon: <Truck className="h-3 w-3" />,
      bg: "bg-blue-100",
      textColor: "text-blue-800"
    },
    "delivered": {
      text: "Livrée",
      icon: <CheckCircle className="h-3 w-3" />,
      bg: "bg-emerald-100",
      textColor: "text-emerald-800"
    }
  }

  const currentStatus = statusConfig[status as keyof typeof statusConfig] || {
    text: "Inconnu",
    icon: null,
    bg: "bg-slate-100",
    textColor: "text-slate-800"
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${currentStatus.bg} ${currentStatus.textColor}`}>
      {currentStatus.icon}
      {currentStatus.text}
    </span>
  )
}