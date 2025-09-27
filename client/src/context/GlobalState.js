import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
	transactions: [],
	error: null,
	loading: false,
	user: JSON.parse(localStorage.getItem("user")), // new
	token: localStorage.getItem("token"), // new
	isAuthenticated: false, // new
};

// Use environment variable in production, localhost in dev
const API = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

// Add token to axios headers if present
API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions
	async function login(credentials) {
		try {
			const res = await API.post("/auth/login", credentials);

			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data.user));

			dispatch({
				type: "LOGIN_SUCCESS",
				payload: res.data,
			});

			// fetch user's transactions after login
			getTransactions();
		} catch (err) {
			dispatch({
				type: "AUTH_ERROR",
				payload: err.response?.data?.error || "Login failed",
			});
		}
	}

	async function signup(credentials) {
		try {
			const res = await API.post("/auth/signup", credentials);

			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data.user));

			dispatch({
				type: "SIGNUP_SUCCESS",
				payload: res.data,
			});

			// fetch user's transactions after signup
			getTransactions();
		} catch (err) {
			dispatch({
				type: "AUTH_ERROR",
				payload: err.response?.data?.error || "Signup failed",
			});
		}
	}

	function logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		dispatch({ type: "LOGOUT" });
	}

	async function getTransactions() {
		try {
			const res = await API.get("/api/v1/transactions"); // ✅ use API

			dispatch({
				type: "GET_TRANSACTIONS",
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response?.data?.error || "Server error",
			});
		}
	}

	async function deleteTransaction(id) {
		try {
			await API.delete(`/api/v1/transactions/${id}`); // ✅ use API

			dispatch({
				type: "DELETE_TRANSACTION",
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response?.data?.error || "Server error",
			});
		}
	}

	async function addTransaction(transaction) {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await API.post("/api/v1/transactions", transaction, config); // ✅ use API

			dispatch({
				type: "ADD_TRANSACTION",
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response?.data?.error || "Server error",
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				getTransactions,
				deleteTransaction,
				addTransaction,
				login, // new
				logout, // new
				signup,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
