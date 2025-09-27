import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import ProfilePopup from "./ProfilePopup";
import { useNavigate } from "react-router-dom";

export const Header = () => {
	const { user } = useContext(GlobalContext);
	const navigate = useNavigate();
	return (
    <div style={{ display: "flex", alignItems:"center", justifyContent:"space-between" }}>
			<h2>Expense Tracker</h2>
			<div className='flex items-center justify-center'>
				{user ? (
					<ProfilePopup user={user} />
				) : (
					<div
						onClick={() => navigate("/login")}
						className='border-2 focus:outline-none border-yellow-400 px-5 py-2 font-semibold hover:bg-yellow-500 hover:text-white hover:cursor-pointer transition-colors'
					>
						Sign In
					</div>
				)}
			</div>
		</div>
	);
};
