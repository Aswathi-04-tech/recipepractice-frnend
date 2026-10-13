import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/allApi";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const result = loginApi(formData);
  //   setLoading(false);
  //   if(result.status ===200 || result.status ===201){
  //     localStorage.setItem("token",JSON.stringify(result.data.user));
  //     alert(result.data.message);
  //     navigate("/home");

  //   }else{
  //     alert("something went wrong");
  //   }


    
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const result = await loginApi(formData);

    setLoading(false);

    if (result.status === 200 || result.status === 201) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      alert(result.data.message);
      if(result.data.user.email === "admin@gmail.com"){
        navigate("/AdminDaashbord");
      }else{
        navigate("/home");
      }
    } else {
      alert(result.data.message);
    }

  } catch (error) {
    setLoading(false);

    console.log(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">Login to manage your orders and cart</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email input field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition bg-gray-50/50"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-2xl pl-4 pr-12 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition bg-gray-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-xs font-semibold text-gray-500 hover:text-black transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember and Forgot options */}
          <div className="flex justify-between items-center text-xs font-medium">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-black focus:ring-black/50 accent-black w-4 h-4 cursor-pointer"
              />
              Remember Me
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Reset password link sent to email."); }} className="text-black hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-neutral-800 disabled:bg-neutral-400 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Log In"
            )}
          </button>

          {/* Sign Up Redirect */}
          <p className="text-center text-xs font-medium text-gray-500">
            Don't have an account?
            <Link to="/register" className="text-black font-bold ml-1.5 hover:underline">
              Register Here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
