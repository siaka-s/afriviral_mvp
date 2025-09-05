"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon, Cog6ToothIcon, UserCircleIcon, ChartBarIcon, CogIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function Header() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<nav className="flex h-20 items-center" aria-label="Primary">
					{/* Logo à gauche */}
					<div className="flex items-center gap-3">
						<Link href="/" className="flex items-center group">
							<Image 
								src="/logo1.png" 
								alt="AfriViral" 
								width={140} 
								height={45}
								className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
							/>
						</Link>
					</div>
					
					{/* Navigation centrée */}
					<div className="flex-1 flex justify-center">
						<ul className="flex items-center gap-12 text-lg font-semibold">
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
					
					{/* Boutons à droite */}
					<div className="flex items-center gap-6">
							{/* Menu déroulant Paramètres */}
							<div className="relative">
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex items-center gap-2 px-4 py-3 text-lg font-semibold hover:text-afriviral-blue-300 transition-all duration-300 rounded-xl hover:bg-white/10"
								>
									<Cog6ToothIcon className="h-6 w-6" />
									<ChevronDownIcon className="h-5 w-5" />
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
							
							<Link href="/login" className="btn-outline px-6 py-3 text-lg font-semibold rounded-xl">
								Connexion
							</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}


