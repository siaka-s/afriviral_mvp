"use client";

import { useState } from "react";
import MiniSignupModal from "../../components/MiniSignupModal";

export default function CreatorLandingPage() {
	const [openMini, setOpenMini] = useState(false);

	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-orange-50 to-afriviral-blue-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ED3F00%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			<section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
				{/* Hero Section Influenceur */}
				<div className="max-w-5xl text-center mx-auto">
					<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-orange text-white text-sm font-medium mb-8">
						💰 Pour les Influenceurs
					</div>
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
						<span className="gradient-text">
							Gagne de l'Argent avec Ta Communauté
						</span>
					</h1>
					<p className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
						<span className="gradient-text">"Touchez plus, sans stress"</span>
					</p>
					<p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
						Rejoins la première plateforme d'influence africaine. Reçois des propositions adaptées à ton audience 
						et monétise tes contenus avec des PME locales qui partagent tes valeurs.
					</p>
					<button className="btn-gradient px-10 py-5 text-lg font-bold rounded-2xl shadow-2xl shadow-primary transform hover:scale-105 transition-all duration-300" onClick={() => setOpenMini(true)}>
						🚀 Commencer - C'est Gratuit
					</button>
				</div>

				{/* Avantages pour Influenceurs */}
				<div className="bg-white rounded-3xl p-10 shadow-2xl shadow-gray-200/50 border border-gray-100">
					<div className="text-center mb-12">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-medium mb-6">
							💎 Avantages Uniques
						</div>
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Pourquoi Rejoindre AfriViral ?</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="group p-6 rounded-2xl hover:bg-afriviral-orange-50 transition-all duration-300">
							<div className="w-14 h-14 bg-gradient-orange rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">💰</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">Monétise Ton Audience</h3>
							<p className="text-gray-600 leading-relaxed">Reçois des propositions de campagnes adaptées à ton audience et tes valeurs. Paiement garanti via escrow sécurisé.</p>
						</div>
						<div className="group p-6 rounded-2xl hover:bg-afriviral-blue-50 transition-all duration-300">
							<div className="w-14 h-14 bg-gradient-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">🎯</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">Propositions Ciblées</h3>
							<p className="text-gray-600 leading-relaxed">Notre IA te propose uniquement des campagnes qui correspondent à ton audience et tes centres d'intérêt.</p>
						</div>
						<div className="group p-6 rounded-2xl hover:bg-afriviral-orange-50 transition-all duration-300">
							<div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">📱</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Plateformes</h3>
							<p className="text-gray-600 leading-relaxed">Connecte tes comptes Instagram, TikTok, Facebook et YouTube. Gère tout depuis une seule plateforme.</p>
						</div>
						<div className="group p-6 rounded-2xl hover:bg-afriviral-blue-50 transition-all duration-300">
							<div className="w-14 h-14 bg-gradient-orange rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">🤝</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">PME Locales</h3>
							<p className="text-gray-600 leading-relaxed">Collabore avec des PME africaines qui comprennent ton audience et partagent tes valeurs culturelles.</p>
						</div>
					</div>
				</div>

				{/* Processus pour Influenceurs */}
				<div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-10 shadow-lg">
					<div className="text-center mb-12">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-orange-100 text-afriviral-orange text-sm font-medium mb-6">
							⚡ Comment Ça Marche
						</div>
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Comment Ça Marche pour Toi ?</h2>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="group text-center">
							<div className="relative mb-8">
								<div className="bg-gradient-orange w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-orange group-hover:scale-110 transition-transform duration-300">
									<span className="text-3xl font-bold text-white">1</span>
								</div>
								<div className="absolute -top-2 -right-2 w-6 h-6 bg-afriviral-blue rounded-full flex items-center justify-center">
									<span className="text-white text-sm">👤</span>
								</div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-gray-900">Connecte Tes Comptes</h3>
							<p className="text-lg text-gray-600 leading-relaxed">Lie tes comptes sociaux pour que nous puissions analyser ton audience et tes performances.</p>
						</div>
						<div className="group text-center">
							<div className="relative mb-8">
								<div className="bg-gradient-blue w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue group-hover:scale-110 transition-transform duration-300">
									<span className="text-3xl font-bold text-white">2</span>
								</div>
								<div className="absolute -top-2 -right-2 w-6 h-6 bg-afriviral-orange rounded-full flex items-center justify-center">
									<span className="text-white text-sm">📨</span>
								</div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-gray-900">Reçois des Propositions</h3>
							<p className="text-lg text-gray-600 leading-relaxed">Notre IA te propose des campagnes adaptées à ton profil et ton audience.</p>
						</div>
						<div className="group text-center">
							<div className="relative mb-8">
								<div className="bg-gradient-primary w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-primary group-hover:scale-110 transition-transform duration-300">
									<span className="text-3xl font-bold text-white">3</span>
								</div>
								<div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
									<span className="text-white text-sm">💰</span>
								</div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-gray-900">Crée et Gagne</h3>
							<p className="text-lg text-gray-600 leading-relaxed">Accepte les campagnes qui te plaisent, crée tes contenus et reçois ton paiement.</p>
						</div>
					</div>
				</div>

				{/* Types de Contenus */}
				<div className="bg-white rounded-3xl p-10 shadow-2xl shadow-gray-200/50 border border-gray-100">
					<div className="text-center mb-12">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-blue-100 text-afriviral-blue text-sm font-medium mb-6">
							📱 Types de Contenus
						</div>
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Types de Contenus Demandés</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="group text-center p-6 border border-gray-200 rounded-2xl hover:border-afriviral-blue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
							<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
							<h3 className="text-lg font-bold text-gray-900 mb-2">Posts Instagram</h3>
							<p className="text-gray-600">Photos et stories</p>
						</div>
						<div className="group text-center p-6 border border-gray-200 rounded-2xl hover:border-afriviral-orange/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
							<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎥</div>
							<h3 className="text-lg font-bold text-gray-900 mb-2">Vidéos TikTok</h3>
							<p className="text-gray-600">Contenus courts et engageants</p>
						</div>
						<div className="group text-center p-6 border border-gray-200 rounded-2xl hover:border-afriviral-blue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
							<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📺</div>
							<h3 className="text-lg font-bold text-gray-900 mb-2">YouTube</h3>
							<p className="text-gray-600">Vidéos longues et détaillées</p>
						</div>
						<div className="group text-center p-6 border border-gray-200 rounded-2xl hover:border-afriviral-orange/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
							<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📱</div>
							<h3 className="text-lg font-bold text-gray-900 mb-2">Facebook</h3>
							<p className="text-gray-600">Posts et lives</p>
						</div>
					</div>
				</div>

				{/* Témoignages */}
				<div className="bg-gradient-to-r from-afriviral-blue-50 to-afriviral-orange-50 rounded-3xl p-10 shadow-lg">
					<div className="text-center mb-12">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-blue text-white text-sm font-medium mb-6">
							💬 Témoignages
						</div>
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Ce Que Disent Nos Influenceurs</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-afriviral-blue/20 hover:-translate-y-2">
							<p className="text-gray-600 mb-6 leading-relaxed text-lg italic">"AfriViral m'a permis de monétiser mon audience de manière authentique. Les PME avec qui je collabore partagent vraiment mes valeurs."</p>
							<div className="font-bold text-afriviral-blue text-lg">- Awa, Influenceuse Mode (15K followers)</div>
						</div>
						<div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-afriviral-orange/20 hover:-translate-y-2">
							<p className="text-gray-600 mb-6 leading-relaxed text-lg italic">"Le processus est simple et les paiements sont garantis. Je peux me concentrer sur la création de contenu de qualité."</p>
							<div className="font-bold text-afriviral-orange text-lg">- Koffi, Créateur Tech (8K followers)</div>
						</div>
					</div>
				</div>

				{/* CTA Final */}
				<div className="text-center bg-gradient-primary rounded-3xl p-12 text-white shadow-2xl">
					<h2 className="text-3xl lg:text-4xl font-bold mb-6">Prêt à Commencer à Gagner ?</h2>
					<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Rejoins des centaines d'influenceurs africains qui monétisent déjà leur audience avec AfriViral.</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
						<button className="bg-white text-afriviral-blue px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105" onClick={() => setOpenMini(true)}>
							🚀 Rejoindre Maintenant
						</button>
						<a href="mailto:hello@afriviral.com" className="border-2 border-white text-white px-8 py-4 text-lg font-bold rounded-2xl hover:bg-white hover:text-afriviral-blue transition-all duration-300">
							📧 Nous Contacter
						</a>
					</div>
				</div>

				<MiniSignupModal open={openMini} onClose={() => setOpenMini(false)} onSubmit={() => setOpenMini(false)} />
			</section>
		</div>
	);
}


