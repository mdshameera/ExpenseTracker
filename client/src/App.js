import React from "react";
import { Header } from "./components/Header";
import { GlobalProvider } from "./context/GlobalState";

import "./App.css";
import Footer from "./components/Footer";
import { Route, Router, Routes } from "react-router-dom";
import Default from "./pages/Default";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Private from "./components/Private";

function App() {
	return (
		<GlobalProvider>
			<Routes>
				<Route
					path='/'
					element={
						<Private>
							<Default />
						</Private>
					}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
			<Footer />
		</GlobalProvider>
	);
}

export default App;
