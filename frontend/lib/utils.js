// Utilitaires généraux

// Concatène des classes conditionnelles Tailwind (équivalent simple à clsx)
export function cn(...classes) {
	return classes.filter(Boolean).join(" ");
}

// Formatage simple d'une date en locale fr-FR
export function formatDate(dateLike) {
	try {
		const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
		return new Intl.DateTimeFormat("fr-FR", {
			year: "numeric",
			month: "short",
			day: "2-digit",
		}).format(d);
	} catch (_) {
		return "";
	}
}

// Temporisation (await sleep(ms))
export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}


