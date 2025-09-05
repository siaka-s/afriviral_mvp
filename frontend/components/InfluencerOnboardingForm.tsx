"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ------------------------------------------------------------
// Schéma de validation Zod
// ------------------------------------------------------------
const MAX_IMAGE_MB = 2;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const;

const reseauItemSchema = z.object({
	platform: z.enum(["Instagram", "TikTok", "Facebook", "YouTube"]).optional().or(z.literal("")).default(""),
	profile: z.string().optional().default(""),
});

const onboardingSchema = z.object({
	photo_file: z
		.custom<FileList | null>((v) => v instanceof FileList || v === null)
		.transform((v) => (v && v.length > 0 ? v.item(0) : null))
		.refine(
			(file) => file === null || ACCEPTED_IMAGE_TYPES.includes(file.type as any),
			{ message: "Le fichier doit être une image (.jpeg, .png, .webp)", path: ["photo_file"] }
		)
		.refine((file) => file === null || file.size <= MAX_IMAGE_MB * 1024 * 1024, {
			message: `La taille ne doit pas dépasser ${MAX_IMAGE_MB}MB`,
			path: ["photo_file"],
		}),
	nom: z.string().min(2, { message: "Minimum 2 caractères" }),
	email: z.string().email({ message: "Email invalide" }),
	mot_de_passe: z
		.string()
		.min(8, { message: "Minimum 8 caractères" })
		.regex(/[A-Za-z]/, { message: "Doit contenir une lettre" })
		.regex(/\d/, { message: "Doit contenir un chiffre" }),
	telephone: z.string().optional().or(z.literal("").transform(() => undefined)),
	whatsapp: z.string().optional().or(z.literal("").transform(() => undefined)),
	followers: z
		.union([z.string(), z.number()])
		.optional()
		.transform((v) => (typeof v === "string" ? (v.trim() === "" ? undefined : Number(v)) : v))
		.refine((v) => v === undefined || (typeof v === "number" && v >= 0), {
			message: "Doit être un nombre positif",
		}),
	categories: z.array(z.string()).optional().default([]),
	reseaux: z.array(reseauItemSchema).optional().default([{ platform: "", profile: "" }]),
});

type OnboardingInput = z.infer<typeof onboardingSchema>;

// ------------------------------------------------------------
// Options pour les catégories
// ------------------------------------------------------------
const CATEGORIES = [
	"Beauté",
	"Mode",
	"Voyage",
	"Cuisine",
	"Tech",
	"Humour",
	"Sport",
	"Lifestyle",
	"Business",
	"Éducation",
	"Gaming",
	"Fitness",
	"Art",
	"Musique",
	"Parenting",
] as const;

// ------------------------------------------------------------
// Options pour les plateformes
// ------------------------------------------------------------
const PLATFORMS = ["Instagram", "TikTok", "Facebook", "YouTube"] as const;

