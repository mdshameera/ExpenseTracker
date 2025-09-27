export default (state, action) => {
	switch (action.type) {
		case "GET_TRANSACTIONS":
			return {
				...state,
				loading: false,
				transactions: action.payload,
			};
		case "DELETE_TRANSACTION":
			return {
				...state,
				transactions: state.transactions.filter(
					(transaction) => transaction._id !== action.payload
				),
			};
		case "ADD_TRANSACTION":
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			};
		case "TRANSACTION_ERROR":
			return {
				...state,
				error: action.payload,
			};

		// Auth cases
		case "LOGIN_SUCCESS":
		case "SIGNUP_SUCCESS":
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false,
				error: null,
			};
		case "AUTH_ERROR":
		case "LOGOUT":
			return {
				...state,
				user: null,
				token: null,
				isAuthenticated: false,
				loading: false,
				error: action.payload || null,
			};
		default:
			return state;
	}
};
