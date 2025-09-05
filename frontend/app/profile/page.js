"use client";

import { useState } from "react";
import { 
	UserCircleIcon, 
	BuildingOfficeIcon, 
	MapPinIcon, 
	PhoneIcon, 
	EnvelopeIcon,
	PencilIcon,
	CheckIcon,
	XMarkIcon
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		nom: "Aminata Kouadio",
		email: "aminata.kouadio@techsolutions.ci",
		telephone: "+225 07 12 34 56 78",
		whatsapp: "+225 07 12 34 56 78",
		entreprise: "Tech Solutions CI",
		secteur: "Technologie",
		adresse: "Cocody, Angré 8ème Tranche, Abidjan, Côte d'Ivoire",
		dateInscription: "15 Mars 2024",
		statut: "Actif",
		completion: 85
	});

	const [editData, setEditData] = useState(profileData);

	const handleSave = () => {
		setProfileData(editData);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditData(profileData);
		setIsEditing(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Mon Profil</h1>
					<p className="text-gray-600">Gérez vos informations personnelles et professionnelles</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Profil Principal */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-3xl shadow-2xl p-8">
							<div className="flex items-center justify-between mb-8">
								<h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
									<UserCircleIcon className="h-8 w-8 text-afriviral-blue" />
									Informations Personnelles
								</h2>
								{!isEditing ? (
									<button
										onClick={() => setIsEditing(true)}
										className="btn-outline px-4 py-2 text-sm"
									>
										<PencilIcon className="h-4 w-4 mr-2" />
										Modifier
									</button>
								) : (
									<div className="flex gap-2">
										<button
											onClick={handleSave}
											className="btn-primary px-4 py-2 text-sm"
										>
											<CheckIcon className="h-4 w-4 mr-2" />
											Sauvegarder
										</button>
										<button
											onClick={handleCancel}
											className="btn-outline px-4 py-2 text-sm"
										>
											<XMarkIcon className="h-4 w-4 mr-2" />
											Annuler
										</button>
									</div>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
									{isEditing ? (
										<input
											type="text"
											value={editData.nom}
											onChange={(e) => setEditData({...editData, nom: e.target.value})}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
										/>
									) : (
										<p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{profileData.nom}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
									{isEditing ? (
										<input
											type="email"
											value={editData.email}
											onChange={(e) => setEditData({...editData, email: e.target.value})}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
										/>
									) : (
										<p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{profileData.email}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
									{isEditing ? (
										<input
											type="tel"
											value={editData.telephone}
											onChange={(e) => setEditData({...editData, telephone: e.target.value})}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
										/>
									) : (
										<p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{profileData.telephone}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
									{isEditing ? (
										<input
											type="tel"
											value={editData.whatsapp}
											onChange={(e) => setEditData({...editData, whatsapp: e.target.value})}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
										/>
									) : (
										<p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{profileData.whatsapp}</p>
									)}
								</div>
								<div className="md:col-span-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
									{isEditing ? (
										<textarea
											value={editData.adresse}
											onChange={(e) => setEditData({...editData, adresse: e.target.value})}
											rows={3}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
										/>
									) : (
										<p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{profileData.adresse}</p>
									)}
								</div>
							</div>
						</div>

						{/* Informations Entreprise */}
						<div className="bg-white rounded-3xl shadow-2xl p-8 mt-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
								<BuildingOfficeIcon className="h-8 w-8 text-afriviral-orange" />
								Informations Entreprise
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">Nom de l'entreprise</label>
									{isEditing ? (
										<input
											type="text"
											value={editData.entreprise}
											onChange={(e) => setEditData({...editData, entreprise: e.target.value})}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-orange focus:border-transparent"
										/>
									) : (
										<p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{profileData.entreprise}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">Secteur d'activité</label>
									{isEditing ? (
										<select
											value={editData.secteur}
											onChange={(e) => setEditData({...editData, secteur: e.target.value})}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-orange focus:border-transparent"
										>
											<option value="Technologie">Technologie</option>
											<option value="Retail">Retail & E-commerce</option>
											<option value="Restauration">Restauration</option>
											<option value="Beauté">Beauté & Cosmétiques</option>
											<option value="Mode">Mode & Textile</option>
											<option value="Santé">Santé & Bien-être</option>
											<option value="Éducation">Éducation</option>
											<option value="Finance">Finance</option>
										</select>
									) : (
										<p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{profileData.secteur}</p>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Avatar et Statut */}
						<div className="bg-white rounded-3xl shadow-2xl p-6 text-center">
							<div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-white font-bold text-2xl">AK</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">{profileData.nom}</h3>
							<p className="text-gray-600 mb-4">{profileData.entreprise}</p>
							<div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
								<div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
								{profileData.statut}
							</div>
						</div>

						{/* Progression du Profil */}
						<div className="bg-white rounded-3xl shadow-2xl p-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4">Progression du Profil</h3>
							<div className="mb-4">
								<div className="flex justify-between text-sm text-gray-600 mb-2">
									<span>Complétion</span>
									<span>{profileData.completion}%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div 
										className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
										style={{width: `${profileData.completion}%`}}
									></div>
								</div>
							</div>
							<div className="space-y-2 text-sm text-gray-600">
								<div className="flex items-center gap-2">
									<CheckIcon className="h-4 w-4 text-green-500" />
									<span>Informations de base</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckIcon className="h-4 w-4 text-green-500" />
									<span>Informations entreprise</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckIcon className="h-4 w-4 text-green-500" />
									<span>Vérification email</span>
								</div>
								<div className="flex items-center gap-2">
									<XMarkIcon className="h-4 w-4 text-gray-400" />
									<span>Photo de profil</span>
								</div>
								<div className="flex items-center gap-2">
									<XMarkIcon className="h-4 w-4 text-gray-400" />
									<span>Vérification téléphone</span>
								</div>
							</div>
						</div>

						{/* Statistiques */}
						<div className="bg-white rounded-3xl shadow-2xl p-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4">Statistiques</h3>
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Membre depuis</span>
									<span className="font-semibold text-gray-900">{profileData.dateInscription}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Campagnes lancées</span>
									<span className="font-semibold text-afriviral-blue">12</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Influenceurs collaborés</span>
									<span className="font-semibold text-afriviral-orange">45</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Budget total</span>
									<span className="font-semibold text-green-600">2 450 000 FCFA</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
