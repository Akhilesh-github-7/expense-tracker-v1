import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async(e)=>{
    e.preventDefault()

    if (!validateEmail(email)){
      toast.error("Please enter a valid email address")
      return
    }

    if (!password){
      toast.error("Please enter the password")
      return
    }

    setIsLoading(true)

    //Login API Call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      })
      const { token, user} = response.data
      if(token){
        localStorage.setItem("token",token)
        updateUser(user)
        toast.success("Login Successful!")
        navigate("/dashboard")
      }
    }catch(error){
      if(error.response && error.response.data.message){
        toast.error(error.response.data.message)
      }else{
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-black mb-1">Welcome Back</h3>
        <p className="text-sm text-slate-500 mb-8">
          Please enter your credentials to access your account.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            value={email} 
            onChange={({ target })=> setEmail(target.value)} 
            label="Email Address" 
            placeholder="max@example.com" 
            type="text" 
          />

          <Input 
            value={password} 
            onChange={({ target })=> setPassword(target.value)} 
            label="Password" 
            placeholder="Enter your password" 
            type="password" 
          />

          <div className="flex justify-end">
            <Link to="#" className="text-xs font-medium text-primary hover:underline hover:text-primary/80 transition-all">
              Forgot Password?
            </Link>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className={`btn-primary w-full flex items-center justify-center transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </div>
          
          <p className="text-[13px] text-slate-600 text-center mt-4">
            Don't have an account?{" "}
            <Link className="font-semibold text-primary hover:underline transition-all" to="/signup">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
