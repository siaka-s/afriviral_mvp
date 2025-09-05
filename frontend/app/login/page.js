"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
	EyeIcon, 
	EyeSlashIcon, 
	EnvelopeIcon, 
	LockClosedIcon,
	ArrowRightIcon,
	CheckCircleIcon,
	ExclamationTriangleIcon,
	UserIcon,
	BuildingOfficeIcon
} from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
		email: "",
		password: "",
		userType: "pme" // pme ou influenceur
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
		setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
		setError("");
		setSuccess("");
    setLoading(true);

		// Validation côté client
		if (!formData.email || !formData.password) {
			setError("Veuillez remplir tous les champs");
			setLoading(false);
			return;
		}

		try {
			// Simulation d'une connexion (remplacez par votre API)
			await new Promise(resolve => setTimeout(resolve, 1500));
			
			// Données fictives pour la démo
			const mockUser = {
				id: 1,
				name: formData.userType === "pme" ? "Aminata Kouadio" : "Fatou Diallo",
				email: formData.email,
				type: formData.userType,
				avatar: formData.userType === "pme" ? "AK" : "FD"
			};

			localStorage.setItem("afriviral:user", JSON.stringify(mockUser));
			setSuccess("Connexion réussie ! Redirection en cours...");
			
			setTimeout(() => {
				router.push("/dashboard");
			}, 1500);

		} catch (err) {
			setError("Erreur de connexion. Veuillez réessayer.");
		} finally {
			setLoading(false);
		}
	};

	const handleDemoLogin = async (userType) => {
		setLoading(true);
		setError("");
		
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			const demoUser = {
				id: userType === "pme" ? 1 : 2,
				name: userType === "pme" ? "Aminata Kouadio" : "Fatou Diallo",
				email: userType === "pme" ? "demo@pme.ci" : "demo@influenceur.ci",
				type: userType,
				avatar: userType === "pme" ? "AK" : "FD"
			};

			localStorage.setItem("afriviral:user", JSON.stringify(demoUser));
			setSuccess(`Connexion démo ${userType === "pme" ? "PME" : "Influenceur"} réussie !`);
			
			setTimeout(() => {
				router.push("/dashboard");
			}, 1500);

    } catch (err) {
			setError("Erreur de connexion démo");
    } finally {
      setLoading(false);
    }
  };

  return (
		<div className="min-h-screen bg-gradient-to-br from-white via-afriviral-blue-50 to-afriviral-orange-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232462EA%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
			
			<div className="relative min-h-screen flex">
				{/* Left Side - Form */}
				<div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-md w-full space-y-6"
					>
						{/* Header */}
						<div className="text-center border-b border-gray-200 pb-6">
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								<span className="gradient-text">Bienvenue</span>
							</h1>
							<p className="text-lg text-gray-600 mb-2">
								<span className="gradient-text">"Touchez plus, sans stress"</span>
							</p>
							<p className="text-sm text-gray-600">
								Connectez-vous à votre compte AfriViral
          </p>
        </div>

						{/* Type Selection */}
						<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
							<h3 className="text-base font-semibold text-gray-900 mb-4 text-center">
								Je me connecte en tant que :
							</h3>
							<div className="grid grid-cols-2 gap-4">
								<button
									type="button"
									onClick={() => setFormData({...formData, userType: "pme"})}
									className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
										formData.userType === "pme"
											? "border-afriviral-blue bg-afriviral-blue-50 text-afriviral-blue shadow-sm"
											: "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
									}`}
								>
									<BuildingOfficeIcon className="h-6 w-6 mx-auto mb-2" />
									<span className="font-medium text-sm">PME</span>
								</button>
								<button
									type="button"
									onClick={() => setFormData({...formData, userType: "influenceur"})}
									className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
										formData.userType === "influenceur"
											? "border-afriviral-orange bg-afriviral-orange-50 text-afriviral-orange shadow-sm"
											: "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
									}`}
								>
									<UserIcon className="h-6 w-6 mx-auto mb-2" />
									<span className="font-medium text-sm">Influenceur</span>
								</button>
							</div>
						</div>

						{/* Login Form */}
						<motion.form
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.2 }}
							onSubmit={handleSubmit}
							className="bg-white rounded-2xl shadow-lg p-6 space-y-5 border border-gray-100"
						>
							{/* Error/Success Messages */}
							{error && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
								>
									<ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
									<span className="text-xs font-medium">{error}</span>
								</motion.div>
							)}

							{success && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700"
								>
									<CheckCircleIcon className="h-4 w-4 flex-shrink-0" />
									<span className="text-xs font-medium">{success}</span>
								</motion.div>
							)}

							{/* Form Fields Section */}
							<div className="space-y-4">
								{/* Email Field */}
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
										Adresse email
									</label>
									<div className="relative">
										<EnvelopeIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
										<input
											id="email"
											name="email"
											type="email"
											required
											value={formData.email}
											onChange={handleChange}
											className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriviral-blue focus:border-afriviral-blue transition-all duration-200"
											placeholder="votre@email.com"
										/>
									</div>
								</div>

								{/* Password Field */}
								<div>
									<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
										Mot de passe
									</label>
									<div className="relative">
										<LockClosedIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
										<input
											id="password"
											name="password"
											type={showPassword ? "text" : "password"}
											required
											value={formData.password}
											onChange={handleChange}
											className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriviral-blue focus:border-afriviral-blue transition-all duration-200"
											placeholder="••••••••"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
										>
											{showPassword ? (
												<EyeSlashIcon className="h-4 w-4" />
											) : (
												<EyeIcon className="h-4 w-4" />
											)}
										</button>
									</div>
								</div>
							</div>

							{/* Remember Me & Forgot Password */}
							<div className="flex items-center justify-between py-3">
								<label className="flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="h-4 w-4 text-afriviral-blue focus:ring-afriviral-blue border-gray-300 rounded"
									/>
									<span className="ml-2 text-sm text-gray-900">Se souvenir de moi</span>
								</label>
								<Link
									href="/forgot-password"
									className="text-sm text-afriviral-blue hover:text-afriviral-blue-600 font-medium transition-colors"
								>
									Mot de passe oublié ?
								</Link>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={loading}
								className="w-full btn-gradient py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
							>
								{loading ? (
									<div className="flex items-center justify-center gap-2">
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										Connexion en cours...
									</div>
								) : (
									<div className="flex items-center justify-center gap-2">
										Se connecter
										<ArrowRightIcon className="h-4 w-4" />
									</div>
								)}
							</button>

							{/* Demo Login Buttons */}
							<div className="pt-4 border-t border-gray-200">
								<p className="text-center text-xs text-gray-600 mb-3">
									Ou essayez la démo :
								</p>
								<div className="grid grid-cols-2 gap-3">
									<button
										type="button"
										onClick={() => handleDemoLogin("pme")}
										disabled={loading}
										className="btn-outline py-2 text-xs font-medium rounded-lg disabled:opacity-50 hover:shadow-md transition-all duration-300"
									>
										<BuildingOfficeIcon className="h-4 w-4 mr-1" />
										Démo PME
									</button>
									<button
										type="button"
										onClick={() => handleDemoLogin("influenceur")}
										disabled={loading}
										className="btn-outline py-2 text-xs font-medium rounded-lg disabled:opacity-50 hover:shadow-md transition-all duration-300"
									>
										<UserIcon className="h-4 w-4 mr-1" />
										Démo Influenceur
									</button>
								</div>
							</div>
						</motion.form>

						{/* Sign Up Link */}
						<div className="text-center pt-4">
							<p className="text-gray-600 text-sm">
								Pas encore de compte ?{" "}
								<Link
									href="/register"
									className="font-semibold text-afriviral-blue hover:text-afriviral-blue-600 transition-colors"
								>
									Créer un compte
								</Link>
							</p>
						</div>
					</motion.div>
          </div>

				{/* Right Side - Features */}
				<div className="hidden lg:flex lg:flex-1 bg-gradient-primary items-center justify-center p-12">
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="max-w-md text-center text-white"
					>
						<h2 className="text-3xl font-bold mb-6">
							Rejoignez la Révolution du Marketing d'Influence
						</h2>
						<div className="space-y-6">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
									<BuildingOfficeIcon className="h-6 w-6" />
								</div>
								<div className="text-left">
									<h3 className="font-semibold mb-2">Pour les PME</h3>
									<p className="text-blue-100 text-sm">
										Lancez des campagnes ciblées avec des micro-influenceurs locaux
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
									<UserIcon className="h-6 w-6" />
								</div>
								<div className="text-left">
									<h3 className="font-semibold mb-2">Pour les Influenceurs</h3>
									<p className="text-blue-100 text-sm">
										Monétisez votre communauté avec des marques africaines
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
									<CheckCircleIcon className="h-6 w-6" />
								</div>
								<div className="text-left">
									<h3 className="font-semibold mb-2">Paiements Sécurisés</h3>
									<p className="text-blue-100 text-sm">
										Système d'escrow pour protéger toutes les parties
									</p>
								</div>
							</div>
          </div>
      </motion.div>
				</div>
			</div>
    </div>
  );
}