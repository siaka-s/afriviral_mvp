"use client";

import { useState } from "react";
import { 
	PlusIcon, 
	EyeIcon, 
	PencilIcon, 
	TrashIcon,
	PlayIcon,
	PauseIcon,
	CheckCircleIcon,
	ClockIcon,
	XCircleIcon,
	ChartBarIcon,
	UsersIcon,
	CurrencyDollarIcon
} from "@heroicons/react/24/outline";

export default function CampaignsPage() {
	const [filter, setFilter] = useState("all");
	
	const campaigns = [
		{
			id: 1,
			title: "Lancement Nouveau Smartphone",
			status: "active",
			budget: 450000,
			spent: 320000,
			influencers: 8,
			reach: 125000,
			engagement: 4.2,
			startDate: "2024-01-15",
			endDate: "2024-02-15",
			platforms: ["Instagram", "TikTok"],
			description: "Campagne de lancement pour notre nouveau smartphone avec focus sur les jeunes urbains"
		},
		{
			id: 2,
			title: "Collection Mode Printemps",
			status: "completed",
			budget: 280000,
			spent: 280000,
			influencers: 5,
			reach: 89000,
			engagement: 5.8,
			startDate: "2024-01-01",
			endDate: "2024-01-31",
			platforms: ["Instagram", "Facebook"],
			description: "Promotion de la collection printemps avec des influenceurs mode"
		},
		{
			id: 3,
			title: "Restaurant Delivery",
			status: "paused",
			budget: 150000,
			spent: 75000,
			influencers: 3,
			reach: 45000,
			engagement: 3.1,
			startDate: "2024-02-01",
			endDate: "2024-02-28",
			platforms: ["Instagram", "TikTok"],
			description: "Promotion du service de livraison de notre restaurant"
		},
		{
			id: 4,
			title: "Formation en Ligne",
			status: "draft",
			budget: 200000,
			spent: 0,
			influencers: 0,
			reach: 0,
			engagement: 0,
			startDate: "2024-03-01",
			endDate: "2024-03-31",
			platforms: ["YouTube", "Instagram"],
			description: "Promotion de nos cours de formation en ligne"
		}
	];

	const getStatusIcon = (status) => {
		switch (status) {
			case "active":
				return <PlayIcon className="h-5 w-5 text-green-500" />;
			case "completed":
				return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
			case "paused":
				return <PauseIcon className="h-5 w-5 text-yellow-500" />;
			case "draft":
				return <ClockIcon className="h-5 w-5 text-gray-500" />;
			default:
				return <XCircleIcon className="h-5 w-5 text-red-500" />;
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800";
			case "completed":
				return "bg-blue-100 text-blue-800";
			case "paused":
				return "bg-yellow-100 text-yellow-800";
			case "draft":
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-red-100 text-red-800";
		}
	};

	const getStatusText = (status) => {
		switch (status) {
			case "active":
				return "Active";
			case "completed":
				return "Terminée";
			case "paused":
				return "En pause";
			case "draft":
				return "Brouillon";
			default:
				return "Erreur";
		}
	};

	const filteredCampaigns = campaigns.filter(campaign => 
		filter === "all" || campaign.status === filter
	);

	const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
	const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
	const totalInfluencers = campaigns.reduce((sum, campaign) => sum + campaign.influencers, 0);
	const totalReach = campaigns.reduce((sum, campaign) => sum + campaign.reach, 0);

	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
					<div>
						<h1 className="text-4xl font-bold text-gray-900 mb-2">Mes Campagnes</h1>
						<p className="text-gray-600">Gérez et suivez vos campagnes d'influence</p>
					</div>
					<button className="btn-gradient px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-4 sm:mt-0">
						<PlusIcon className="h-5 w-5 mr-2" />
						Nouvelle Campagne
					</button>
				</div>

				{/* Statistiques */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-white rounded-2xl p-6 shadow-lg">
						<div className="flex items-center">
							<div className="p-3 bg-gradient-blue rounded-xl">
								<ChartBarIcon className="h-6 w-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Budget Total</p>
								<p className="text-2xl font-bold text-gray-900">{totalBudget.toLocaleString()} FCFA</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-2xl p-6 shadow-lg">
						<div className="flex items-center">
							<div className="p-3 bg-gradient-orange rounded-xl">
								<CurrencyDollarIcon className="h-6 w-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Dépensé</p>
								<p className="text-2xl font-bold text-gray-900">{totalSpent.toLocaleString()} FCFA</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-2xl p-6 shadow-lg">
						<div className="flex items-center">
							<div className="p-3 bg-gradient-primary rounded-xl">
								<UsersIcon className="h-6 w-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Influenceurs</p>
								<p className="text-2xl font-bold text-gray-900">{totalInfluencers}</p>
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
								<p className="text-2xl font-bold text-gray-900">{totalReach.toLocaleString()}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Filtres */}
				<div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
					<div className="flex flex-wrap gap-4">
						<button
							onClick={() => setFilter("all")}
							className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
								filter === "all" 
									? "bg-gradient-primary text-white" 
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Toutes ({campaigns.length})
						</button>
						<button
							onClick={() => setFilter("active")}
							className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
								filter === "active" 
									? "bg-green-500 text-white" 
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Actives ({campaigns.filter(c => c.status === "active").length})
						</button>
						<button
							onClick={() => setFilter("completed")}
							className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
								filter === "completed" 
									? "bg-blue-500 text-white" 
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Terminées ({campaigns.filter(c => c.status === "completed").length})
						</button>
						<button
							onClick={() => setFilter("draft")}
							className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
								filter === "draft" 
									? "bg-gray-500 text-white" 
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Brouillons ({campaigns.filter(c => c.status === "draft").length})
						</button>
					</div>
				</div>

				{/* Liste des Campagnes */}
				<div className="space-y-6">
					{filteredCampaigns.map((campaign) => (
						<div key={campaign.id} className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
							<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										{campaign.platforms.map((platform, index) => (
											<span key={index} className="px-3 py-1 bg-afriviral-blue-100 text-afriviral-blue text-sm font-medium rounded-full">
												{platform}
											</span>
										))}
									</div>
									<h3 className="text-2xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
									<p className="text-gray-600 mb-4">{campaign.description}</p>
									<div className="flex items-center gap-4 text-sm text-gray-500">
										<span>Du {new Date(campaign.startDate).toLocaleDateString('fr-FR')}</span>
										<span>•</span>
										<span>Au {new Date(campaign.endDate).toLocaleDateString('fr-FR')}</span>
									</div>
								</div>
								<div className="flex items-center gap-4 mt-4 lg:mt-0">
									<div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${getStatusColor(campaign.status)}`}>
										{getStatusIcon(campaign.status)}
										{getStatusText(campaign.status)}
									</div>
									<div className="flex gap-2">
										<button className="p-2 text-gray-400 hover:text-afriviral-blue hover:bg-afriviral-blue-50 rounded-xl transition-all duration-200">
											<EyeIcon className="h-5 w-5" />
										</button>
										<button className="p-2 text-gray-400 hover:text-afriviral-orange hover:bg-afriviral-orange-50 rounded-xl transition-all duration-200">
											<PencilIcon className="h-5 w-5" />
										</button>
										<button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200">
											<TrashIcon className="h-5 w-5" />
										</button>
									</div>
								</div>
							</div>

							{/* Métriques */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
								<div className="text-center">
									<p className="text-2xl font-bold text-gray-900">{campaign.budget.toLocaleString()} FCFA</p>
									<p className="text-sm text-gray-600">Budget</p>
								</div>
								<div className="text-center">
									<p className="text-2xl font-bold text-afriviral-blue">{campaign.spent.toLocaleString()} FCFA</p>
									<p className="text-sm text-gray-600">Dépensé</p>
								</div>
								<div className="text-center">
									<p className="text-2xl font-bold text-afriviral-orange">{campaign.influencers}</p>
									<p className="text-sm text-gray-600">Influenceurs</p>
								</div>
								<div className="text-center">
									<p className="text-2xl font-bold text-green-600">{campaign.reach.toLocaleString()}</p>
									<p className="text-sm text-gray-600">Portée</p>
								</div>
							</div>

							{/* Barre de progression du budget */}
							{campaign.status !== "draft" && (
								<div className="mt-6">
									<div className="flex justify-between text-sm text-gray-600 mb-2">
										<span>Progression du budget</span>
										<span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-3">
										<div 
											className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
											style={{width: `${(campaign.spent / campaign.budget) * 100}%`}}
										></div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Message si aucune campagne */}
				{filteredCampaigns.length === 0 && (
					<div className="text-center py-12">
						<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<ChartBarIcon className="h-12 w-12 text-gray-400" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune campagne trouvée</h3>
						<p className="text-gray-600 mb-6">Commencez par créer votre première campagne d'influence</p>
						<button className="btn-gradient px-6 py-3 text-lg font-semibold rounded-xl">
							<PlusIcon className="h-5 w-5 mr-2" />
							Créer une Campagne
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
