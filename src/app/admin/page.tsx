import { getServerSession } from "next-auth"
import { authOptions } from "@/features/auth/lib/authOptions"
import { redirect } from "next/navigation"
import { isAdmin } from "@/features/admin/lib/isAdmin"
import { Package, ShoppingCart, Users, Settings, BarChart2 } from 'lucide-react'
import Link from "next/link"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  // Redirection si non connecté ou non admin
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return redirect("/")
  }

  const adminCards = [
    {
      title: "Gérer les produits",
      description: "Ajoutez, modifiez ou supprimez des produits",
      icon: <Package className="h-6 w-6 text-emerald-500" />,
      href: "/admin/products",
      color: "bg-emerald-50 hover:bg-emerald-100"
    },
    {
      title: "Commandes",
      description: "Consultez et gérez les commandes clients",
      icon: <ShoppingCart className="h-6 w-6 text-blue-500" />,
      href: "/admin/orders",
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      title: "Utilisateurs",
      description: "Gérez les comptes utilisateurs",
      icon: <Users className="h-6 w-6 text-amber-500" />,
      href: "/admin/users",
      color: "bg-amber-50 hover:bg-amber-100"
    },
    {
      title: "Statistiques",
      description: "Analysez les performances du site",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      href: "/admin/analytics",
      color: "bg-purple-50 hover:bg-purple-100"
    },
    {
      title: "Paramètres",
      description: "Configurez les options du site",
      icon: <Settings className="h-6 w-6 text-slate-500" />,
      href: "/admin/settings",
      color: "bg-slate-50 hover:bg-slate-100"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Tableau de bord Administrateur
          </h1>
          <p className="text-slate-600 mt-2">
            Bienvenue, <span className="font-medium text-slate-800">{session.user.email}</span>
          </p>
        </div>

        {/* Cartes de fonctionnalités */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className={`${card.color} p-6 rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md hover:translate-y-[-2px]`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100">
                  {card.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">{card.title}</h2>
                  <p className="text-sm text-slate-600 mt-1">{card.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section statistiques rapides */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-slate-500" />
            Aperçu des performances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500">Commandes aujourd&apos;hui</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">12</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500">Nouveaux clients</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">5</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500">Chiffre d&apos;affaires</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">245,500 FCFA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}