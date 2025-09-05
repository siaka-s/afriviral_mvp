"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	UserGroupIcon,
	MegaphoneIcon,
	CurrencyDollarIcon,
	ChartBarIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	EyeIcon,
	HeartIcon,
	ChatBubbleLeftRightIcon,
	ShareIcon,
	PlusIcon,
	ArrowTrendingUpIcon,
	BuildingOfficeIcon
} from "@heroicons/react/24/outline";

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }) => {
	const getColorClasses = (color) => {
		switch (color) {
			case "blue":
				return {
					bg: "bg-blue-100",
					text: "text-blue-600"
				};
			case "green":
				return {
					bg: "bg-green-100",
					text: "text-green-600"
				};
			case "orange":
				return {
					bg: "bg-orange-100",
					text: "text-orange-600"
				};
			case "purple":
				return {
					bg: "bg-purple-100",
					text: "text-purple-600"
				};
			default:
				return {
					bg: "bg-blue-100",
					text: "text-blue-600"
				};
		}
	};

	const colorClasses = getColorClasses(color);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
		>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
					<p className="text-3xl font-bold text-gray-900">{value}</p>
					{subtitle && (
						<p className="text-sm text-gray-500 mt-1">{subtitle}</p>
					)}
				</div>
				<div className={`p-3 rounded-xl ${colorClasses.bg}`}>
					<Icon className={`h-6 w-6 ${colorClasses.text}`} />
				</div>
			</div>
			{trend && (
				<div className={`flex items-center mt-3 text-sm ${
					trend > 0 ? "text-green-600" : "text-red-600"
				}`}>
					{trend > 0 ? (
						<ArrowUpIcon className="h-4 w-4 mr-1" />
					) : (
						<ArrowDownIcon className="h-4 w-4 mr-1" />
					)}
					{Math.abs(trend)}% vs mois dernier
				</div>
			)}
		</motion.div>
	);
};

export default function DashboardPage() {
	const [userType, setUserType] = useState("pme");

	// Données fictives simplifiées
	const pmeStats = {
		overview: {
			campagnesActives: 8,
			campagnesTotal: 24,
			influenceursCollabores: 156,
			budgetTotal: 2450000,
			budgetDepense: 1890000,
			roi: 340,
			engagementMoyen: 4.7,
			porteeTotale: 2840000,
			clics: 45600,
			conversions: 2340
		}
	};

	const influenceurStats = {
		overview: {
			campagnesActives: 3,
			campagnesTotal: 18,
			revenusTotal: 1250000,
			revenusMois: 180000,
			engagementMoyen: 5.4,
			followersTotal: 89000,
			porteeMoyenne: 125000,
			clics: 8900,
			conversions: 234
		}
	};

	const currentStats = userType === "pme" ? pmeStats : influenceurStats;

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'XOF',
			minimumFractionDigits: 0
		}).format(amount);
	};

	const formatNumber = (num) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		}
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Tableau de Bord
						</h1>
						<p className="text-gray-600">
							Bienvenue sur votre espace AfriViral
						</p>
					</div>
					
					{/* Type Selector */}
					<div className="flex items-center gap-4 mt-4 sm:mt-0">
						<div className="flex bg-gray-100 rounded-xl p-1">
							<button
								onClick={() => setUserType("pme")}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									userType === "pme"
										? "bg-white text-blue-600 shadow-sm"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								<BuildingOfficeIcon className="h-4 w-4 inline mr-2" />
								PME
							</button>
							<button
								onClick={() => setUserType("influenceur")}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									userType === "influenceur"
										? "bg-white text-orange-600 shadow-sm"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								<UserGroupIcon className="h-4 w-4 inline mr-2" />
								Influenceur
							</button>
						</div>
					</div>
				</div>

				{/* Stats Overview */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{userType === "pme" ? (
						<>
							<StatCard
								title="Campagnes Actives"
								value={currentStats.overview.campagnesActives}
								subtitle={`${currentStats.overview.campagnesTotal} au total`}
								icon={MegaphoneIcon}
								trend={12}
								color="blue"
							/>
							<StatCard
								title="Influenceurs Collaborés"
								value={formatNumber(currentStats.overview.influenceursCollabores)}
								subtitle="Ce mois"
								icon={UserGroupIcon}
								trend={8}
								color="green"
							/>
							<StatCard
								title="Budget Dépensé"
								value={formatCurrency(currentStats.overview.budgetDepense)}
								subtitle={`sur ${formatCurrency(currentStats.overview.budgetTotal)}`}
								icon={CurrencyDollarIcon}
								trend={-5}
								color="orange"
							/>
							<StatCard
								title="ROI Moyen"
								value={`${currentStats.overview.roi}%`}
								subtitle="Retour sur investissement"
								icon={ArrowTrendingUpIcon}
								trend={15}
								color="purple"
							/>
						</>
					) : (
						<>
							<StatCard
								title="Campagnes Actives"
								value={currentStats.overview.campagnesActives}
								subtitle={`${currentStats.overview.campagnesTotal} au total`}
								icon={MegaphoneIcon}
								trend={25}
								color="blue"
							/>
							<StatCard
								title="Revenus ce Mois"
								value={formatCurrency(currentStats.overview.revenusMois)}
								subtitle={`${formatCurrency(currentStats.overview.revenusTotal)} total`}
								icon={CurrencyDollarIcon}
								trend={18}
								color="green"
							/>
							<StatCard
								title="Followers Total"
								value={formatNumber(currentStats.overview.followersTotal)}
								subtitle="Tous réseaux"
								icon={UserGroupIcon}
								trend={12}
								color="purple"
							/>
							<StatCard
								title="Engagement Moyen"
								value={`${currentStats.overview.engagementMoyen}%`}
								subtitle="Performance globale"
								icon={ChartBarIcon}
								trend={8}
								color="orange"
							/>
						</>
					)}
				</div>

				{/* Performance Metrics */}
				<div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Métriques de Performance
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center p-4 bg-gray-50 rounded-xl">
							<EyeIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
							<p className="text-2xl font-bold text-gray-900">
								{formatNumber(currentStats.overview.porteeTotale || currentStats.overview.porteeMoyenne)}
							</p>
							<p className="text-sm text-gray-600">Portée</p>
						</div>
						<div className="text-center p-4 bg-gray-50 rounded-xl">
							<HeartIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
							<p className="text-2xl font-bold text-gray-900">
								{currentStats.overview.engagementMoyen}%
							</p>
							<p className="text-sm text-gray-600">Engagement</p>
						</div>
						<div className="text-center p-4 bg-gray-50 rounded-xl">
							<ChatBubbleLeftRightIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
							<p className="text-2xl font-bold text-gray-900">
								{formatNumber(currentStats.overview.clics)}
							</p>
							<p className="text-sm text-gray-600">Clics</p>
						</div>
						<div className="text-center p-4 bg-gray-50 rounded-xl">
							<ShareIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
							<p className="text-2xl font-bold text-gray-900">
								{formatNumber(currentStats.overview.conversions)}
							</p>
							<p className="text-sm text-gray-600">Conversions</p>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Actions Rapides
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<button className="btn-gradient py-4 px-6 rounded-xl text-white font-medium flex items-center justify-center">
							<PlusIcon className="h-5 w-5 mr-2" />
							Nouvelle Campagne
						</button>
						<button className="btn-outline py-4 px-6 rounded-xl font-medium">
							Voir Influenceurs
						</button>
						<button className="btn-outline py-4 px-6 rounded-xl font-medium">
							Analytics
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}