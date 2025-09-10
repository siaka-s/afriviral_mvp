export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			{/* Hero Section */}
			<section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
				<div className="max-w-6xl">
					<div className="text-center mb-8 sm:mb-12 lg:mb-16">
						<div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-primary text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-lg">
							🚀 Plateforme MarTech #1 en Afrique
						</div>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight mb-6 sm:mb-8">
							<span className="gradient-text">
								AfriViral
							</span>
							<br />
							<span className="text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
								Touchez plus, sans stress
							</span>
						</h1>
						<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
							La plateforme MarTech qui permet aux PME africaines de lancer facilement des campagnes d'influence ciblées, accessibles et efficaces, en collaboration avec des nano et micro-influenceurs locaux.
						</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4">
							<a href="/register" className="w-full sm:w-auto btn-gradient px-6 sm:px-8 lg:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl shadow-2xl shadow-primary transform hover:scale-105 transition-all duration-300 text-center">
								🚀 Lancez Votre Campagne Maintenant
							</a>
							<a href="/creator" className="w-full sm:w-auto btn-outline px-6 sm:px-8 lg:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center">
								💰 Je suis influenceur
							</a>
						</div>
						
						{/* Stats */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
							<div className="text-center">
								<div className="text-3xl sm:text-4xl font-bold text-afriviral-blue mb-2">500+</div>
								<div className="text-sm sm:text-base text-gray-600">PME Actives</div>
							</div>
							<div className="text-center">
								<div className="text-3xl sm:text-4xl font-bold text-afriviral-orange mb-2">2K+</div>
								<div className="text-sm sm:text-base text-gray-600">Influenceurs</div>
							</div>
							<div className="text-center">
								<div className="text-3xl sm:text-4xl font-bold text-afriviral-blue mb-2">95%</div>
								<div className="text-sm sm:text-base text-gray-600">Satisfaction</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Le Problème que nous Résolvons */}
			<section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-gray-50 to-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-5xl mx-auto">
						<div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-red-100 text-red-600 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
							⚠️ Problème Identifié
						</div>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 px-4">Le Défi des PME Africaines</h2>
						<div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100">
							<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
								Les PME africaines manquent d'accès à des campagnes d'influence ciblées, accessibles et efficaces. 
								Elles peinent à identifier et collaborer avec des micro-influenceurs pertinents pour promouvoir leurs produits localement, 
								faute d'outils adaptés, de réseau et de budget.
							</p>
							<div className="bg-gradient-primary p-4 sm:p-6 rounded-xl sm:rounded-2xl">
								<span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">AfriViral est LA solution à ces défis.</span>
								<div className="mt-3 sm:mt-4 text-lg sm:text-xl text-blue-100">
									"Touchez plus, sans stress"
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Comment Ça Marche */}
			<section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12 sm:mb-16">
						<div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-afriviral-blue-100 text-afriviral-blue text-xs sm:text-sm font-medium mb-6 sm:mb-8">
							✨ Comment Ça Marche
						</div>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 px-4">En 3 Étapes Simples</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
						<div className="group text-center">
							<div className="relative mb-6 sm:mb-8">
								<div className="bg-gradient-blue w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue group-hover:scale-110 transition-transform duration-300">
									<span className="text-2xl sm:text-3xl font-bold text-white">1</span>
								</div>
								<div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-afriviral-orange rounded-full flex items-center justify-center">
									<span className="text-white text-xs sm:text-sm">🤖</span>
								</div>
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 px-4">Créez Votre Brief Assisté par l'IA</h3>
							<p className="text-base sm:text-lg text-gray-600 leading-relaxed px-4">
								Grâce à l'intelligence artificielle, les annonceurs sont guidés dans la rédaction de leur brief via un prompt simplifié. 
								Décrivez votre besoin pour une campagne solo ou groupée.
							</p>
						</div>
						<div className="group text-center">
							<div className="relative mb-6 sm:mb-8">
								<div className="bg-gradient-orange w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-orange group-hover:scale-110 transition-transform duration-300">
									<span className="text-2xl sm:text-3xl font-bold text-white">2</span>
								</div>
								<div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-afriviral-blue rounded-full flex items-center justify-center">
									<span className="text-white text-xs sm:text-sm">🎯</span>
								</div>
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 px-4">Découvrez les Influenceurs Pertinents</h3>
							<p className="text-base sm:text-lg text-gray-600 leading-relaxed px-4">
								Recevez automatiquement des propositions de profils d'influenceurs pertinents. 
								Jusqu'à 10 suggestions d'influenceurs par email/WhatsApp.
							</p>
						</div>
						<div className="group text-center">
							<div className="relative mb-6 sm:mb-8">
								<div className="bg-gradient-primary w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-primary group-hover:scale-110 transition-transform duration-300">
									<span className="text-2xl sm:text-3xl font-bold text-white">3</span>
								</div>
								<div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
									<span className="text-white text-xs sm:text-sm">🚀</span>
								</div>
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 px-4">Lancez et Gérez Votre Campagne</h3>
							<p className="text-base sm:text-lg text-gray-600 leading-relaxed px-4">
								Tout le processus – de la définition du besoin au paiement – est fluide, rapide, et optimisé. 
								Sélectionnez, payez et suivez la campagne en direct avec un système de paiement sécurisé.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Avantages d'AfriViral */}
			<section className="py-20 bg-gradient-to-br from-gray-50 to-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-medium mb-8">
							💎 Avantages Uniques
						</div>
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Les Avantages d'AfriViral pour votre PME</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-afriviral-blue/20 hover:-translate-y-2">
							<div className="w-16 h-16 bg-gradient-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">🎯</span>
							</div>
							<h3 className="text-xl font-bold mb-4 text-gray-900">Ciblage Précis</h3>
							<p className="text-gray-600 leading-relaxed">Accédez à des nano et micro-influenceurs locaux dont l'audience correspond à vos clients. L'IA effectue un matching précis de l'audience et du budget.</p>
						</div>
						<div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-afriviral-orange/20 hover:-translate-y-2">
							<div className="w-16 h-16 bg-gradient-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">💰</span>
							</div>
							<h3 className="text-xl font-bold mb-4 text-gray-900">Accessibilité Financière</h3>
							<p className="text-gray-600 leading-relaxed">Des campagnes adaptées aux budgets des PME, avec la possibilité de partager les coûts en campagne collaborative. Le mode Co-promotion PME permet la mutualisation des coûts.</p>
						</div>
						<div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-afriviral-blue/20 hover:-translate-y-2">
							<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">⚡</span>
							</div>
							<h3 className="text-xl font-bold mb-4 text-gray-900">Gain de Temps</h3>
							<p className="text-gray-600 leading-relaxed">Processus optimisé, rapide et fluide, de la définition du besoin au paiement. Le sourcing manuel est remplacé par le matching IA.</p>
						</div>
						<div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-500/20 hover:-translate-y-2">
							<div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">✅</span>
							</div>
							<h3 className="text-xl font-bold mb-4 text-gray-900">Efficacité Garantie</h3>
							<p className="text-gray-600 leading-relaxed">Des outils adaptés pour promouvoir vos produits localement et efficacement.</p>
						</div>
						<div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-afriviral-blue/20 hover:-translate-y-2">
							<div className="w-16 h-16 bg-gradient-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">🔗</span>
							</div>
							<h3 className="text-xl font-bold mb-4 text-gray-900">Hub Unique</h3>
							<p className="text-gray-600 leading-relaxed">Contrairement aux plateformes dispersées, AfriViral est un hub unique pour Facebook, Instagram, TikTok, YouTube.</p>
						</div>
						<div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-afriviral-orange/20 hover:-translate-y-2">
							<div className="w-16 h-16 bg-gradient-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">🤝</span>
							</div>
							<h3 className="text-xl font-bold mb-4 text-gray-900">Formats Flexibles</h3>
							<p className="text-gray-600 leading-relaxed">Campagnes Solo pour une seule marque ou Campagnes Collaboratives pour partager les coûts entre entreprises complémentaires.</p>
						</div>
					</div>
				</div>
			</section>

			{/* À Propos */}
			<section className="py-20 bg-gradient-to-br from-afriviral-blue-50 to-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-5xl mx-auto">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-blue text-white text-sm font-medium mb-8">
							🏢 À Propos d'AfriViral
						</div>
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">Notre Équipe d'Experts</h2>
						
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
							<div className="text-left">
								<p className="text-xl text-gray-600 mb-6 leading-relaxed">
									Notre équipe complémentaire réunit une développeuse full-stack / UI-UX, un expert marketing digital et automatisation, 
									un ingénieur logiciel cloud & IA, et un stratège digital / e-learning.
								</p>
								<p className="text-xl text-gray-600 leading-relaxed">
									Ancré à Abidjan, nous connaissons les réalités africaines et créons des solutions adaptées au marché local.
								</p>
							</div>
							<div className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-200/50">
								<div className="grid grid-cols-2 gap-6">
									<div className="text-center">
										<div className="w-16 h-16 bg-gradient-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
											<span className="text-2xl">👩‍💻</span>
										</div>
										<h4 className="font-semibold text-gray-900">Full-Stack</h4>
										<p className="text-sm text-gray-600">UI/UX Design</p>
									</div>
									<div className="text-center">
										<div className="w-16 h-16 bg-gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
											<span className="text-2xl">📈</span>
										</div>
										<h4 className="font-semibold text-gray-900">Marketing</h4>
										<p className="text-sm text-gray-600">Digital & Automation</p>
									</div>
									<div className="text-center">
										<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
											<span className="text-2xl">☁️</span>
										</div>
										<h4 className="font-semibold text-gray-900">Cloud & IA</h4>
										<p className="text-sm text-gray-600">Ingénieur Logiciel</p>
									</div>
									<div className="text-center">
										<div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
											<span className="text-2xl">🎓</span>
										</div>
										<h4 className="font-semibold text-gray-900">Stratège</h4>
										<p className="text-sm text-gray-600">Digital & E-learning</p>
									</div>
								</div>
							</div>
						</div>

						{/* CTA Final */}
						<div className="bg-gradient-primary rounded-3xl p-12 text-white shadow-2xl">
							<h3 className="text-3xl lg:text-4xl font-bold mb-6">Prêt à Décupler Votre Visibilité ?</h3>
							<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
								Rejoignez des centaines de PME africaines qui ont déjà choisi AfriViral pour leurs campagnes d'influence.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
								<a href="/register" className="bg-white text-afriviral-blue px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
									🚀 Démarrer – c'est gratuit
								</a>
								<a href="mailto:business@afriviral.com" className="border-2 border-white text-white px-8 py-4 text-lg font-bold rounded-2xl hover:bg-white hover:text-afriviral-blue transition-all duration-300">
									📧 Nous contacter
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}


