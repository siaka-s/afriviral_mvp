export default function Footer() {
	return (
		<footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					{/* À Propos */}
					<div>
						<h3 className="text-white font-bold text-xl mb-6">À Propos d'AfriViral</h3>
						<p className="text-gray-400 mb-6 leading-relaxed">
							La plateforme MarTech qui connecte les PME africaines aux meilleurs micro-influenceurs locaux pour des campagnes ciblées et efficaces.
						</p>
						<p className="text-gray-400 leading-relaxed">
							Ancré à Abidjan, nous créons des solutions adaptées au marché africain.
						</p>
					</div>

					{/* Contact */}
					<div>
						<h3 className="text-white font-bold text-xl mb-6">Contact</h3>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<span className="text-afriviral-blue-400">📧</span>
								<a href="mailto:business@afriviral.com" className="text-afriviral-blue-400 hover:text-afriviral-blue-300 transition-colors font-medium">
									business@afriviral.com
								</a>
							</div>
							<div className="flex items-center gap-3">
								<span className="text-afriviral-orange-400">📱</span>
								<a href="https://wa.me/2250501596969" className="text-afriviral-orange-400 hover:text-afriviral-orange-300 transition-colors font-medium">
									+225 05 01 59 69 69
								</a>
							</div>
							<div className="flex items-center gap-3">
								<span className="text-afriviral-blue-400">🌐</span>
								<a href="https://www.afriviral.com" className="text-afriviral-blue-400 hover:text-afriviral-blue-300 transition-colors font-medium" target="_blank" rel="noopener noreferrer">
									www.afriviral.com
								</a>
							</div>
						</div>
					</div>

					{/* Liens Utiles */}
					<div>
						<h3 className="text-white font-bold text-xl mb-6">Liens Utiles</h3>
						<div className="space-y-3">
							<a href="/brand" className="block text-gray-400 hover:text-afriviral-blue-300 transition-colors duration-300 hover:translate-x-2 transform">Pour les PME</a>
							<a href="/creator" className="block text-gray-400 hover:text-afriviral-orange-300 transition-colors duration-300 hover:translate-x-2 transform">Pour les Influenceurs</a>
							<a href="/register" className="block text-gray-400 hover:text-afriviral-blue-300 transition-colors duration-300 hover:translate-x-2 transform">Inscription PME</a>
							<a href="/register-influenceur" className="block text-gray-400 hover:text-afriviral-orange-300 transition-colors duration-300 hover:translate-x-2 transform">Inscription Influenceur</a>
							<a href="/login" className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Connexion</a>
						</div>
					</div>
				</div>

				{/* Séparateur */}
				<div className="border-t border-gray-700 mt-12 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-400 mb-4 md:mb-0">© 2025 AfriViral • Abidjan • Tous droits réservés</p>
						<div className="flex gap-6">
							<a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
								Politique de Confidentialité
							</a>
							<a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
								Conditions d'Utilisation
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}