// ------------------------------------------------------------
// Composant principal
// ------------------------------------------------------------
export default function InfluencerOnboardingForm() {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<OnboardingInput>({
		resolver: zodResolver(onboardingSchema),
		defaultValues: {
			nom: "",
			email: "",
			mot_de_passe: "",
			telephone: "",
			whatsapp: "",
			followers: undefined,
			categories: [],
			reseaux: [{ platform: "", profile: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "reseaux",
	});

	const watchedPhoto = watch("photo_file");

	// ------------------------------------------------------------
	// Gestion de la prévisualisation de l'image
	// ------------------------------------------------------------
	useEffect(() => {
		if (watchedPhoto && watchedPhoto instanceof FileList && watchedPhoto.length > 0) {
			const file = watchedPhoto.item(0);
			if (file) {
				const url = URL.createObjectURL(file);
				setPreviewUrl(url);
				return () => URL.revokeObjectURL(url);
			}
		} else {
			setPreviewUrl(null);
		}
	}, [watchedPhoto]);

	// ------------------------------------------------------------
	// Soumission du formulaire
	// ------------------------------------------------------------
	function onSubmit(values: OnboardingInput) {
		console.log("InfluencerOnboardingForm submit:", values);
	}

	return (
		<div className="w-full">
			<div className="text-center mb-8">
				<div className="inline-flex items-center px-4 py-2 rounded-full bg-afriviral-orange-100 text-afriviral-orange text-sm font-medium mb-4">
					👤 Inscription Influenceur
				</div>
				<h2 className="text-3xl font-bold text-gray-900 mb-2">Créer votre profil Influenceur</h2>
				<p className="text-gray-600">Remplissez les informations ci-dessous pour commencer à monétiser votre communauté</p>
			</div>
			
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				{/* Photo de profil */}
				<div className="bg-gray-50 rounded-2xl p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
						<span className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-lg">📸</span>
						Photo de profil
					</h3>
					<div className="flex flex-col items-center">
						<div className="relative w-32 h-32 mb-4">
							{previewUrl ? (
								<img
									src={previewUrl}
									alt="Aperçu"
									className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-lg"
								/>
							) : (
								<div className="w-full h-full rounded-2xl bg-gradient-to-br from-afriviral-blue-100 to-afriviral-orange-100 flex items-center justify-center border-4 border-dashed border-gray-300">
									<span className="text-4xl">👤</span>
								</div>
							)}
						</div>
						<label className="btn-outline cursor-pointer px-6 py-3 rounded-xl">
							<input
								{...register("photo_file")}
								type="file"
								accept="image/*"
								className="hidden"
							/>
							Choisir une photo
						</label>
						{errors.photo_file && (
							<p className="mt-2 text-sm text-red-600">{errors.photo_file.message}</p>
						)}
						<p className="mt-2 text-xs text-gray-500">JPG, PNG ou WEBP (max 2MB)</p>
					</div>
				</div>

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
								placeholder="Ex: Aminata Traoré"
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
							<label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
							<input
								{...register("telephone")}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent transition-all duration-200"
								placeholder="+225 XX XX XX XX"
							/>
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
							<input
								{...register("whatsapp")}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent transition-all duration-200"
								placeholder="+225 XX XX XX XX"
							/>
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">Nombre d'abonnés</label>
							<input
								{...register("followers")}
								type="number"
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent transition-all duration-200"
								placeholder="Ex: 5000"
							/>
							{errors.followers && <p className="mt-2 text-sm text-red-600">{errors.followers.message}</p>}
						</div>
					</div>
				</div>

				{/* Catégories */}
				<div className="bg-gray-50 rounded-2xl p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
						<span className="w-10 h-10 bg-gradient-orange rounded-xl flex items-center justify-center text-white text-lg">🏷️</span>
						Vos catégories
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
						{CATEGORIES.map((category) => (
							<label key={category} className="flex items-center space-x-2 cursor-pointer">
								<input
									{...register("categories")}
									type="checkbox"
									value={category}
									className="w-4 h-4 text-afriviral-orange border-gray-300 rounded focus:ring-afriviral-orange"
								/>
								<span className="text-sm font-medium text-gray-700">{category}</span>
							</label>
						))}
					</div>
				</div>

				{/* Réseaux sociaux */}
				<div className="bg-gray-50 rounded-2xl p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
						<span className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-lg">📱</span>
						Réseaux sociaux
					</h3>
					<div className="space-y-4">
						{fields.map((field, index) => (
							<div key={field.id} className="flex gap-4 items-end">
								<div className="flex-1">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Plateforme {index + 1}
									</label>
									<Controller
										control={control}
										name={`reseaux.${index}.platform`}
										render={({ field: platformField }) => (
											<select
												{...platformField}
												className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent transition-all duration-200"
											>
												<option value="">Sélectionnez une plateforme</option>
												{PLATFORMS.map((platform) => (
													<option key={platform} value={platform}>
														{platform}
													</option>
												))}
											</select>
										)}
									/>
								</div>
								<div className="flex-1">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Nom d'utilisateur ou URL
									</label>
									<input
										{...register(`reseaux.${index}.profile`)}
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afriviral-blue focus:border-transparent transition-all duration-200"
										placeholder="@username ou URL complète"
									/>
								</div>
								{fields.length > 1 && (
									<button
										type="button"
										onClick={() => remove(index)}
										className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
									>
										Supprimer
									</button>
								)}
							</div>
						))}
						<button
							type="button"
							onClick={() => append({ platform: "", profile: "" })}
							className="btn-outline w-full py-3 rounded-xl"
						>
							+ Ajouter un réseau social
						</button>
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
							"🚀 Créer mon profil Influenceur"
						)}
					</button>
					<p className="mt-4 text-sm text-gray-500">
						En créant votre profil, vous acceptez nos 
						<a href="/terms" className="text-afriviral-orange hover:underline"> conditions d'utilisation</a>
					</p>
				</div>
			</form>
		</div>
	);
}