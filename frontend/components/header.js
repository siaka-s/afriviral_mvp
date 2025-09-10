"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon, Cog6ToothIcon, UserCircleIcon, ChartBarIcon, CogIcon, UserGroupIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<nav className="flex h-16 lg:h-20 items-center justify-between" aria-label="Primary">
					{/* Logo à gauche */}
					<div className="flex items-center gap-3">
						<Link href="/" className="flex items-center group">
							<Image 
								src="/logo1.png" 
								alt="AfriViral" 
								width={140} 
								height={45}
								className="h-8 lg:h-10 w-auto group-hover:scale-105 transition-transform duration-300"
							/>
						</Link>
					</div>
					
					{/* Navigation desktop - cachée sur mobile */}
					<div className="hidden lg:flex flex-1 justify-center">
						<ul className="flex items-center gap-8 xl:gap-12 text-base xl:text-lg font-semibold">
							<li>
								<Link href="/" className="hover:text-afriviral-blue-300 transition-colors duration-300 hover:scale-105 transform">
									Accueil
								</Link>
							</li>
							<li>
								<Link href="/brand" className="hover:text-afriviral-blue-300 transition-colors duration-300 hover:scale-105 transform">
									PME
								</Link>
							</li>
							<li>
								<Link href="/creator" className="hover:text-afriviral-orange-300 transition-colors duration-300 hover:scale-105 transform">
									Influenceur
								</Link>
							</li>
							<li>
								<Link href="/register" className="hover:text-afriviral-orange-300 transition-colors duration-300 hover:scale-105 transform">
									Inscription
								</Link>
							</li>
						</ul>
					</div>
					
					{/* Boutons desktop - cachés sur mobile */}
					<div className="hidden lg:flex items-center gap-4">
						{/* Menu déroulant Paramètres */}
						<div className="relative">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="flex items-center gap-2 px-3 py-2 text-sm font-semibold hover:text-afriviral-blue-300 transition-all duration-300 rounded-xl hover:bg-white/10"
							>
								<Cog6ToothIcon className="h-5 w-5" />
								<ChevronDownIcon className="h-4 w-4" />
							</button>
							
							{isDropdownOpen && (
								<div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl py-4 z-50 border border-gray-200">
									{/* Informations utilisateur */}
									<div className="px-6 py-3 border-b border-gray-100">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
												<span className="text-white font-bold text-sm">AK</span>
											</div>
											<div>
												<div className="font-semibold text-gray-900">Aminata Kouadio</div>
												<div className="text-sm text-gray-500">PME • Tech Solutions CI</div>
											</div>
										</div>
									</div>
									
									{/* Menu principal */}
									<div className="py-2">
										<Link href="/dashboard" className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-afriviral-blue-50 hover:text-afriviral-blue transition-all duration-300">
											<ChartBarIcon className="h-5 w-5" />
											<div>
												<div className="font-medium">Dashboard</div>
												<div className="text-xs text-gray-500">3 campagnes actives</div>
											</div>
										</Link>
										<Link href="/profile" className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-afriviral-blue-50 hover:text-afriviral-blue transition-all duration-300">
											<UserCircleIcon className="h-5 w-5" />
											<div>
												<div className="font-medium">Mon Profil</div>
												<div className="text-xs text-gray-500">Complété à 85%</div>
											</div>
										</Link>
										<Link href="/campaigns" className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-afriviral-orange-50 hover:text-afriviral-orange transition-all duration-300">
											<Cog6ToothIcon className="h-5 w-5" />
											<div>
												<div className="font-medium">Mes Campagnes</div>
												<div className="text-xs text-gray-500">12 campagnes total</div>
											</div>
										</Link>
										<Link href="/influencers" className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-afriviral-blue-50 hover:text-afriviral-blue transition-all duration-300">
											<UserGroupIcon className="h-5 w-5" />
											<div>
												<div className="font-medium">Influenceurs</div>
												<div className="text-xs text-gray-500">45 collaborateurs</div>
											</div>
										</Link>
									</div>
									
									<div className="border-t border-gray-200 my-2"></div>
									
									{/* Menu secondaire */}
									<div className="py-2">
										<Link href="/settings" className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300">
											<CogIcon className="h-5 w-5" />
											<div>
												<div className="font-medium">Paramètres</div>
												<div className="text-xs text-gray-500">Notifications, sécurité</div>
											</div>
										</Link>
										<Link href="/billing" className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300">
											<Cog6ToothIcon className="h-5 w-5" />
											<div>
												<div className="font-medium">Facturation</div>
												<div className="text-xs text-gray-500">2 450 000 FCFA dépensés</div>
											</div>
										</Link>
										<Link href="/help" className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-afriviral-orange-50 hover:text-afriviral-orange transition-all duration-300">
											<Cog6ToothIcon className="h-5 w-5" />
											<div>
												<div className="font-medium">Aide & Support</div>
												<div className="text-xs text-gray-500">Centre d'aide</div>
											</div>
										</Link>
									</div>
									
									<div className="border-t border-gray-200 my-2"></div>
									
									{/* Déconnexion */}
									<button className="flex items-center gap-4 px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 w-full text-left">
										<Cog6ToothIcon className="h-5 w-5" />
										<div>
											<div className="font-medium">Déconnexion</div>
											<div className="text-xs text-red-400">Se déconnecter du compte</div>
										</div>
									</button>
								</div>
							)}
						</div>
						
						<Link href="/login" className="btn-outline px-4 py-2 text-sm font-semibold rounded-xl">
							Connexion
						</Link>
					</div>

					{/* Bouton hamburger mobile */}
					<div className="lg:hidden">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
						>
							{isMobileMenuOpen ? (
								<XMarkIcon className="h-6 w-6" />
							) : (
								<Bars3Icon className="h-6 w-6" />
							)}
						</button>
					</div>
				</nav>

				{/* Menu mobile */}
				{isMobileMenuOpen && (
					<div className="lg:hidden border-t border-gray-700 py-4">
						<div className="space-y-4">
							{/* Navigation mobile */}
							<div className="space-y-2">
								<Link 
									href="/" 
									className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg transition-colors duration-200"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Accueil
								</Link>
								<Link 
									href="/brand" 
									className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg transition-colors duration-200"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									PME
								</Link>
								<Link 
									href="/creator" 
									className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg transition-colors duration-200"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Influenceur
								</Link>
								<Link 
									href="/register" 
									className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg transition-colors duration-200"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Inscription
								</Link>
							</div>

							{/* Boutons mobile */}
							<div className="pt-4 border-t border-gray-700 space-y-3">
								<Link 
									href="/login" 
									className="block w-full btn-outline px-4 py-3 text-center text-sm font-semibold rounded-xl"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Connexion
								</Link>
								
								{/* Menu utilisateur mobile */}
								<div className="bg-white/10 rounded-xl p-4">
									<div className="flex items-center gap-3 mb-4">
										<div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
											<span className="text-white font-bold text-sm">AK</span>
										</div>
										<div>
											<div className="font-semibold text-white">Aminata Kouadio</div>
											<div className="text-sm text-gray-300">PME • Tech Solutions CI</div>
										</div>
									</div>
									
									<div className="space-y-2">
										<Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-lg transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>
											<ChartBarIcon className="h-4 w-4" />
											Dashboard
										</Link>
										<Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-lg transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>
											<UserCircleIcon className="h-4 w-4" />
											Mon Profil
										</Link>
										<Link href="/campaigns" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-lg transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>
											<Cog6ToothIcon className="h-4 w-4" />
											Mes Campagnes
										</Link>
										<Link href="/influencers" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-lg transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>
											<UserGroupIcon className="h-4 w-4" />
											Influenceurs
										</Link>
										<Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-lg transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>
											<CogIcon className="h-4 w-4" />
											Paramètres
										</Link>
										<Link href="/billing" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-lg transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>
											<Cog6ToothIcon className="h-4 w-4" />
											Facturation
										</Link>
										<Link href="/help" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-lg transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>
											<Cog6ToothIcon className="h-4 w-4" />
											Aide & Support
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}


