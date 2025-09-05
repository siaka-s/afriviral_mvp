"use client";

import { useEffect, useState } from "react";

type Suggestion = { id: string; name: string; niche: string; followers: number; avatar?: string };

export default function SuggestionsCarousel({ loading }: { loading: boolean }) {
	const [seconds, setSeconds] = useState(60);
	useEffect(() => {
		if (!loading) return;
		if (seconds <= 0) return;
		const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
		return () => clearTimeout(t);
	}, [loading, seconds]);

	if (loading) {
		return (
			<div className="rounded-lg border p-6">
				<p className="text-sm text-muted-foreground">Plan IA sous 60 s...</p>
				<div className="mt-3 h-2 w-full overflow-hidden rounded bg-neutral-200">
					<div className="h-2 bg-primary animate-gradient" style={{ width: `${((60 - seconds) / 60) * 100}%` }} />
				</div>
				<p className="mt-2 text-xs text-muted-foreground">Temps restant: {seconds}s</p>
				<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="card p-4">
							<div className="h-6 w-24 animate-pulse rounded bg-neutral-200" />
							<div className="mt-2 h-4 w-40 animate-pulse rounded bg-neutral-200" />
						</div>
					))}
				</div>
			</div>
		);
	}

	const dummy: Suggestion[] = Array.from({ length: 10 }).map((_, i) => ({ id: `${i}`, name: `Influenceur ${i + 1}`, niche: ["Mode", "Tech", "Beauté"][i % 3], followers: 10000 + i * 500 }));

	return (
		<div className="rounded-lg border p-6">
			<h3 className="text-lg font-medium">Suggestions d'influenceurs</h3>
			<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{dummy.map((s) => (
					<div key={s.id} className="card p-4">
						<p className="font-medium">{s.name}</p>
						<p className="text-sm text-muted-foreground">{s.niche} • {s.followers.toLocaleString()} abonnés</p>
						<button className="btn-outline mt-3 px-3 py-1">Voir le profil</button>
					</div>
				))}
			</div>
		</div>
	);
}


