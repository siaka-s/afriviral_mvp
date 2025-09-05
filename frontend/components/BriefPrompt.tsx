"use client";

import { useState } from "react";

export default function BriefPrompt({ onSubmit }: { onSubmit: (value: string) => void }) {
	const [value, setValue] = useState("");
	return (
		<div className="rounded-lg border p-4 bg-white">
			<label className="block text-sm font-medium mb-2">Votre brief (ex: "Je vends des sneakers à Abidjan et je cherche à toucher une cible jeune")</label>
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				rows={4}
				className="textarea w-full"
				placeholder="Décrivez votre besoin en une phrase..."
			/>
			<div className="mt-3 flex gap-3">
				<button className="btn-primary px-4 py-2" onClick={() => onSubmit(value)}>Lancer</button>
				<button className="btn-ghost px-4 py-2" onClick={() => setValue("Je vends des sneakers à Abidjan et je cherche à toucher ma cible jeune")}>Exemple</button>
			</div>
		</div>
	);
}


