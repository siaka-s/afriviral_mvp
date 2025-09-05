"use client";

import { useState } from "react";
import AdvertiserOnboardingForm from "./AdvertiserOnboardingForm";
import InfluencerOnboardingForm from "./InfluencerOnboardingForm";
import { XMarkIcon, BuildingOfficeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function UnifiedRegistration({ isOpen, onClose }) {
  const [selectedType, setSelectedType] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-primary p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Rejoignez AfriViral</h2>
              <p className="text-blue-100">Choisissez votre profil pour commencer</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {!selectedType ? (
            // Sélection du type d'inscription
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Quel est votre profil ?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* PME Card */}
                <div
                  onClick={() => setSelectedType('pme')}
                  className="group cursor-pointer bg-gradient-to-br from-afriviral-blue-50 to-afriviral-blue-100 p-8 rounded-2xl border-2 border-transparent hover:border-afriviral-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BuildingOfficeIcon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Je suis une PME</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Je veux lancer des campagnes d'influence pour promouvoir mes produits et services.
                  </p>
                  <div className="text-afriviral-blue font-semibold group-hover:text-afriviral-blue-600">
                    Créer mon compte PME →
                  </div>
                </div>

                {/* Influenceur Card */}
                <div
                  onClick={() => setSelectedType('influenceur')}
                  className="group cursor-pointer bg-gradient-to-br from-afriviral-orange-50 to-afriviral-orange-100 p-8 rounded-2xl border-2 border-transparent hover:border-afriviral-orange-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UserGroupIcon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Je suis Influenceur</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Je veux monétiser ma communauté et collaborer avec des marques africaines.
                  </p>
                  <div className="text-afriviral-orange font-semibold group-hover:text-afriviral-orange-600">
                    Créer mon profil Influenceur →
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Formulaire d'inscription
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => setSelectedType(null)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Retour
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {selectedType === 'pme' ? '🏢' : '👤'}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {selectedType === 'pme' ? 'Inscription PME' : 'Inscription Influenceur'}
                  </span>
                </div>
              </div>

              {/* Formulaire */}
              <div className="max-w-4xl mx-auto">
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
    </div>
  );
}
