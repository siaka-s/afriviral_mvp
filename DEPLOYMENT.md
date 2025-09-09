# 🚀 Guide de Déploiement AfriViral

Ce guide vous accompagne dans le déploiement de la plateforme AfriViral sur Git et Vercel.

## 📋 Prérequis

- Compte GitHub
- Compte Vercel
- Node.js 18+ installé localement
- Git installé

## 🔧 Configuration Initiale

### 1. Configuration Git

```bash
# Configurer Git (si pas déjà fait)
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

### 2. Configuration des Variables d'Environnement

```bash
# Dans le dossier frontend
cd frontend
cp env.local.example .env.local
# Éditer .env.local avec vos configurations
```

## 🌐 Déploiement sur Vercel

### Étape 1: Créer le Repository GitHub

1. **Aller sur GitHub.com**
2. **Créer un nouveau repository** : `afriviral-mvp`
3. **Ne pas initialiser** avec README, .gitignore ou licence
4. **Copier l'URL** du repository

### Étape 2: Connecter le Repository Local

```bash
# Ajouter l'origin remote
git remote add origin https://github.com/VOTRE-USERNAME/afriviral-mvp.git

# Renommer la branche principale
git branch -M main

# Pousser le code
git push -u origin main
```

### Étape 3: Déployer sur Vercel

1. **Aller sur vercel.com**
2. **Se connecter** avec votre compte GitHub
3. **Cliquer sur "New Project"**
4. **Sélectionner** le repository `afriviral-mvp`
5. **Configurer le projet** :
   - **Framework Preset** : Next.js
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `.next`

### Étape 4: Configuration des Variables d'Environnement

Dans Vercel Dashboard :

1. **Aller dans Settings > Environment Variables**
2. **Ajouter les variables** :

```env
NEXT_PUBLIC_API_URL=https://votre-api.railway.app/api
NEXT_PUBLIC_APP_URL=https://afriviral.vercel.app
NEXT_PUBLIC_APP_NAME=AfriViral
NEXT_PUBLIC_APP_DESCRIPTION=Plateforme de Marketing d'Influence en Afrique
NEXT_PUBLIC_APP_SLOGAN=Touchez plus, sans stress
NEXT_PUBLIC_CONTACT_EMAIL=business@afriviral.com
NEXT_PUBLIC_CONTACT_WHATSAPP=+2250501596969
NEXT_PUBLIC_WEBSITE_URL=https://www.afriviral.com
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=false
NEXT_PUBLIC_ENABLE_DEMO_MODE=true
```

### Étape 5: Déploiement

1. **Cliquer sur "Deploy"**
2. **Attendre** la fin du build (2-3 minutes)
3. **Votre site** sera disponible sur `https://afriviral.vercel.app`

## 🔄 Workflow de Déploiement Continu

### Déploiement Automatique

Vercel déploie automatiquement à chaque push sur la branche `main` :

```bash
# Faire des modifications
git add .
git commit -m "Description des modifications"
git push origin main
# Vercel déploie automatiquement
```

### Déploiement de Branches de Développement

```bash
# Créer une branche de développement
git checkout -b feature/nouvelle-fonctionnalite

# Faire des modifications
git add .
git commit -m "Ajout nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite

# Créer une Pull Request sur GitHub
# Vercel créera automatiquement un preview
```

## 🛠️ Commandes Utiles

### Développement Local

```bash
# Installer les dépendances
cd frontend
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

### Git

```bash
# Voir le statut
git status

# Ajouter tous les fichiers
git add .

# Commit avec message
git commit -m "Message descriptif"

# Pousser vers GitHub
git push origin main

# Récupérer les dernières modifications
git pull origin main
```

## 🔍 Vérification du Déploiement

### Checklist Post-Déploiement

- [ ] Site accessible sur l'URL Vercel
- [ ] Toutes les pages se chargent correctement
- [ ] Formulaires fonctionnent
- [ ] Images et assets se chargent
- [ ] Responsive design fonctionne
- [ ] Pas d'erreurs dans la console
- [ ] Performance acceptable

### Tests à Effectuer

1. **Page d'accueil** : Vérifier le chargement
2. **Inscription PME** : Tester le formulaire
3. **Inscription Influenceur** : Tester le formulaire
4. **Connexion** : Tester avec les comptes démo
5. **Dashboard** : Vérifier l'affichage des données
6. **Navigation** : Tester tous les liens

## 🚨 Résolution de Problèmes

### Erreurs Courantes

#### Build Failed
```bash
# Vérifier les logs dans Vercel Dashboard
# Vérifier les dépendances
npm install
npm run build
```

#### Variables d'Environnement
- Vérifier que toutes les variables `NEXT_PUBLIC_*` sont définies
- Redéployer après modification des variables

#### Images ne se chargent pas
- Vérifier la configuration `remotePatterns` dans `next.config.js`
- Vérifier les URLs des images

### Logs et Debugging

```bash
# Logs Vercel
vercel logs

# Logs locaux
npm run dev
# Vérifier la console du navigateur
```

## 📊 Monitoring

### Vercel Analytics
- Activer Vercel Analytics dans le dashboard
- Surveiller les performances
- Analyser les erreurs

### Métriques Importantes
- **Core Web Vitals**
- **Temps de chargement**
- **Taux d'erreur**
- **Trafic utilisateur**

## 🔐 Sécurité

### Headers de Sécurité
- Configurés dans `next.config.js`
- Vérifiés automatiquement par Vercel

### Variables Sensibles
- Ne jamais commiter les fichiers `.env.local`
- Utiliser les variables d'environnement Vercel
- Rotation régulière des clés

## 📈 Optimisations

### Performance
- Images optimisées avec Next.js Image
- Compression automatique
- CDN Vercel

### SEO
- Meta tags configurés
- Sitemap automatique
- Robots.txt

## 🆘 Support

### Ressources
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/votre-username/afriviral-mvp/issues)

### Contact
- **Email** : business@afriviral.com
- **WhatsApp** : +225 05 01 59 69 69

---

**🎉 Félicitations ! Votre plateforme AfriViral est maintenant déployée sur Vercel !**


