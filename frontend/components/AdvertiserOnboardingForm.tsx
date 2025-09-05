"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const advertiserSchema = z.object({
	nom: z.string().min(2, "Minimum 2 caractères"),
	email: z.string().email("Email invalide"),
	mot_de_passe: z
		.string()
		.min(8, "Minimum 8 caractères")
		.regex(/[A-Za-z]/, "Doit contenir une lettre")
		.regex(/\d/, "Doit contenir un chiffre"),
	whatsapp: z.string().optional().or(z.literal("").transform(() => undefined)),
	entreprise: z.string().optional(),
	secteur: z.string().optional(),
	adresse: z.string().optional(),
});

type AdvertiserInput = z.infer<typeof advertiserSchema>;

export default function AdvertiserOnboardingForm() {
	const { register, handleSubmit, formState } = useForm<AdvertiserInput>({
		resolver: zodResolver(advertiserSchema),
		defaultValues: {
			nom: "",
			email: "",
			mot_de_passe: "",
			whatsapp: "",
			entreprise: "",
			secteur: "",
			adresse: "",
		},
	});

	const { errors, isSubmitting } = formState;

	function onSubmit(values: AdvertiserInput) {
		console.log("AdvertiserOnboardingForm submit:", values);
	}

	return (
		<div className="w-full">
			<div className="text-center mb-8">
				<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-blue-100 text-afriviral-blue text-sm font-medium mb-4">
					🏢 Inscription PME
				</div>
				<h2 className="text-3xl font-bold text-gray-900 mb-2">Créer votre compte PME</h2>
				<p className="text-gray-600">Remplissez les informations ci-dessous pour commencer à lancer vos campagnes d'influence</p>
			</div>
			
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				{/* Informations personnelles */}
				<div className="bg-gray-50 rounded-2xl p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
						<span className="w-10 h-10 bg-gradient-blue rounded-xl flex items-center justify-center text-white text-lg">👤</span>
						Informations personnelles
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
							<input 
								{...register("nom")} 
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent transition-all duration-200" 
								placeholder="Ex: Koffi Kouadio" 
							/>
							{errors.nom && <p className="mt-2 text-sm text-red-600">{errors.nom.message}</p>}
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
							<input 
								{...register("email")} 
								type="email"
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent transition-all duration-200" 
								placeholder="votre@email.com" 
							/>
							{errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe *</label>
							<input 
								{...register("mot_de_passe")} 
								type="password"
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent transition-all duration-200" 
								placeholder="••••••••" 
							/>
							{errors.mot_de_passe && <p className="mt-2 text-sm text-red-600">{errors.mot_de_passe.message}</p>}
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
							<input 
								{...register("whatsapp")} 
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent transition-all duration-200" 
								placeholder="+225 XX XX XX XX" 
							/>
						</div>
					</div>
				</div>

				{/* Informations entreprise */}
				<div className="bg-gray-50 rounded-2xl p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
						<span className="w-10 h-10 bg-gradient-orange rounded-xl flex items-center justify-center text-white text-lg">🏢</span>
						Informations entreprise
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">Nom de l'entreprise</label>
							<input 
								{...register("entreprise")} 
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-orange focus:border-transparent transition-all duration-200" 
								placeholder="Ex: Tech Solutions CI" 
							/>
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">Secteur d'activité</label>
							<select 
								{...register("secteur")} 
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-orange focus:border-transparent transition-all duration-200"
							>
								<option value="">Sélectionnez un secteur</option>
								<option value="retail">Retail & E-commerce</option>
								<option value="tech">Technologie</option>
								<option value="food">Restauration</option>
								<option value="beauty">Beauté & Cosmétiques</option>
								<option value="fashion">Mode & Textile</option>
								<option value="health">Santé & Bien-être</option>
								<option value="education">Éducation</option>
								<option value="finance">Finance</option>
								<option value="other">Autre</option>
							</select>
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
							<textarea 
								{...register("adresse")} 
								rows={3}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-orange focus:border-transparent transition-all duration-200" 
								placeholder="Adresse complète de votre entreprise"
							/>
						</div>
					</div>
				</div>

				{/* Bouton de soumission */}
				<div className="text-center pt-6">
					<button 
						type="submit" 
						disabled={isSubmitting} 
						className="btn-gradient px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? (
							<div className="flex items-center gap-2">
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								Création en cours...
							</div>
						) : (
							"🚀 Créer mon compte PME"
						)}
					</button>
					<p className="mt-4 text-sm text-gray-500">
						En créant votre compte, vous acceptez nos 
						<a href="/terms" className="text-afriviral-blue hover:underline"> conditions d'utilisation</a>
					</p>
				</div>
			</form>
		</div>
	);
}