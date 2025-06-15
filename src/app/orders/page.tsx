import { getServerSession } from "next-auth"
import { authOptions } from "@/features/auth/lib/authOptions"
import { redirect } from "next/navigation"
import { getUserOrders } from "@/features/order/lib/getUserOrders"
import OrderList from "@/features/order/components/OrderList"

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return redirect("/auth/signin")
  }

  const orders = await getUserOrders(session.user.email)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes commandes</h1>
      <OrderList orders={orders} />
    </div>
  )
}
