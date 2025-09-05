"use client";

import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";

// Shape du contexte d'authentification
// user: objet utilisateur (ou null si non connecté)
// isAuthenticated: booléen indiquant si un utilisateur est connecté
// login, logout, register: actions exposées pour interagir avec l'état
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const isAuthenticated = Boolean(user);

	// Exemple de persistance côté client (facultatif): restaurer la session depuis localStorage
	useEffect(() => {
		try {
			const raw = typeof window !== "undefined" ? window.localStorage.getItem("afriviral:user") : null;
			if (raw) {
				setUser(JSON.parse(raw));
			}
		} catch (err) {
			console.warn("AuthProvider: impossible de restaurer l'utilisateur", err);
		}
	}, []);

	useEffect(() => {
		try {
			if (typeof window !== "undefined") {
				if (user) {
					window.localStorage.setItem("afriviral:user", JSON.stringify(user));
				} else {
					window.localStorage.removeItem("afriviral:user");
				}
			}
		} catch (err) {
			console.warn("AuthProvider: impossible de persister l'utilisateur", err);
		}
	}, [user]);

	const login = useCallback(async (email, password) => {
		console.log("login invoked", { email, password });
		// TODO: appeler votre API puis setUser(utilisateur)
		setUser({ id: "demo", email });
		return { ok: true };
	}, []);

	const logout = useCallback(() => {
		console.log("logout invoked");
		setUser(null);
	}, []);

	const register = useCallback(async (userData) => {
		console.log("register invoked", userData);
		// TODO: appeler votre API d'inscription puis setUser(utilisateur)
		setUser({ id: "demo", ...userData });
		return { ok: true };
	}, []);

	// Mémoïse les valeurs exposées pour éviter des re-rendus inutiles
	const value = useMemo(() => ({ user, isAuthenticated, login, logout, register }), [user, isAuthenticated, login, logout, register]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (ctx === undefined) {
		throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
	}
	return ctx;
}

export default AuthContext;


