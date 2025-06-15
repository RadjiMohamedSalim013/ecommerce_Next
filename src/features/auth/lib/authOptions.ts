// Import de l'adaptateur MongoDB pour NextAuth
import { MongoDBAdapter } from "@auth/mongodb-adapter"

// Type d'options attendu par NextAuth
import { AuthOptions } from "next-auth"

// Provider personnalisé pour la connexion par email + mot de passe
import CredentialsProvider from "next-auth/providers/credentials"

// Connexion à la base MongoDB (clientPromise = client MongoDB initialisé)
import clientPromise from "./mongodb"

// bcrypt sert à comparer les mots de passe hashés
import { compare } from "bcrypt"

// Configuration d'authentification exportée pour NextAuth
export const authOptions: AuthOptions = {
  // Utilise l'adaptateur MongoDB pour stocker les utilisateurs, sessions, etc.
  adapter: MongoDBAdapter(clientPromise),

  // Liste des méthodes de connexion disponibles (ici : credentials = email/password)
  providers: [
    CredentialsProvider({
      name: "credentials", // Nom du provider, affiché dans les logs ou UI personnalisée

      // Structure du formulaire de connexion (géré automatiquement par NextAuth si UI utilisée)
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },

      // Fonction exécutée quand un utilisateur essaie de se connecter
      async authorize(credentials) {
        const client = await clientPromise; // Connexion MongoDB
        const users = client.db().collection("users"); // Accès à la collection "users"

        // Recherche de l'utilisateur avec l'email saisi
        const user = await users.findOne({ email: credentials?.email });

        // Si aucun utilisateur ou pas de mot de passe stocké → rejet
        if (!user || !user.password) return null;

        // Vérifie si le mot de passe saisi correspond au hash stocké
        const isValid = await compare(credentials!.password, user.password);

        // Si le mot de passe est incorrect → rejet
        if (!isValid) return null;

        // Si tout est bon, retourne un objet utilisateur simplifié
        return { id: user._id.toString(), email: user.email };
      }
    })
  ],

  // Utilise la stratégie "JWT" pour stocker les sessions côté client (token signé)
  session: { strategy: "jwt" },

  // Clé secrète utilisée pour signer les tokens JWT
  secret: process.env.NEXTAUTH_SECRET
}
