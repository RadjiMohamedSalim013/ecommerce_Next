'use client'

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const STATUSES = ["En attente", "En cours", "Envoyée", "Livrée", "Annulée"]

export default function OrderStatusForm({ orderId, currentStatus }: {
  orderId: string
  currentStatus: string
}) {
  const [status, setStatus] = useState(currentStatus)
  const router = useRouter()

  const handleUpdate = async () => {
    await axios.put(`/api/orders/${orderId}`, { status })
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="border rounded px-2 py-1"
      >
        {STATUSES.map(s => <option key={s}>{s}</option>)}
      </select>
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Modifier
      </button>
    </div>
  )
}
