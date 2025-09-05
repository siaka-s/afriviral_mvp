"use client";

import { useState } from "react";
import BriefPrompt from "../../components/BriefPrompt";
import MiniSignupModal from "../../components/MiniSignupModal";
import SuggestionsCarousel from "../../components/SuggestionsCarousel";

export default function BrandLandingPage() {
	const [openMini, setOpenMini] = useState(false);
	const [loading, setLoading] = useState(false);

	async function handlePrompt(prompt) {
		if (!prompt || !prompt.trim()) return;
		setOpenMini(true);
	}

	async function handleMiniSubmit(data) {
		setOpenMini(false);
		setLoading(true);
		// Ici, on appellerait n8n/IA pour parser et matcher. On simule un temps de chargement.
		setTimeout(() => setLoading(false), 60000);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			<section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
				{/* Hero Section PME */}
				<div className="max-w-5xl text-center mx-auto">
					<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-blue text-white text-sm font-medium mb-8">
						🏢 Pour les PME
					</div>
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
						<span className="gradient-text">
							Décuplez Votre Visibilité Locale
						</span>
					</h1>
					<p className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
						<span className="gradient-text">"Touchez plus, sans stress"</span>
					</p>
					<p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
						Lancez facilement des campagnes d'influence ciblées, accessibles et efficaces avec des nano et micro-influenceurs africains. 
						Commencez par décrire votre besoin, nous générons un plan IA en 60s.
					</p>
				</div>

				{/* Brief Prompt */}
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-blue-100 text-afriviral-blue text-sm font-medium mb-6">
								🤖 Brief Assisté par l'IA
							</div>
							<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Créez Votre Brief en 60 Secondes</h2>
							<p className="text-lg text-gray-600">Décrivez votre besoin et notre IA génère automatiquement un plan de campagne personnalisé.</p>
						</div>
						<BriefPrompt onSubmit={handlePrompt} />
					</div>
				</div>

				{/* Avantages spécifiques PME */}
				<div className="bg-white rounded-3xl p-10 shadow-2xl shadow-gray-200/50 border border-gray-100">
					<div className="text-center mb-12">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-medium mb-6">
							💎 Avantages Uniques
						</div>
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Pourquoi Choisir AfriViral pour Votre PME ?</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="group p-6 rounded-2xl hover:bg-afriviral-blue-50 transition-all duration-300">
							<div className="w-14 h-14 bg-gradient-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">🎯</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">Ciblage Précis Local</h3>
							<p className="text-gray-600 leading-relaxed">Accédez à des influenceurs dont l'audience correspond exactement à vos clients locaux. Notre IA analyse la pertinence géographique et démographique.</p>
						</div>
						<div className="group p-6 rounded-2xl hover:bg-afriviral-orange-50 transition-all duration-300">
							<div className="w-14 h-14 bg-gradient-orange rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">💰</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">Budgets Adaptés</h3>
							<p className="text-gray-600 leading-relaxed">Des campagnes à partir de 50 000 FCFA. Mode Co-promotion pour partager les coûts avec d'autres PME aux offres complémentaires.</p>
						</div>
						<div className="group p-6 rounded-2xl hover:bg-afriviral-blue-50 transition-all duration-300">
							<div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">⚡</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">Processus Simplifié</h3>
							<p className="text-gray-600 leading-relaxed">De la définition du besoin au paiement, tout est automatisé. Plus de sourcing manuel fastidieux.</p>
						</div>
						<div className="group p-6 rounded-2xl hover:bg-afriviral-orange-50 transition-all duration-300">
							<div className="w-14 h-14 bg-gradient-orange rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">📱</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Plateformes</h3>
							<p className="text-gray-600 leading-relaxed">Un seul hub pour Facebook, Instagram, TikTok et YouTube. Gérez toutes vos campagnes au même endroit.</p>
						</div>
					</div>
				</div>

				{/* Formats de Campagnes */}
				<div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-10 shadow-lg">
					<div className="text-center mb-12">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-blue-100 text-afriviral-blue text-sm font-medium mb-6">
							📋 Formats de Campagnes
						</div>
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Formats de Campagnes Disponibles</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-afriviral-blue/20 hover:-translate-y-2">
							<div className="w-16 h-16 bg-gradient-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">🎯</span>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Campagnes Solo</h3>
							<p className="text-gray-600 mb-6 leading-relaxed">Pour une seule marque. Idéal pour promouvoir un produit spécifique ou une offre exclusive.</p>
							<ul className="text-gray-600 space-y-2">
								<li className="flex items-center gap-2">
									<span className="w-2 h-2 bg-afriviral-blue rounded-full"></span>
									Contrôle total de votre message
								</li>
								<li className="flex items-center gap-2">
									<span className="w-2 h-2 bg-afriviral-blue rounded-full"></span>
									Budget flexible selon vos moyens
								</li>
								<li className="flex items-center gap-2">
									<span className="w-2 h-2 bg-afriviral-blue rounded-full"></span>
									Suivi détaillé des performances
								</li>
							</ul>
						</div>
						<div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-afriviral-orange/20 hover:-translate-y-2">
							<div className="w-16 h-16 bg-gradient-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">🤝</span>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Campagnes Collaboratives</h3>
							<p className="text-gray-600 mb-6 leading-relaxed">Plusieurs entreprises aux offres complémentaires s'associent pour gagner en visibilité et partager les coûts.</p>
							<ul className="text-gray-600 space-y-2">
								<li className="flex items-center gap-2">
									<span className="w-2 h-2 bg-afriviral-orange rounded-full"></span>
									Partage des coûts entre PME
								</li>
								<li className="flex items-center gap-2">
									<span className="w-2 h-2 bg-afriviral-orange rounded-full"></span>
									Audience élargie
								</li>
								<li className="flex items-center gap-2">
									<span className="w-2 h-2 bg-afriviral-orange rounded-full"></span>
									Synergie entre marques complémentaires
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Suggestions d'influenceurs */}
				<SuggestionsCarousel loading={loading} />

				{/* CTA Final */}
				<div className="text-center bg-gradient-primary rounded-3xl p-12 text-white shadow-2xl">
					<h2 className="text-3xl lg:text-4xl font-bold mb-6">Prêt à Lancer Votre Première Campagne ?</h2>
					<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Rejoignez les PME africaines qui ont déjà choisi AfriViral pour découpler leur visibilité.</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
						<a href="/register" className="bg-white text-afriviral-blue px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
							🚀 Créer Mon Compte PME
						</a>
						<a href="mailto:business@afriviral.com" className="border-2 border-white text-white px-8 py-4 text-lg font-bold rounded-2xl hover:bg-white hover:text-afriviral-blue transition-all duration-300">
							📧 Nous Contacter
						</a>
					</div>
				</div>

				<MiniSignupModal open={openMini} onClose={() => setOpenMini(false)} onSubmit={handleMiniSubmit} />
			</section>
		</div>
	);
}


