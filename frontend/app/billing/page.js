"use client";

import { useState } from "react";
import { 
	CurrencyDollarIcon,
	DocumentTextIcon,
	ArrowDownTrayIcon,
	EyeIcon,
	CreditCardIcon,
	BanknotesIcon,
	ChartBarIcon,
	CalendarIcon,
	CheckCircleIcon,
	ClockIcon,
	XCircleIcon,
	PlusCircleIcon
} from "@heroicons/react/24/outline";

export default function BillingPage() {
	const [activeTab, setActiveTab] = useState("overview");
	const [selectedPeriod, setSelectedPeriod] = useState("2024");

	const transactions = [
		{
			id: 1,
			date: "2024-01-20",
			description: "Campagne - Lancement Nouveau Smartphone",
			amount: 320000,
			status: "completed",
			type: "campaign",
			influencers: 8,
			reference: "CAMP-2024-001"
		},
		{
			id: 2,
			date: "2024-01-15",
			description: "Campagne - Collection Mode Printemps",
			amount: 280000,
			status: "completed",
			type: "campaign",
			influencers: 5,
			reference: "CAMP-2024-002"
		},
		{
			id: 3,
			date: "2024-01-10",
			description: "Frais de Plateforme - Janvier 2024",
			amount: 25000,
			status: "completed",
			type: "fee",
			influencers: 0,
			reference: "FEE-2024-001"
		},
		{
			id: 4,
			date: "2024-01-05",
			description: "Campagne - Restaurant Delivery",
			amount: 75000,
			status: "pending",
			type: "campaign",
			influencers: 3,
			reference: "CAMP-2024-003"
		},
		{
			id: 5,
			date: "2023-12-28",
			description: "Remboursement - Annulation Campagne",
			amount: -50000,
			status: "completed",
			type: "refund",
			influencers: 0,
			reference: "REF-2023-001"
		}
	];

	const invoices = [
		{
			id: "INV-2024-001",
			date: "2024-01-20",
			amount: 320000,
			status: "paid",
			dueDate: "2024-01-20",
			downloadUrl: "#"
		},
		{
			id: "INV-2024-002",
			date: "2024-01-15",
			amount: 280000,
			status: "paid",
			dueDate: "2024-01-15",
			downloadUrl: "#"
		},
		{
			id: "INV-2024-003",
			date: "2024-01-10",
			amount: 25000,
			status: "paid",
			dueDate: "2024-01-10",
			downloadUrl: "#"
		},
		{
			id: "INV-2024-004",
			date: "2024-01-05",
			amount: 75000,
			status: "pending",
			dueDate: "2024-02-05",
			downloadUrl: "#"
		}
	];

	const stats = {
		totalSpent: 2450000,
		thisMonth: 675000,
		lastMonth: 580000,
		averagePerCampaign: 204167,
		totalCampaigns: 12,
		activeCampaigns: 3,
		pendingAmount: 75000
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case "completed":
			case "paid":
				return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
			case "pending":
				return <ClockIcon className="h-5 w-5 text-yellow-500" />;
			case "failed":
			case "cancelled":
				return <XCircleIcon className="h-5 w-5 text-red-500" />;
			default:
				return <ClockIcon className="h-5 w-5 text-gray-500" />;
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "completed":
			case "paid":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "failed":
			case "cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusText = (status) => {
		switch (status) {
			case "completed":
				return "Terminé";
			case "paid":
				return "Payé";
			case "pending":
				return "En attente";
			case "failed":
				return "Échec";
			case "cancelled":
				return "Annulé";
			default:
				return "Inconnu";
		}
	};

	const tabs = [
		{ id: "overview", name: "Aperçu", icon: ChartBarIcon },
		{ id: "transactions", name: "Transactions", icon: DocumentTextIcon },
		{ id: "invoices", name: "Factures", icon: CreditCardIcon },
		{ id: "payment", name: "Moyens de Paiement", icon: BanknotesIcon }
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
					<div>
						<h1 className="text-4xl font-bold text-gray-900 mb-2">Facturation</h1>
						<p className="text-gray-600">Gérez vos paiements et factures</p>
					</div>
					<div className="flex gap-4 mt-4 sm:mt-0">
						<select
							value={selectedPeriod}
							onChange={(e) => setSelectedPeriod(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
						>
							<option value="2024">2024</option>
							<option value="2023">2023</option>
							<option value="2022">2022</option>
						</select>
						<button className="btn-outline px-4 py-2 text-sm">
							<ArrowDownTrayIcon className="h-4 w-4 mr-2" />
							Exporter
						</button>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
					<nav className="flex space-x-1">
						{tabs.map((tab) => {
							const Icon = tab.icon;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
										activeTab === tab.id
											? 'bg-gradient-primary text-white shadow-lg'
											: 'text-gray-700 hover:bg-gray-100'
									}`}
								>
									<Icon className="h-5 w-5" />
									{tab.name}
								</button>
							);
						})}
					</nav>
				</div>

				{/* Aperçu */}
				{activeTab === "overview" && (
					<div className="space-y-8">
						{/* Statistiques */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="bg-white rounded-2xl p-6 shadow-lg">
								<div className="flex items-center">
									<div className="p-3 bg-gradient-blue rounded-xl">
										<CurrencyDollarIcon className="h-6 w-6 text-white" />
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-gray-600">Total Dépensé</p>
										<p className="text-2xl font-bold text-gray-900">{stats.totalSpent.toLocaleString()} FCFA</p>
									</div>
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg">
								<div className="flex items-center">
									<div className="p-3 bg-gradient-orange rounded-xl">
										<CalendarIcon className="h-6 w-6 text-white" />
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-gray-600">Ce Mois</p>
										<p className="text-2xl font-bold text-gray-900">{stats.thisMonth.toLocaleString()} FCFA</p>
									</div>
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg">
								<div className="flex items-center">
									<div className="p-3 bg-gradient-primary rounded-xl">
										<ChartBarIcon className="h-6 w-6 text-white" />
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-gray-600">Moyenne/Campagne</p>
										<p className="text-2xl font-bold text-gray-900">{stats.averagePerCampaign.toLocaleString()} FCFA</p>
									</div>
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg">
								<div className="flex items-center">
									<div className="p-3 bg-green-500 rounded-xl">
										<CheckCircleIcon className="h-6 w-6 text-white" />
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-gray-600">Campagnes Actives</p>
										<p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
									</div>
								</div>
							</div>
						</div>

						{/* Graphique des Dépenses */}
						<div className="bg-white rounded-3xl shadow-2xl p-8">
							<h3 className="text-xl font-bold text-gray-900 mb-6">Évolution des Dépenses</h3>
							<div className="h-64 bg-gray-50 rounded-2xl flex items-center justify-center">
								<p className="text-gray-500">Graphique des dépenses par mois (à implémenter)</p>
							</div>
						</div>

						{/* Alertes */}
						{stats.pendingAmount > 0 && (
							<div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
								<div className="flex items-center gap-3">
									<ClockIcon className="h-6 w-6 text-yellow-600" />
									<div>
										<h3 className="font-semibold text-yellow-900">Paiement en Attente</h3>
										<p className="text-yellow-700">
											Vous avez {stats.pendingAmount.toLocaleString()} FCFA de paiements en attente.
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				)}

				{/* Transactions */}
				{activeTab === "transactions" && (
					<div className="bg-white rounded-3xl shadow-2xl p-8">
						<h3 className="text-xl font-bold text-gray-900 mb-6">Historique des Transactions</h3>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left py-4 px-2 font-semibold text-gray-900">Date</th>
										<th className="text-left py-4 px-2 font-semibold text-gray-900">Description</th>
										<th className="text-left py-4 px-2 font-semibold text-gray-900">Montant</th>
										<th className="text-left py-4 px-2 font-semibold text-gray-900">Statut</th>
										<th className="text-left py-4 px-2 font-semibold text-gray-900">Actions</th>
									</tr>
								</thead>
								<tbody>
									{transactions.map((transaction) => (
										<tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
											<td className="py-4 px-2 text-sm text-gray-600">
												{new Date(transaction.date).toLocaleDateString('fr-FR')}
											</td>
											<td className="py-4 px-2">
												<div>
													<p className="font-medium text-gray-900">{transaction.description}</p>
													<p className="text-sm text-gray-500">Ref: {transaction.reference}</p>
													{transaction.influencers > 0 && (
														<p className="text-xs text-gray-400">{transaction.influencers} influenceur(s)</p>
													)}
												</div>
											</td>
											<td className="py-4 px-2">
												<span className={`font-semibold ${transaction.amount > 0 ? 'text-red-600' : 'text-green-600'}`}>
													{transaction.amount > 0 ? '-' : '+'}{Math.abs(transaction.amount).toLocaleString()} FCFA
												</span>
											</td>
											<td className="py-4 px-2">
												<div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
													{getStatusIcon(transaction.status)}
													{getStatusText(transaction.status)}
												</div>
											</td>
											<td className="py-4 px-2">
												<div className="flex gap-2">
													<button className="p-2 text-gray-400 hover:text-afriviral-blue hover:bg-afriviral-blue-50 rounded-xl transition-all duration-200">
														<EyeIcon className="h-4 w-4" />
													</button>
													<button className="p-2 text-gray-400 hover:text-afriviral-orange hover:bg-afriviral-orange-50 rounded-xl transition-all duration-200">
														<ArrowDownTrayIcon className="h-4 w-4" />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* Factures */}
				{activeTab === "invoices" && (
					<div className="space-y-6">
						{invoices.map((invoice) => (
							<div key={invoice.id} className="bg-white rounded-3xl shadow-2xl p-6">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="p-3 bg-gradient-primary rounded-xl">
											<DocumentTextIcon className="h-6 w-6 text-white" />
										</div>
										<div>
											<h3 className="font-bold text-gray-900">{invoice.id}</h3>
											<p className="text-sm text-gray-600">
												Émise le {new Date(invoice.date).toLocaleDateString('fr-FR')}
											</p>
											<p className="text-sm text-gray-600">
												Échéance: {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="text-right">
											<p className="text-2xl font-bold text-gray-900">{invoice.amount.toLocaleString()} FCFA</p>
											<div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
												{getStatusIcon(invoice.status)}
												{getStatusText(invoice.status)}
											</div>
										</div>
										<div className="flex gap-2">
											<button className="btn-outline px-4 py-2 text-sm">
												<EyeIcon className="h-4 w-4 mr-2" />
												Voir
											</button>
											<button className="btn-primary px-4 py-2 text-sm">
												<ArrowDownTrayIcon className="h-4 w-4 mr-2" />
												Télécharger
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Moyens de Paiement */}
				{activeTab === "payment" && (
					<div className="space-y-6">
						<div className="bg-white rounded-3xl shadow-2xl p-8">
							<h3 className="text-xl font-bold text-gray-900 mb-6">Moyens de Paiement</h3>
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl">
									<div className="flex items-center gap-4">
										<div className="p-3 bg-blue-100 rounded-xl">
											<CreditCardIcon className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<p className="font-semibold text-gray-900">Carte Visa •••• 4242</p>
											<p className="text-sm text-gray-600">Expire le 12/25</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
											Par défaut
										</span>
										<button className="btn-outline px-4 py-2 text-sm">
											Modifier
										</button>
									</div>
								</div>
								<div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl">
									<div className="flex items-center gap-4">
										<div className="p-3 bg-orange-100 rounded-xl">
											<BanknotesIcon className="h-6 w-6 text-orange-600" />
										</div>
										<div>
											<p className="font-semibold text-gray-900">Mobile Money (Orange Money)</p>
											<p className="text-sm text-gray-600">+225 07 12 34 56 78</p>
										</div>
									</div>
									<button className="btn-outline px-4 py-2 text-sm">
										Modifier
									</button>
								</div>
								<button className="w-full btn-outline py-4 text-lg font-semibold">
									<PlusCircleIcon className="h-5 w-5 mr-2" />
									Ajouter un Moyen de Paiement
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
