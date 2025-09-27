import React, { useState, useRef, useEffect, useContext } from "react";
import Avatar from "react-avatar";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GlobalContext } from "../context/GlobalState";

const ProfilePopup = ({ user }) => {
	const [open, setOpen] = useState(false);
	const popupRef = useRef(null);
	const { logout } = useContext(GlobalContext);

	// Close popup if clicked outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (popupRef.current && !popupRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = async () => {
		await logout();
	};

	return (
		<div ref={popupRef} className='profile-popup-wrapper'>
			{/* Profile Icon */}
			{user && (
				<div onClick={() => setOpen(!open)} className='profile-icon'>
					<Avatar
						name={`${user?.firstName || ""} ${user?.lastName || ""}`}
						color='oklch(85.2% 0.199 91.936)'
						round={true}
						size='40'
					/>
				</div>
			)}

			{/* Popup */}
			{user && open && (
				<div className='profile-popup-menu'>
					<div className='profile-popup-item'>
						<Avatar
							name={`${user?.firstName || ""} ${user?.lastName || ""}`}
							color='oklch(85.2% 0.199 91.936)'
							round={true}
							size='25'
						/>
						<p className='profile-popup-name'>
							{user?.firstName} {user?.lastName}
						</p>
					</div>
					<div className='profile-popup-item logout' onClick={handleLogout}>
						<RiLogoutCircleLine />
						<p>Log out</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfilePopup;
