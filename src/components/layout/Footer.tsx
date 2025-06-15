'use client'

import Link from "next/link"
import { ShoppingBag, Home,  Mail, Github,  Info } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-12 pb-6 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-emerald-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              EliteShop
            </span>
          </div>
          <p className="text-slate-400 text-sm">
            Votre destination premium pour des achats en ligne exceptionnels. 
            Projet e-commerce Next.js avec MongoDB.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Home className="h-5 w-5 text-emerald-400" />
            Navigation
          </h4>
          <ul className="space-y-3">
            <li>
              <Link 
                href="/" 
                className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                Accueil
              </Link>
            </li>
            <li>
              <Link 
                href="/products" 
                className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                Boutique
              </Link>
            </li>
            <li>
              <Link 
                href="/cart" 
                className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                Panier
              </Link>
            </li>
            <li>
              <Link 
                href="/account" 
                className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                Mon compte
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5 text-emerald-400" />
            Contact
          </h4>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 text-emerald-400 flex-shrink-0" />
          <Link 
            href="mailto:contact@eliteshop.com" 
            className="hover:text-emerald-400 transition-colors"
          >
            contact@eliteshop.com
          </Link>
            </li>
            <li className="flex items-start gap-2">
              <Github className="h-4 w-4 mt-0.5 text-emerald-400 flex-shrink-0" />
          <a 
            href="https://github.com/" 
            className="hover:text-emerald-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/eliteshop
          </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-emerald-400" />
            Informations
          </h4>
          <ul className="space-y-3 text-slate-400">
            <li className="hover:text-emerald-400 transition-colors">
              <Link href="/terms">Conditions générales</Link>
            </li>
            <li className="hover:text-emerald-400 transition-colors">
              <Link href="/privacy">Politique de confidentialité</Link>
            </li>
            <li className="hover:text-emerald-400 transition-colors">
              <Link href="/shipping">Livraisons & retours</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-slate-700">
        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} EliteShop. Tous droits réservés. | 
          Projet fictif pour démonstration
        </p>
      </div>
    </footer>
  )
}