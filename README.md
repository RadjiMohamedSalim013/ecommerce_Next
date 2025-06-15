# Mon Site Ecommerce

Ceci est une application web ecommerce moderne construite avec Next.js et TypeScript. Elle inclut un panier d'achat, un processus de paiement, une authentification utilisateur et la gestion des commandes.

## Fonctionnalités

- Liste et détails des produits
- Panier d'achat avec ajout/suppression d'articles
- Formulaire de paiement avec soumission de commande
- Authentification utilisateur (inscription, connexion)
- Gestion et suivi des commandes
- Design responsive avec composants UI accessibles

## Technologies Utilisées

- Next.js (framework React)
- TypeScript
- Axios pour les requêtes API
- Icônes Lucide React
- Tailwind CSS pour le style
- MongoDB (supposé pour la base de données backend)
- Node.js pour les routes API backend

## Structure du Projet

Le projet suit une architecture basée sur les fonctionnalités (feature-based architecture). Chaque fonctionnalité principale est organisée dans son propre dossier sous `src/features/`. Chaque dossier contient les composants, types, contextes, et la logique spécifiques à cette fonctionnalité, ce qui facilite la modularité et la maintenabilité.

- `src/app/` - Pages et layouts de l'application
- `src/features/` - Composants et logique par fonctionnalité
  - `cart/` - Composants et contexte du panier
  - `checkout/` - Formulaire de paiement et types
  - `order/` - Composants, types et utilitaires des commandes
  - `auth/` - Composants et logique d'authentification
  - `product/` - Composants et données des produits
- `src/components/` - Composants UI partagés
- `src/app/api/` - Gestionnaires des routes API

## Démarrage

### Prérequis

- Node.js (version 16 ou supérieure recommandée)
- Gestionnaire de paquets npm ou yarn

### Installation

1. Cloner le dépôt :

```bash
git clone <url-du-depot>
cd mon-site-ecommerce
```

2. Installer les dépendances :

```bash
npm install
# ou
yarn install
```

3. Configurer les variables d'environnement :

Créer un fichier `.env.local` à la racine et ajouter les variables nécessaires (connexion base de données, clés API, etc.).

4. Lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Exécution des Tests

Si des tests sont présents, les lancer avec :

```bash
npm test
# ou
yarn test
```

## Compilation pour la Production

Pour compiler l'application en production :

```bash
npm run build
# ou
yarn build
```

Puis démarrer le serveur de production :

```bash
npm start
# ou
yarn start
```

## Contribution

Les contributions sont les bienvenues ! Merci d'ouvrir des issues ou de soumettre des pull requests pour des améliorations ou corrections.

## Licence

Ce projet est sous licence MIT.
