'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react'
import Link from "next/link"

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validation côté client
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas")
      }

      const response = await axios.post("/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })

      if (response.status === 201) {
        router.push("/auth/signin?registered=true")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erreur lors de l'inscription")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* En-tête avec dégradé */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-center">
        <h2 className="text-2xl font-bold text-white">Rejoignez-nous</h2>
        <p className="text-slate-300 mt-1">Créez votre compte en quelques secondes</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <User className="h-4 w-4 text-slate-500" />
            Nom complet
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Votre nom"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Mail className="h-4 w-4 text-slate-500" />
            Adresse email
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            minLength={6}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Lock className="h-4 w-4 text-slate-500" />
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="••••••••"
            minLength={6}
          />
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-slate-700">
            J&apos;accepte les{' '}
            <Link href="/terms" className="text-emerald-600 hover:underline">
              conditions d&apos;utilisation
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Inscription...
            </>
          ) : (
            <>
              Créer mon compte
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <div className="text-center text-sm text-slate-600 pt-4">
          Déjà un compte ?{' '}
          <Link 
            href="/auth/signin" 
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Se connecter
          </Link>
        </div>
      </form>
    </div>
  )
}