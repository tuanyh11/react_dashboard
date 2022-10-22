
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/api";

const Login = () => {

  const [dataForm, setDataForm] = useState({
    password: "",
    email: ""
  });

  const [error, setError] = useState({})

  const [showPassword, setShowPassword] = useState(false)

  const [isSubmit, setIsSubmit] = useState(false)

  const [errorRes, setErrorRes] = useState()

  const navigation = useNavigate()

  useEffect(() => {
    if(isSubmit && Object.keys(error ? error : {}).length === 0)  {
        (async () => {
            try {
               const {data} =  await login(dataForm)
               localStorage.setItem('user', JSON.stringify(data.data))
               navigation("/")
            } catch (error) {
                setErrorRes(error.response.data.message)
            }
        })()
    }
    setIsSubmit(false)  
  }, [isSubmit])


  const handleOnSubmit = (e) => {
    e.preventDefault()
    setErrorRes(null)
    if(!dataForm.email  && !dataForm.password) {
        setError(pre => ({...pre, 
            email: "email is required",
            password: "password is required"
        }))
    }

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(dataForm.email)) {
        setError( 
            pre => ({
            ...pre,
            email: "incorrect email"
        }))
    }

    setIsSubmit(true)
  }

  const handleOnChange = (e) => {
    if(error?.[e.target.name]) {
        delete error[e.target.name]
    }
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    })
  }


  return (
    <div>
      <div className="relative  h-[100vh]">
        <div className="absolute left-1/2  py-[80px] w-[660px] px-[75px] border rounded-md bg-white top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <form className="" onSubmit={(e) => handleOnSubmit(e)}>
            <div className="flex items-center justify-center text-3xl uppercase ">
                Login
            </div>
            <div className="mt-[70px]">

              <div className="flex flex-col !mb-5">
                <span className="text-sm font-medium mb-1">Email</span>
                {error?.email && <p className="text-sm mb-1 text-red-500">{error.email}</p>} 
                <input
                  onChange={handleOnChange}
                  name="email"
                  value={dataForm.email}
                  type="text"
                  className="outline-none  border !py-3 px-3 rounded-md text-sm"
                />
              </div>

              <div className="flex flex-col !mb-5">
                <span className="text-sm font-medium mb-1">Password</span>
                {error?.password && <p className="text-sm mb-1 text-red-500">{error.password}</p>} 
                <input
                  onChange={handleOnChange}
                  name="password"
                  value={dataForm.password}
                  
                  type={showPassword ? "text" : "password" }
                  className="outline-none  border !py-3 px-3 rounded-md text-sm"
                />
              </div>


              <div className="flex items-center justify-between">
                <div className="flex items-center !mt-5">
                  <input type="checkbox" name="" id="" onChange={() => setShowPassword(pre => !pre)} />
                  <span className="text-sm font-medium ml-3">
                    Show password
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <button className="block w-full text-white bg-primary transition rounded-md mt-6 h-[55px]  opacity-80 hover:opacity-100 capitalize">
                {"login"}
              </button>
            </div>
          </form>
          {errorRes && 
            <div className="text-md mt-10 capitalize text-red-500">
                {errorRes}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;


