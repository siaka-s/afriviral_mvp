"use client";

import { useState } from "react";
import { 
	QuestionMarkCircleIcon,
	MagnifyingGlassIcon,
	ChatBubbleLeftRightIcon,
	PhoneIcon,
	EnvelopeIcon,
	DocumentTextIcon,
	BookOpenIcon,
	LightBulbIcon,
	ExclamationTriangleIcon,
	CheckCircleIcon,
	ArrowRightIcon,
	PlusIcon
} from "@heroicons/react/24/outline";

export default function HelpPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [openFAQ, setOpenFAQ] = useState(null);

	const categories = [
		{ id: "all", name: "Toutes les catégories", icon: BookOpenIcon },
		{ id: "getting-started", name: "Premiers pas", icon: LightBulbIcon },
		{ id: "campaigns", name: "Campagnes", icon: DocumentTextIcon },
		{ id: "influencers", name: "Influenceurs", icon: ChatBubbleLeftRightIcon },
		{ id: "billing", name: "Facturation", icon: QuestionMarkCircleIcon },
		{ id: "technical", name: "Problèmes techniques", icon: ExclamationTriangleIcon }
	];

	const faqs = [
		{
			id: 1,
			question: "Comment créer ma première campagne ?",
			answer: "Pour créer votre première campagne, connectez-vous à votre compte, cliquez sur 'Nouvelle Campagne' et suivez les étapes guidées. Vous pourrez définir votre budget, cibler votre audience et sélectionner les influenceurs appropriés.",
			category: "getting-started",
			popular: true
		},
		{
			id: 2,
			question: "Comment sont calculés les prix des influenceurs ?",
			answer: "Les prix sont calculés en fonction de plusieurs facteurs : le nombre d'abonnés, le taux d'engagement, la plateforme utilisée, et la complexité du contenu demandé. Notre algorithme IA propose des prix équitables basés sur les performances moyennes du marché.",
			category: "influencers",
			popular: true
		},
		{
			id: 3,
			question: "Quels sont les modes de paiement acceptés ?",
			answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), Mobile Money (Orange Money, MTN Money), et les virements bancaires. Les paiements sont sécurisés via notre système d'escrow qui protège à la fois les annonceurs et les influenceurs.",
			category: "billing",
			popular: false
		},
		{
			id: 4,
			question: "Comment suivre les performances de ma campagne ?",
			answer: "Votre dashboard vous permet de suivre en temps réel les performances de vos campagnes : portée, engagement, clics, et conversions. Vous recevrez également des rapports détaillés par email à la fin de chaque campagne.",
			category: "campaigns",
			popular: true
		},
		{
			id: 5,
			question: "Que faire si un influenceur ne respecte pas les délais ?",
			answer: "Si un influenceur ne respecte pas les délais convenus, vous pouvez le contacter directement via la plateforme. En cas de problème persistant, notre équipe de support intervient pour trouver une solution ou vous rembourser si nécessaire.",
			category: "campaigns",
			popular: false
		},
		{
			id: 6,
			question: "Comment devenir influenceur sur AfriViral ?",
			answer: "Pour devenir influenceur, créez un compte en sélectionnant 'Je suis Influenceur', remplissez votre profil avec vos réseaux sociaux, et attendez la validation de notre équipe. Une fois approuvé, vous recevrez des propositions de campagnes adaptées à votre audience.",
			category: "influencers",
			popular: true
		},
		{
			id: 7,
			question: "Puis-je annuler une campagne en cours ?",
			answer: "Oui, vous pouvez annuler une campagne avant qu'elle ne commence. Si le contenu n'a pas encore été publié, vous serez remboursé intégralement. Si la campagne a déjà commencé, les frais des influenceurs déjà payés ne sont pas remboursables.",
			category: "campaigns",
			popular: false
		},
		{
			id: 8,
			question: "Comment contacter le support client ?",
			answer: "Vous pouvez nous contacter via le chat en ligne (disponible 24/7), par email à support@afriviral.com, ou par WhatsApp au +225 05 01 59 69 69. Notre temps de réponse moyen est de 2 heures.",
			category: "technical",
			popular: true
		}
	];

	const articles = [
		{
			id: 1,
			title: "Guide Complet : Créer une Campagne d'Influence Efficace",
			excerpt: "Découvrez les meilleures pratiques pour créer des campagnes d'influence qui génèrent des résultats concrets.",
			category: "getting-started",
			readTime: "8 min",
			views: 1250
		},
		{
			id: 2,
			title: "Comment Choisir les Meilleurs Influenceurs pour Votre Marque",
			excerpt: "Apprenez à identifier et sélectionner les influenceurs qui correspondent parfaitement à votre audience cible.",
			category: "influencers",
			readTime: "6 min",
			views: 980
		},
		{
			id: 3,
			title: "Optimiser le ROI de Vos Campagnes d'Influence",
			excerpt: "Techniques avancées pour maximiser le retour sur investissement de vos campagnes d'influence marketing.",
			category: "campaigns",
			readTime: "10 min",
			views: 756
		},
		{
			id: 4,
			title: "Résolution des Problèmes de Paiement",
			excerpt: "Solutions aux problèmes courants de paiement et de facturation sur la plateforme AfriViral.",
			category: "billing",
			readTime: "4 min",
			views: 432
		}
	];

	const filteredFAQs = faqs.filter(faq => {
		const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
							faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const filteredArticles = articles.filter(article => {
		const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
							article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-5xl font-bold text-gray-900 mb-4">
						<span className="gradient-text">Aide & Support</span>
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Trouvez rapidement les réponses à vos questions ou contactez notre équipe
					</p>
				</div>

				{/* Recherche */}
				<div className="max-w-2xl mx-auto mb-12">
					<div className="relative">
						<MagnifyingGlassIcon className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							placeholder="Rechercher dans l'aide..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent shadow-lg"
						/>
					</div>
				</div>

				{/* Catégories */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
					{categories.map((category) => {
						const Icon = category.icon;
						return (
							<button
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`p-4 rounded-2xl text-center transition-all duration-200 ${
									selectedCategory === category.id
										? 'bg-gradient-primary text-white shadow-lg transform scale-105'
										: 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
								}`}
							>
								<Icon className="h-8 w-8 mx-auto mb-2" />
								<p className="text-sm font-medium">{category.name}</p>
							</button>
						);
					})}
				</div>

				{/* Contact Direct */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<div className="bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300">
						<div className="w-16 h-16 bg-gradient-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
							<ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
						</div>
						<h3 className="text-xl font-bold text-gray-900 mb-2">Chat en Ligne</h3>
						<p className="text-gray-600 mb-4">Réponse immédiate 24/7</p>
						<button className="btn-primary px-6 py-3 text-sm font-semibold">
							Commencer le Chat
						</button>
					</div>
					<div className="bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300">
						<div className="w-16 h-16 bg-gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
							<PhoneIcon className="h-8 w-8 text-white" />
						</div>
						<h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
						<p className="text-gray-600 mb-4">+225 05 01 59 69 69</p>
						<button className="btn-secondary px-6 py-3 text-sm font-semibold">
							Appeler
						</button>
					</div>
					<div className="bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300">
						<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
							<EnvelopeIcon className="h-8 w-8 text-white" />
						</div>
						<h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
						<p className="text-gray-600 mb-4">support@afriviral.com</p>
						<button className="btn-outline px-6 py-3 text-sm font-semibold">
							Envoyer un Email
						</button>
					</div>
				</div>

				{/* FAQ */}
				<div className="mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Questions Fréquentes</h2>
					<div className="space-y-4">
						{filteredFAQs.map((faq) => (
							<div key={faq.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
								<button
									onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
									className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
											{faq.popular && (
												<span className="px-2 py-1 bg-afriviral-orange-100 text-afriviral-orange text-xs font-medium rounded-full">
													Populaire
												</span>
											)}
										</div>
										<ArrowRightIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
											openFAQ === faq.id ? 'rotate-90' : ''
										}`} />
									</div>
								</button>
								{openFAQ === faq.id && (
									<div className="px-6 pb-6">
										<p className="text-gray-600 leading-relaxed">{faq.answer}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Articles */}
				<div className="mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Articles Utiles</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{filteredArticles.map((article) => (
							<div key={article.id} className="bg-white rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center gap-2">
										<DocumentTextIcon className="h-5 w-5 text-afriviral-blue" />
										<span className="text-sm text-gray-500">{article.readTime}</span>
									</div>
									<span className="text-sm text-gray-500">{article.views} vues</span>
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
								<p className="text-gray-600 mb-4">{article.excerpt}</p>
								<button className="btn-outline px-4 py-2 text-sm font-medium">
									Lire l'article
									<ArrowRightIcon className="h-4 w-4 ml-2" />
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Message si aucun résultat */}
				{filteredFAQs.length === 0 && filteredArticles.length === 0 && (
					<div className="text-center py-12">
						<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<QuestionMarkCircleIcon className="h-12 w-12 text-gray-400" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun résultat trouvé</h3>
						<p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
						<button className="btn-gradient px-6 py-3 text-lg font-semibold">
							<PlusIcon className="h-5 w-5 mr-2" />
							Contacter le Support
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
