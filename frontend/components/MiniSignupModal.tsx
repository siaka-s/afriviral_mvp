"use client";

import { useState } from "react";

export default function MiniSignupModal({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (data: { email: string; whatsapp: string }) => void }) {
	const [email, setEmail] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="relative z-10 w-full max-w-md rounded-lg border bg-white p-6 shadow-lg">
				<h3 className="text-lg font-semibold">Inscription rapide</h3>
				<p className="mt-1 text-sm text-muted-foreground">Recevez votre plan IA en 60s.</p>
				<div className="mt-4 space-y-3">
					<div>
						<label className="block text-sm font-medium">Email</label>
						<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input mt-1 w-full" placeholder="pme@example.com" />
					</div>
					<div>
						<label className="block text-sm font-medium">WhatsApp</label>
						<input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="input mt-1 w-full" placeholder="" />
					</div>
				</div>
				<div className="mt-5 flex justify-end gap-3">
					<button className="btn-ghost px-4 py-2" onClick={onClose}>Annuler</button>
					<button className="btn-primary px-4 py-2" onClick={() => onSubmit({ email, whatsapp })}>Continuer</button>
				</div>
			</div>
		</div>
	);
}


