import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Signup = () => {
	const navigate = useNavigate();
	const { signup, user, loading, error } = useContext(GlobalContext);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [rePass, setRePass] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(formData);
	};

	useEffect(() => {
		if (user) navigate("/");
	}, [user, navigate]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleRePass = (e) => {
		setRePass(e.target.value);
	};

	const isSamePass = () => {
		return formData.password === rePass;
	};

	return (
		<div className='login-container'>
			<form onSubmit={handleSubmit} className='login-form'>
				{/* Title */}
				<h1 className='login-title'>Register for your experience</h1>
				{error && <p className='error-message'>{error}</p>}
				{/* Form Fields */}
				<div className='form-group' style={{ width: "100%" }}>
					{/* First + Last Name */}
					<div className='input-wrapper' style={{ width: "100%" }}>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							className='input-field'
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							className='input-field'
							value={formData.lastName}
							onChange={handleChange}
						/>
					</div>

					{/* Email */}
					<input
						type='text'
						name='email'
						placeholder='your@example.com'
						className='input-field'
						value={formData.email}
						onChange={handleChange}
						required
					/>

					{/* Password */}
					<input
						type='password'
						name='password'
						placeholder='Enter your password'
						className='input-field'
						value={formData.password}
						onChange={handleChange}
						required
					/>

					{/* Confirm Password */}
					<input
						type='password'
						name='rePass'
						placeholder='Confirm your password'
						className={`input-field ${
							isSamePass() ? "focus-valid" : "focus-invalid"
						}`}
						value={rePass}
						onChange={handleRePass}
						required
					/>
				</div>

				{/* Button + Footer */}
				<div className='form-footer'>
					<button
						disabled={!isSamePass()}
						type='submit'
						className={`submit-btn ${!isSamePass() ? "disabled" : ""}`}
					>
						Sign up
					</button>

					<div className='signup-link'>
						<p>Already have an account?</p>
						<Link to='/login'>Click here!</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Signup;
