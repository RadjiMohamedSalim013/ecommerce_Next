'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Lock, Mail, Loader2 } from 'lucide-react'
import Link from "next/link"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error("Email ou mot de passe incorrect")
      }

      router.push("/products")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* En-tête avec dégradé */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-center">
        <h2 className="text-2xl font-bold text-white">Content de vous revoir</h2>
        <p className="text-slate-300 mt-1">Connectez-vous à votre compte</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Mail className="h-4 w-4 text-slate-500" />
            Adresse email
          </label>
          <input
            type="email"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Lock className="h-4 w-4 text-slate-500" />
            Mot de passe
          </label>
          <input
            type="password"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
              Se souvenir de moi
            </label>
          </div>

          <Link 
            href="/auth/forgot-password" 
            className="text-sm text-emerald-600 hover:text-emerald-500"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </button>

        <div className="text-center text-sm text-slate-600">
          Pas encore de compte ?{' '}
          <Link 
            href="/auth/signup" 
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            S&apos;inscrire
          </Link>
        </div>
      </form>
    </div>
  )
}