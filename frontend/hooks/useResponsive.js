"use client";

import { useEffect, useState } from "react";

// Hook utilitaire pour suivre la largeur de l'écran et exposer des booléens de breakpoint
export default function useResponsive() {
	const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

	useEffect(() => {
		function onResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	return {
		width,
		isXs: width < 640,
		isSm: width >= 640 && width < 768,
		isMd: width >= 768 && width < 1024,
		isLg: width >= 1024 && width < 1280,
		isXl: width >= 1280,
	};
}


