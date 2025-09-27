import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { IoEyeOutline, IoEyeOffOutline, IoMailOutline } from "react-icons/io5";
import { FiKey } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const { login, error, loading, user } = useContext(GlobalContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPass, setShowPass] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(formData);
	};

	useEffect(() => {
		if (user) navigate("/");
	}, [user, navigate]);

	return (
		<div className='login-container'>
			<form onSubmit={handleSubmit} className='login-form'>
				<h1 className='login-title'>Enter your Space</h1>

				{/* Email */}
				<div className='form-group'>
					<div className='input-wrapper'>
						<IoMailOutline className='icon' />
						<input
							type='email'
							name='email'
							placeholder='Email'
							className='input-field'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Password */}
					<div className='input-wrapper'>
						<FiKey className='icon' />
						<input
							type={showPass ? "text" : "password"}
							name='password'
							placeholder='Password'
							className='input-field'
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<div
							className='toggle-password'
							onClick={() => setShowPass((prev) => !prev)}
						>
							{showPass ? <IoEyeOutline /> : <IoEyeOffOutline />}
						</div>
					</div>
				</div>

				{/* Error Message */}
				{error && <p className='error-message'>{error}</p>}

				{/* Submit + Signup */}
				<div className='form-footer'>
					<button
						type='submit'
						disabled={loading}
						className={`submit-btn ${loading ? "disabled" : ""}`}
					>
						{loading ? "Signing In..." : "Sign In"}
					</button>
					<div className='signup-link'>
						<p> Don't have an account?</p>
						<Link to='/signup'>Click here!</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
