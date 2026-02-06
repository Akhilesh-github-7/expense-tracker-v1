import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../Utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../Utils/uploadImage";
import toast from "react-hot-toast";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName){
      toast.error("Please enter your name")
      return
    }
    if(!validateEmail(email)){
      toast.error("Please enter a valid email address")
      return
    }
    if(!password || password.length < 8){
      toast.error("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try{
      // upload image
      if (profilePic){
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      })
      const { token, user} = response.data

      if (token){
        localStorage.setItem("token", token)
        updateUser(user)
        toast.success("Account created successfully!")
        navigate("/dashboard")
      }
    }catch(error){
      if(error.response && error.response.data.message){
        toast.error(error.response.data.message)
      }else{
        toast.error("Something went wrong. Please try again")
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-black mb-1">Create an Account</h3>
        <p className="text-sm text-slate-500 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
         <div className="mb-4">
           <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
         </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Your Name"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="max@example.com"
              type="text"
            />

           <div className="col-span-1 md:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
           </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className={`btn-primary w-full flex items-center justify-center transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? "CREATING ACCOUNT..." : "SIGN UP"}
            </button>
          </div>

          <p className="text-[13px] text-slate-600 text-center mt-4">
            Already have an account?{" "}
            <Link className="font-semibold text-primary hover:underline transition-all" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
