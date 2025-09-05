"use client";

import { useState } from "react";
import { 
	CogIcon,
	BellIcon,
	ShieldCheckIcon,
	GlobeAltIcon,
	KeyIcon,
	DevicePhoneMobileIcon,
	EnvelopeIcon,
	EyeIcon,
	EyeSlashIcon,
	CheckIcon,
	XMarkIcon
} from "@heroicons/react/24/outline";

export default function SettingsPage() {
	const [activeTab, setActiveTab] = useState("notifications");
	const [showPassword, setShowPassword] = useState(false);
	const [settings, setSettings] = useState({
		notifications: {
			email: true,
			whatsapp: true,
			campaigns: true,
			influencers: true,
			payments: true,
			marketing: false
		},
		privacy: {
			profileVisibility: "public",
			showEmail: false,
			showPhone: true,
			allowMessages: true,
			dataSharing: false
		},
		security: {
			twoFactor: false,
			loginAlerts: true,
			sessionTimeout: 30,
			passwordExpiry: 90
		},
		preferences: {
			language: "fr",
			timezone: "Africa/Abidjan",
			currency: "XOF",
			theme: "light"
		}
	});

	const tabs = [
		{ id: "notifications", name: "Notifications", icon: BellIcon },
		{ id: "privacy", name: "Confidentialité", icon: ShieldCheckIcon },
		{ id: "security", name: "Sécurité", icon: KeyIcon },
		{ id: "preferences", name: "Préférences", icon: CogIcon }
	];

	const handleNotificationChange = (key, value) => {
		setSettings(prev => ({
			...prev,
			notifications: {
				...prev.notifications,
				[key]: value
			}
		}));
	};

	const handlePrivacyChange = (key, value) => {
		setSettings(prev => ({
			...prev,
			privacy: {
				...prev.privacy,
				[key]: value
			}
		}));
	};

	const handleSecurityChange = (key, value) => {
		setSettings(prev => ({
			...prev,
			security: {
				...prev.security,
				[key]: value
			}
		}));
	};

	const handlePreferenceChange = (key, value) => {
		setSettings(prev => ({
			...prev,
			preferences: {
				...prev.preferences,
				[key]: value
			}
		}));
	};

	const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
		<button
			type="button"
			onClick={() => onChange(!enabled)}
			disabled={disabled}
			className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-afriviral-blue focus:ring-offset-2 ${
				enabled ? 'bg-afriviral-blue' : 'bg-gray-200'
			} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
		>
			<span
				className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
					enabled ? 'translate-x-6' : 'translate-x-1'
				}`}
			/>
		</button>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Paramètres</h1>
					<p className="text-gray-600">Personnalisez votre expérience AfriViral</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Sidebar Navigation */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-3xl shadow-2xl p-6">
							<nav className="space-y-2">
								{tabs.map((tab) => {
									const Icon = tab.icon;
									return (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
												activeTab === tab.id
													? 'bg-gradient-primary text-white shadow-lg'
													: 'text-gray-700 hover:bg-gray-100'
											}`}
										>
											<Icon className="h-5 w-5" />
											<span className="font-medium">{tab.name}</span>
										</button>
									);
								})}
							</nav>
						</div>
					</div>

					{/* Content */}
					<div className="lg:col-span-3">
						<div className="bg-white rounded-3xl shadow-2xl p-8">
							{/* Notifications */}
							{activeTab === "notifications" && (
								<div>
									<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
										<BellIcon className="h-8 w-8 text-afriviral-blue" />
										Notifications
									</h2>
									<div className="space-y-6">
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Notifications Email</h3>
												<p className="text-sm text-gray-600">Recevoir des notifications par email</p>
											</div>
											<ToggleSwitch
												enabled={settings.notifications.email}
												onChange={(value) => handleNotificationChange('email', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Notifications WhatsApp</h3>
												<p className="text-sm text-gray-600">Recevoir des notifications sur WhatsApp</p>
											</div>
											<ToggleSwitch
												enabled={settings.notifications.whatsapp}
												onChange={(value) => handleNotificationChange('whatsapp', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Nouvelles Campagnes</h3>
												<p className="text-sm text-gray-600">Être notifié des nouvelles campagnes disponibles</p>
											</div>
											<ToggleSwitch
												enabled={settings.notifications.campaigns}
												onChange={(value) => handleNotificationChange('campaigns', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Messages Influenceurs</h3>
												<p className="text-sm text-gray-600">Recevoir les messages des influenceurs</p>
											</div>
											<ToggleSwitch
												enabled={settings.notifications.influencers}
												onChange={(value) => handleNotificationChange('influencers', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Paiements</h3>
												<p className="text-sm text-gray-600">Notifications liées aux paiements et factures</p>
											</div>
											<ToggleSwitch
												enabled={settings.notifications.payments}
												onChange={(value) => handleNotificationChange('payments', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4">
											<div>
												<h3 className="font-semibold text-gray-900">Marketing</h3>
												<p className="text-sm text-gray-600">Recevoir des offres et promotions</p>
											</div>
											<ToggleSwitch
												enabled={settings.notifications.marketing}
												onChange={(value) => handleNotificationChange('marketing', value)}
											/>
										</div>
									</div>
								</div>
							)}

							{/* Confidentialité */}
							{activeTab === "privacy" && (
								<div>
									<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
										<ShieldCheckIcon className="h-8 w-8 text-afriviral-orange" />
										Confidentialité
									</h2>
									<div className="space-y-6">
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Visibilité du Profil</h3>
												<p className="text-sm text-gray-600">Qui peut voir votre profil</p>
											</div>
											<select
												value={settings.privacy.profileVisibility}
												onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
												className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-orange focus:border-transparent"
											>
												<option value="public">Public</option>
												<option value="private">Privé</option>
												<option value="contacts">Contacts uniquement</option>
											</select>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Afficher l'Email</h3>
												<p className="text-sm text-gray-600">Rendre votre email visible sur votre profil</p>
											</div>
											<ToggleSwitch
												enabled={settings.privacy.showEmail}
												onChange={(value) => handlePrivacyChange('showEmail', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Afficher le Téléphone</h3>
												<p className="text-sm text-gray-600">Rendre votre numéro visible sur votre profil</p>
											</div>
											<ToggleSwitch
												enabled={settings.privacy.showPhone}
												onChange={(value) => handlePrivacyChange('showPhone', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Autoriser les Messages</h3>
												<p className="text-sm text-gray-600">Permettre aux autres de vous envoyer des messages</p>
											</div>
											<ToggleSwitch
												enabled={settings.privacy.allowMessages}
												onChange={(value) => handlePrivacyChange('allowMessages', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4">
											<div>
												<h3 className="font-semibold text-gray-900">Partage de Données</h3>
												<p className="text-sm text-gray-600">Partager des données anonymisées pour améliorer le service</p>
											</div>
											<ToggleSwitch
												enabled={settings.privacy.dataSharing}
												onChange={(value) => handlePrivacyChange('dataSharing', value)}
											/>
										</div>
									</div>
								</div>
							)}

							{/* Sécurité */}
							{activeTab === "security" && (
								<div>
									<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
										<KeyIcon className="h-8 w-8 text-red-500" />
										Sécurité
									</h2>
									<div className="space-y-6">
										<div className="bg-red-50 border border-red-200 rounded-2xl p-6">
											<h3 className="font-semibold text-red-900 mb-2">Changer le Mot de Passe</h3>
											<p className="text-sm text-red-700 mb-4">Pour votre sécurité, changez régulièrement votre mot de passe</p>
											<div className="space-y-4">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
													<div className="relative">
														<input
															type={showPassword ? "text" : "password"}
															className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
															placeholder="••••••••"
														/>
														<button
															type="button"
															onClick={() => setShowPassword(!showPassword)}
															className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
														>
															{showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
														</button>
													</div>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
													<input
														type="password"
														className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
														placeholder="••••••••"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
													<input
														type="password"
														className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
														placeholder="••••••••"
													/>
												</div>
												<button className="btn-destructive px-6 py-3 text-sm font-medium">
													Changer le Mot de Passe
												</button>
											</div>
										</div>

										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Authentification à Deux Facteurs</h3>
												<p className="text-sm text-gray-600">Ajouter une couche de sécurité supplémentaire</p>
											</div>
											<ToggleSwitch
												enabled={settings.security.twoFactor}
												onChange={(value) => handleSecurityChange('twoFactor', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Alertes de Connexion</h3>
												<p className="text-sm text-gray-600">Être notifié des nouvelles connexions</p>
											</div>
											<ToggleSwitch
												enabled={settings.security.loginAlerts}
												onChange={(value) => handleSecurityChange('loginAlerts', value)}
											/>
										</div>
										<div className="flex items-center justify-between py-4">
											<div>
												<h3 className="font-semibold text-gray-900">Délai d'Expiration de Session</h3>
												<p className="text-sm text-gray-600">Temps avant déconnexion automatique (minutes)</p>
											</div>
											<select
												value={settings.security.sessionTimeout}
												onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
												className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
											>
												<option value={15}>15 minutes</option>
												<option value={30}>30 minutes</option>
												<option value={60}>1 heure</option>
												<option value={120}>2 heures</option>
											</select>
										</div>
									</div>
								</div>
							)}

							{/* Préférences */}
							{activeTab === "preferences" && (
								<div>
									<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
										<CogIcon className="h-8 w-8 text-afriviral-blue" />
										Préférences
									</h2>
									<div className="space-y-6">
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Langue</h3>
												<p className="text-sm text-gray-600">Langue de l'interface</p>
											</div>
											<select
												value={settings.preferences.language}
												onChange={(e) => handlePreferenceChange('language', e.target.value)}
												className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
											>
												<option value="fr">Français</option>
												<option value="en">English</option>
												<option value="ar">العربية</option>
											</select>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Fuseau Horaire</h3>
												<p className="text-sm text-gray-600">Fuseau horaire pour les dates et heures</p>
											</div>
											<select
												value={settings.preferences.timezone}
												onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
												className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
											>
												<option value="Africa/Abidjan">Abidjan (GMT+0)</option>
												<option value="Africa/Lagos">Lagos (GMT+1)</option>
												<option value="Africa/Cairo">Le Caire (GMT+2)</option>
												<option value="Africa/Johannesburg">Johannesburg (GMT+2)</option>
											</select>
										</div>
										<div className="flex items-center justify-between py-4 border-b border-gray-100">
											<div>
												<h3 className="font-semibold text-gray-900">Devise</h3>
												<p className="text-sm text-gray-600">Devise d'affichage des prix</p>
											</div>
											<select
												value={settings.preferences.currency}
												onChange={(e) => handlePreferenceChange('currency', e.target.value)}
												className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
											>
												<option value="XOF">Franc CFA (XOF)</option>
												<option value="USD">Dollar US (USD)</option>
												<option value="EUR">Euro (EUR)</option>
												<option value="NGN">Naira (NGN)</option>
											</select>
										</div>
										<div className="flex items-center justify-between py-4">
											<div>
												<h3 className="font-semibold text-gray-900">Thème</h3>
												<p className="text-sm text-gray-600">Apparence de l'interface</p>
											</div>
											<select
												value={settings.preferences.theme}
												onChange={(e) => handlePreferenceChange('theme', e.target.value)}
												className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent"
											>
												<option value="light">Clair</option>
												<option value="dark">Sombre</option>
												<option value="auto">Automatique</option>
											</select>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
