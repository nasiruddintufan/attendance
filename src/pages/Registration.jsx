import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate,  } from 'react-router'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { toast, ToastContainer } from 'react-toastify';

const Registration = () => {
    const navigate=useNavigate();
    const [registerData,setRegisterdata] = useState({
        fullname:'',
        email:'',
        password:'',
    })
    const [error,seterror] = useState({
        fullname:'',
        email:'',
        password:'',
    })
    const [loading, setloading] = useState(false)
    const auth = getAuth();
    const db = getDatabase();
    const Handlesignup=()=>{
      setloading(true)
        seterror({
            fullname:'',
            email:'',
            password:'',
        })
        if(!registerData.fullname){
          setloading(false)
          return seterror((prev)=>({...prev,fullname:"! Enter Your Full Name"}))
        }
    createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
    
    .then((res) => {
        updateProfile(auth.currentUser, {
            displayName: registerData.fullname
          }).then(() => 
            {set(ref(db, "users/" + res.user.uid), {
            displayName: res.user.displayName,
            email: res.user.email,
          }).then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              toast.success(
                "registration Successfull,Please Verify Your Email"
              );
              setTimeout(() => {
                navigate("/login");
              }, 4000);
            });
          });
            
          }).catch((error) => {});
    })

    .catch((error) => {
      setloading(false); //eikhan e kn nilo nich theke error er modhhe cilo prothom e 
        const errorCode = error.code;
        if(errorCode=="auth/invalid-email"){
            return seterror((prev)=>({...prev,email:"A Valid Email is Required !"}))
        }
        if(errorCode=="auth/missing-email"){
            return seterror((prev)=>({...prev,email:"A Valid Email is Required !"}))
        }
        if (errorCode == "auth/email-already-in-use") {
          return seterror((prev) => ({
            ...prev,
            email: "Email is already used",
          }));
        }
        if(errorCode=="auth/missing-password"){
            return seterror((prev)=>({...prev,password:"Password is Required !"}))
        }
        if(errorCode=="auth/weak-password"){
            return seterror((prev)=>({...prev,password:"Enter a Strong Password"}))
        }
    })
}
    
  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer position="top-right" />
      <div className=" px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          <div className="text-3xl text-center font-bold">Registration</div>
          <div className="mt-5">
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              onChange={(e) =>
                setRegisterdata((prev) => ({
                  ...prev,
                  fullname: e.target.value,
                }))
              }
              className="border rounded-lg px-3 py-2 mt-1  text-sm w-full"
              type="text"
              id="fullname"
            />
            {error.fullname && (
              <p className="rounded m-1 font-bold text-red-600 w-fit">
                {error.fullname}
              </p>
            )}
            <label
              className="font-semibold text-sm text-gray-600 pb-1 mt-4 block"
              htmlFor="login"
            >
              E-mail
            </label>
            <input
              onChange={(e) =>
                setRegisterdata((prev) => ({ ...prev, email: e.target.value }))
              }
              className="border rounded-lg px-3 py-2 mt-1  text-sm w-full"
              type="email"
              id="login"
            />
            {error.email && (
              <p className="rounded m-1 font-bold text-red-600 w-fit">
                {error.email}
              </p>
            )}
            <label
              className="font-semibold text-sm text-gray-600 pb-1 mt-4 block"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={(e) =>
                setRegisterdata((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
              type="password"
              id="password"
            />
            {error.password && (
              <p className=" rounded m-1 font-bold text-red-600 w-fit">
                {error.password}
              </p>
            )}
          </div>
          <div className="flex justify-center w-full mt-5 items-center">
            <div>
              <button className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                <FcGoogle />
                <span className="ml-2">Sign in with Google</span>
              </button>
            </div>
          </div>
          <div className="mt-5">
            <button
              onClick={Handlesignup}
              className={`py-2 px-4 ${
                loading ? "bg-blue-600/50" : "bg-blue-600"
              } bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
              type="submit"
              disabled={loading}
            >
              Sign up
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            <Link
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              to="/login"
            >
              or sign in
            </Link>
            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration
