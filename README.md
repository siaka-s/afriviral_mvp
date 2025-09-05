# AfriViral - Plateforme de Marketing d'Influence

> **"Touchez plus, sans stress"** - La plateforme MarTech qui connecte les PME et les micro-influenceurs en Afrique.

## 🚀 Vue d'ensemble

AfriViral est une plateforme innovante qui facilite la collaboration entre les Petites et Moyennes Entreprises (PME) africaines et les micro-influenceurs locaux. Notre mission est de démocratiser le marketing d'influence en Afrique en rendant les campagnes accessibles, efficaces et rentables.

## ✨ Fonctionnalités Principales

### Pour les PME
- **Brief assisté par l'IA** : Création simplifiée de briefs de campagne
- **Matching intelligent** : Proposition automatique d'influenceurs pertinents
- **Campagnes collaboratives** : Partage des coûts entre plusieurs PME
- **Paiements sécurisés** : Système d'escrow pour protéger toutes les parties
- **Analytics détaillés** : Suivi des performances en temps réel

### Pour les Influenceurs
- **Monétisation facile** : Opportunités de collaboration avec des marques locales
- **Gestion centralisée** : Un seul hub pour tous les réseaux sociaux
- **Paiements garantis** : Système d'escrow sécurisé
- **Croissance de communauté** : Outils pour développer son audience

## 🏗️ Architecture du Projet

```
afriviral-mvp/
├── frontend/          # Application Next.js 14 (App Router)
├── backend/           # API Node.js/Express
├── database/          # Schémas et seeds PostgreSQL
├── agents-n8n/        # Automatisation et workflows
├── monitoring/        # Surveillance et health checks
├── nginx/            # Configuration reverse proxy
└── scripts/          # Scripts de déploiement et maintenance
```

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 14** avec App Router
- **React 18** avec hooks et context
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **React Hook Form** + **Zod** pour les formulaires
- **Heroicons** pour les icônes

### Backend
- **Node.js** avec Express
- **PostgreSQL** comme base de données
- **JWT** pour l'authentification
- **Multer** pour l'upload de fichiers

### Infrastructure
- **Docker** et **Docker Compose**
- **Nginx** comme reverse proxy
- **Vercel** pour le déploiement frontend
- **Railway/Render** pour le backend

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- PostgreSQL 14+
- Docker (optionnel)

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/afriviral-mvp.git
cd afriviral-mvp
```

2. **Installer les dépendances frontend**
```bash
cd frontend
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
# Éditer .env.local avec vos configurations
```

4. **Démarrer le développement**
```bash
npm run dev
```

Le frontend sera disponible sur `http://localhost:3000`

### Déploiement avec Docker

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

## 📁 Structure des Dossiers

### Frontend (`/frontend`)
```
frontend/
├── app/                    # Pages Next.js 14 (App Router)
│   ├── dashboard/          # Tableau de bord
│   ├── login/             # Page de connexion
│   ├── register/          # Inscription unifiée
│   ├── brand/             # Landing page PME
│   ├── creator/           # Landing page Influenceurs
│   └── ...
├── components/            # Composants réutilisables
│   ├── header.js          # Navigation principale
│   ├── footer.js          # Pied de page
│   ├── AdvertiserOnboardingForm.tsx
│   └── InfluencerOnboardingForm.tsx
├── contexts/              # Contextes React
│   └── AuthContext.js     # Gestion de l'authentification
├── hooks/                 # Hooks personnalisés
├── lib/                   # Utilitaires
└── public/               # Assets statiques
```

### Backend (`/backend`)
```
backend/
├── controllers/           # Contrôleurs API
├── models/               # Modèles de données
├── routes/               # Routes API
├── middleware/           # Middlewares
└── utils/                # Utilitaires
```

## 🔧 Configuration

### Variables d'Environnement

#### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Backend (`.env`)
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/afriviral
JWT_SECRET=your-jwt-secret
UPLOAD_DIR=uploads/
```

## 🚀 Déploiement

### Frontend sur Vercel

1. **Connecter le repository à Vercel**
2. **Configurer les variables d'environnement**
3. **Déployer automatiquement**

### Backend sur Railway/Render

1. **Connecter le repository**
2. **Configurer la base de données PostgreSQL**
3. **Déployer avec les variables d'environnement**

## 📊 Base de Données

### Tables Principales
- `annonceurs` - Données des PME
- `influenceurs` - Profils des influenceurs
- `briefs` - Briefs de campagnes
- `campagnes` - Campagnes créées
- `collaborations` - Relations PME-Influenceurs

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développeuse Full-Stack / UI-UX**
- **Expert Marketing Digital et Automatisation**
- **Ingénieur Logiciel Cloud & IA**
- **Stratège Digital / E-learning**

## 📞 Contact

- **Email** : business@afriviral.com
- **WhatsApp** : +225 05 01 59 69 69
- **Site Web** : https://www.afriviral.com/

## 🎯 Roadmap

- [ ] Intégration des réseaux sociaux
- [ ] Système de paiement mobile money
- [ ] Application mobile
- [ ] IA pour l'analyse de contenu
- [ ] Marketplace d'influenceurs

---

**Développé avec ❤️ en Côte d'Ivoire pour l'Afrique**
