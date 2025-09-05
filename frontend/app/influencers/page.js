"use client";

import { useState } from "react";
import { 
	MagnifyingGlassIcon,
	FunnelIcon,
	StarIcon,
	UserGroupIcon,
	EyeIcon,
	ChatBubbleLeftRightIcon,
	HeartIcon,
	ShareIcon,
	PlusIcon,
	CheckCircleIcon,
	ClockIcon,
	XCircleIcon
} from "@heroicons/react/24/outline";

export default function InfluencersPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("all");
	const [filterPlatform, setFilterPlatform] = useState("all");

	const influencers = [
		{
			id: 1,
			name: "Fatou Diallo",
			username: "@fatou_beauty",
			platforms: ["Instagram", "TikTok"],
			category: "Beauté",
			followers: 45000,
			engagement: 4.8,
			rating: 4.9,
			location: "Abidjan, Côte d'Ivoire",
			price: 150000,
			status: "available",
			avatar: "FD",
			description: "Influenceuse beauté spécialisée dans le maquillage et les soins de la peau africaine",
			lastCollaboration: "2024-01-15",
			totalCollaborations: 12,
			verified: true
		},
		{
			id: 2,
			name: "Kouassi Jean",
			username: "@jean_tech",
			platforms: ["YouTube", "Instagram"],
			category: "Tech",
			followers: 78000,
			engagement: 3.2,
			rating: 4.7,
			location: "Lagos, Nigeria",
			price: 200000,
			status: "busy",
			avatar: "KJ",
			description: "Expert tech et gaming, spécialisé dans les reviews de smartphones et gadgets",
			lastCollaboration: "2024-01-10",
			totalCollaborations: 8,
			verified: true
		},
		{
			id: 3,
			name: "Aïcha Traoré",
			username: "@aicha_fashion",
			platforms: ["Instagram", "TikTok", "Facebook"],
			category: "Mode",
			followers: 120000,
			engagement: 5.5,
			rating: 4.8,
			location: "Dakar, Sénégal",
			price: 300000,
			status: "available",
			avatar: "AT",
			description: "Styliste et influenceuse mode, créatrice de contenu lifestyle et fashion",
			lastCollaboration: "2024-01-20",
			totalCollaborations: 25,
			verified: true
		},
		{
			id: 4,
			name: "Mohamed Camara",
			username: "@momo_food",
			platforms: ["Instagram", "TikTok"],
			category: "Cuisine",
			followers: 65000,
			engagement: 6.2,
			rating: 4.9,
			location: "Bamako, Mali",
			price: 180000,
			status: "available",
			avatar: "MC",
			description: "Chef cuisinier et influenceur culinaire, spécialisé dans la cuisine africaine traditionnelle",
			lastCollaboration: "2024-01-18",
			totalCollaborations: 15,
			verified: false
		},
		{
			id: 5,
			name: "Grace Okafor",
			username: "@grace_lifestyle",
			platforms: ["Instagram", "YouTube"],
			category: "Lifestyle",
			followers: 95000,
			engagement: 4.1,
			rating: 4.6,
			location: "Accra, Ghana",
			price: 220000,
			status: "busy",
			avatar: "GO",
			description: "Influenceuse lifestyle et bien-être, partage des conseils pour une vie équilibrée",
			lastCollaboration: "2024-01-12",
			totalCollaborations: 18,
			verified: true
		},
		{
			id: 6,
			name: "Ibrahim Sarr",
			username: "@ibrahim_sport",
			platforms: ["Instagram", "TikTok"],
			category: "Sport",
			followers: 35000,
			engagement: 7.8,
			rating: 4.9,
			location: "Ouagadougou, Burkina Faso",
			price: 120000,
			status: "available",
			avatar: "IS",
			description: "Athlète et coach fitness, spécialisé dans l'entraînement et la motivation sportive",
			lastCollaboration: "2024-01-08",
			totalCollaborations: 6,
			verified: false
		}
	];

	const categories = ["all", "Beauté", "Tech", "Mode", "Cuisine", "Lifestyle", "Sport"];
	const platforms = ["all", "Instagram", "TikTok", "YouTube", "Facebook"];

	const getStatusColor = (status) => {
		switch (status) {
			case "available":
				return "bg-green-100 text-green-800";
			case "busy":
				return "bg-yellow-100 text-yellow-800";
			case "unavailable":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusText = (status) => {
		switch (status) {
			case "available":
				return "Disponible";
			case "busy":
				return "Occupé";
			case "unavailable":
				return "Indisponible";
			default:
				return "Inconnu";
		}
	};

	const filteredInfluencers = influencers.filter(influencer => {
		const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
							influencer.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = filterCategory === "all" || influencer.category === filterCategory;
		const matchesPlatform = filterPlatform === "all" || influencer.platforms.includes(filterPlatform);
		
		return matchesSearch && matchesCategory && matchesPlatform;
	});

	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
					<div>
						<h1 className="text-4xl font-bold text-gray-900 mb-2">Influenceurs</h1>
						<p className="text-gray-600">Découvrez et collaborez avec nos influenceurs partenaires</p>
					</div>
					<button className="btn-gradient px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-4 sm:mt-0">
						<PlusIcon className="h-5 w-5 mr-2" />
						Inviter un Influenceur
					</button>
				</div>

				{/* Statistiques */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-white rounded-2xl p-6 shadow-lg">
						<div className="flex items-center">
							<div className="p-3 bg-gradient-blue rounded-xl">
								<UserGroupIcon className="h-6 w-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Total Influenceurs</p>
								<p className="text-2xl font-bold text-gray-900">{influencers.length}</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-2xl p-6 shadow-lg">
						<div className="flex items-center">
							<div className="p-3 bg-gradient-orange rounded-xl">
								<CheckCircleIcon className="h-6 w-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Disponibles</p>
								<p className="text-2xl font-bold text-gray-900">{influencers.filter(i => i.status === "available").length}</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-2xl p-6 shadow-lg">
						<div className="flex items-center">
							<div className="p-3 bg-gradient-primary rounded-xl">
								<StarIcon className="h-6 w-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Note Moyenne</p>
								<p className="text-2xl font-bold text-gray-900">4.8</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-2xl p-6 shadow-lg">
						<div className="flex items-center">
							<div className="p-3 bg-green-500 rounded-xl">
								<EyeIcon className="h-6 w-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Portée Totale</p>
								<p className="text-2xl font-bold text-gray-900">438K</p>
							</div>
						</div>
					</div>
				</div>

				{/* Filtres et Recherche */}
				<div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
					<div className="flex flex-col lg:flex-row gap-4">
						{/* Recherche */}
						<div className="flex-1">
							<div className="relative">
								<MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Rechercher un influenceur..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
								/>
							</div>
						</div>
						
						{/* Filtre Catégorie */}
						<div className="lg:w-48">
							<select
								value={filterCategory}
								onChange={(e) => setFilterCategory(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
							>
								{categories.map(category => (
									<option key={category} value={category}>
										{category === "all" ? "Toutes les catégories" : category}
									</option>
								))}
							</select>
						</div>
						
						{/* Filtre Plateforme */}
						<div className="lg:w-48">
							<select
								value={filterPlatform}
								onChange={(e) => setFilterPlatform(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
							>
								{platforms.map(platform => (
									<option key={platform} value={platform}>
										{platform === "all" ? "Toutes les plateformes" : platform}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Liste des Influenceurs */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredInfluencers.map((influencer) => (
						<div key={influencer.id} className="bg-white rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
							{/* Header de la carte */}
							<div className="flex items-start justify-between mb-4">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
										<span className="text-white font-bold text-lg">{influencer.avatar}</span>
									</div>
									<div>
										<div className="flex items-center gap-2">
											<h3 className="font-bold text-gray-900">{influencer.name}</h3>
											{influencer.verified && (
												<CheckCircleIcon className="h-5 w-5 text-blue-500" />
											)}
										</div>
										<p className="text-sm text-gray-600">{influencer.username}</p>
									</div>
								</div>
								<div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(influencer.status)}`}>
									{getStatusText(influencer.status)}
								</div>
							</div>

							{/* Description */}
							<p className="text-gray-600 text-sm mb-4 line-clamp-2">{influencer.description}</p>

							{/* Plateformes */}
							<div className="flex flex-wrap gap-2 mb-4">
								{influencer.platforms.map((platform, index) => (
									<span key={index} className="px-2 py-1 bg-afriviral-blue-100 text-afriviral-blue text-xs font-medium rounded-full">
										{platform}
									</span>
								))}
							</div>

							{/* Métriques */}
							<div className="grid grid-cols-2 gap-4 mb-4">
								<div className="text-center">
									<p className="text-lg font-bold text-gray-900">{influencer.followers.toLocaleString()}</p>
									<p className="text-xs text-gray-600">Abonnés</p>
								</div>
								<div className="text-center">
									<p className="text-lg font-bold text-afriviral-orange">{influencer.engagement}%</p>
									<p className="text-xs text-gray-600">Engagement</p>
								</div>
								<div className="text-center">
									<div className="flex items-center justify-center gap-1">
										<StarIcon className="h-4 w-4 text-yellow-500" />
										<span className="text-lg font-bold text-gray-900">{influencer.rating}</span>
									</div>
									<p className="text-xs text-gray-600">Note</p>
								</div>
								<div className="text-center">
									<p className="text-lg font-bold text-green-600">{influencer.price.toLocaleString()} FCFA</p>
									<p className="text-xs text-gray-600">Prix</p>
								</div>
							</div>

							{/* Localisation */}
							<div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
								<span>📍 {influencer.location}</span>
							</div>

							{/* Actions */}
							<div className="flex gap-2">
								<button className="flex-1 btn-primary py-2 text-sm font-medium">
									<ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
									Contacter
								</button>
								<button className="flex-1 btn-outline py-2 text-sm font-medium">
									<EyeIcon className="h-4 w-4 mr-2" />
									Voir Profil
								</button>
							</div>

							{/* Stats de collaboration */}
							<div className="mt-4 pt-4 border-t border-gray-100">
								<div className="flex justify-between text-xs text-gray-500">
									<span>Dernière collaboration: {new Date(influencer.lastCollaboration).toLocaleDateString('fr-FR')}</span>
									<span>{influencer.totalCollaborations} collabs</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Message si aucun influenceur */}
				{filteredInfluencers.length === 0 && (
					<div className="text-center py-12">
						<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<UserGroupIcon className="h-12 w-12 text-gray-400" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun influenceur trouvé</h3>
						<p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
					</div>
				)}
			</div>
		</div>
	);
}
