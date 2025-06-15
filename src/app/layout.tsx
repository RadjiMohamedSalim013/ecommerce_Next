import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { CartProvider } from "@/features/cart/context/CartContext"
import SessionProviderWrapper from "@/components/SessionProviderWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Le Panier Ivoirien",
  description: "Vivres bio, frais et locaux de nos terroirs.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-white text-gray-900  flex flex-col min-h-screen`}>
        <SessionProviderWrapper>
          <CartProvider>
            <Header />
            <main className=" w-full">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
