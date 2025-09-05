#!/bin/bash

# AfriViral Frontend Deployment Script
# Ce script automatise le déploiement du frontend sur Vercel

echo "🚀 Déploiement AfriViral Frontend"
echo "================================="

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Erreur: Veuillez exécuter ce script depuis la racine du projet"
    exit 1
fi

# Aller dans le dossier frontend
cd frontend

echo "📦 Installation des dépendances..."
npm install

echo "🔍 Vérification du code..."
npm run lint

echo "🏗️ Build de production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

echo "📝 Préparation du commit..."
cd ..

# Ajouter tous les fichiers
git add .

# Demander le message de commit
read -p "💬 Message de commit: " commit_message

if [ -z "$commit_message" ]; then
    commit_message="Deploy: Mise à jour du frontend"
fi

# Commit
git commit -m "$commit_message"

echo "📤 Push vers GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Push réussi !"
    echo "🌐 Vercel va automatiquement déployer votre application"
    echo "⏳ Attendez 2-3 minutes puis vérifiez votre URL Vercel"
else
    echo "❌ Erreur lors du push"
    exit 1
fi

echo ""
echo "🎉 Déploiement terminé !"
echo "📋 Prochaines étapes :"
echo "   1. Vérifiez votre dashboard Vercel"
echo "   2. Testez votre application déployée"
echo "   3. Configurez les variables d'environnement si nécessaire"
echo ""
echo "🔗 Liens utiles :"
echo "   - Vercel Dashboard: https://vercel.com/dashboard"
echo "   - GitHub Repository: https://github.com/VOTRE-USERNAME/afriviral-mvp"
