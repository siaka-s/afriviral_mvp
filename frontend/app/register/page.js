"use client";

import { useState } from "react";
import AdvertiserOnboardingForm from "../../components/AdvertiserOnboardingForm";
import InfluencerOnboardingForm from "../../components/InfluencerOnboardingForm";
import { BuildingOfficeIcon, UserGroupIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {!selectedType ? (
          // Sélection du type d'inscription
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="gradient-text">Rejoignez AfriViral</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choisissez votre profil pour commencer votre aventure avec la plateforme d'influence africaine
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* PME Card */}
              <div
                onClick={() => setSelectedType('pme')}
                className="group cursor-pointer bg-white p-10 rounded-3xl shadow-2xl border-2 border-transparent hover:border-afriviral-blue-300 transition-all duration-300 hover:shadow-3xl hover:-translate-y-3"
              >
                <div className="w-20 h-20 bg-gradient-blue rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <BuildingOfficeIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Je suis une PME</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  Je veux lancer des campagnes d'influence pour promouvoir mes produits et services auprès de mon audience locale.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-afriviral-blue rounded-full"></div>
                    <span>Campagnes ciblées et efficaces</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-afriviral-blue rounded-full"></div>
                    <span>Matching IA avec des influenceurs locaux</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-afriviral-blue rounded-full"></div>
                    <span>Budgets adaptés aux PME</span>
                  </div>
                </div>
                <div className="mt-8 text-afriviral-blue font-bold text-lg group-hover:text-afriviral-blue-600">
                  Créer mon compte PME →
                </div>
              </div>

              {/* Influenceur Card */}
              <div
                onClick={() => setSelectedType('influenceur')}
                className="group cursor-pointer bg-white p-10 rounded-3xl shadow-2xl border-2 border-transparent hover:border-afriviral-orange-300 transition-all duration-300 hover:shadow-3xl hover:-translate-y-3"
              >
                <div className="w-20 h-20 bg-gradient-orange rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <UserGroupIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Je suis Influenceur</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  Je veux monétiser ma communauté et collaborer avec des marques africaines qui partagent mes valeurs.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-afriviral-orange rounded-full"></div>
                    <span>Propositions de campagnes adaptées</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-afriviral-orange rounded-full"></div>
                    <span>Paiements garantis via escrow</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-afriviral-orange rounded-full"></div>
                    <span>Collaboration avec des PME locales</span>
                  </div>
                </div>
                <div className="mt-8 text-afriviral-orange font-bold text-lg group-hover:text-afriviral-orange-600">
                  Créer mon profil Influenceur →
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Formulaire d'inscription
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setSelectedType(null)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors group"
              >
                <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Retour au choix
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {selectedType === 'pme' ? '🏢' : '👤'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {selectedType === 'pme' ? 'Inscription PME' : 'Inscription Influenceur'}
                  </h1>
                  <p className="text-gray-600">
                    {selectedType === 'pme' 
                      ? 'Créez votre compte pour lancer vos campagnes d\'influence' 
                      : 'Créez votre profil pour monétiser votre communauté'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
              {selectedType === 'pme' ? (
                <AdvertiserOnboardingForm />
              ) : (
                <InfluencerOnboardingForm />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}