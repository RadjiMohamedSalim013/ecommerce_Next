import { getServerSession } from "next-auth"
import { authOptions } from "@/features/auth/lib/authOptions"
import { redirect } from "next/navigation"
import { isAdmin } from "@/features/admin/lib/isAdmin"
import { getAllProducts } from "@/features/product/lib/getAllProducts"
import ProductForm from "@/features/product/components/ProductForm"

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session?.user?.email)) redirect("/")

  const products = await getAllProducts()

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">🛍️ Gérer les produits</h1>

        <section className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau produit</h2>
          <ProductForm />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Liste des produits existants</h2>
          <ul className="space-y-6">
            {products.map(p => (
              <li key={p._id} className="bg-white rounded shadow p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold">{p.name}</p>
                    <p className="text-sm text-gray-600">
                      {p.price} € — Stock : {p.stock}
                    </p>
                  </div>
                  <form
                    action={`/api/products/${p._id}`}
                    method="POST"
                    onSubmit={(e) => {
                      if (!confirm("Supprimer ce produit ?")) e.preventDefault()
                    }}
                  >
                    <input type="hidden" name="_method" value="DELETE" />
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>

                <div className="mt-2">
                  <details>
                    <summary className="cursor-pointer text-indigo-600 text-sm hover:underline">
                      Modifier ce produit
                    </summary>
                    <div className="mt-4">
                      <ProductForm existingProduct={p} />
                    </div>
                  </details>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
