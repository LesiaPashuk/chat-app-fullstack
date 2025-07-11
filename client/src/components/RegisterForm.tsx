import { useForm } from "react-hook-form"
import {v1} from 'uuid'
import bgImage from '../styles/h12IFrREDMQ.jpg'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export type FormType={
  name: string;
  email: string;
  passwordFirst: string;
  passwordSecond: string;
}
export type RequestType={
    name:string, 
    email:string, 
    password:string, 
    id:string
}
export const RegisterForm =()=>{
    const {
        watch, 
        register, 
        handleSubmit,
        formState:{errors}, 
        reset, 
    }=useForm<FormType>()
    const onSubmit=async (data:FormType)=>{
      try{
         if (data.passwordFirst !== data.passwordSecond) {
          alert("Passwords don't match");
          return;
    }
         const dataString: RequestType= { 
            name:data.name, 
            email:data.email, 
            password:data.passwordFirst, 
            id:v1()
          }
           const response =await axios.post('http://localhost:5000/register', dataString)
           if (response.status === 201) {
      alert('Registration successful!');
   
    }}
      catch(err){
console.error('Ошибка регистрации:', err);

alert(err.response.data.message)
      }
        }
    const handleClear =()=>{
        reset()
    }
    return (
        <div className="flex h-screen">
           
      <div className="w-1/2 flex items-center justify-center bg-[#edfdff] relative">
    <div className="absolute top-4 left-4"> {/* Позиционирование */}
        <Link to="/">
          <button className="tracking-wide font-semibold bg-[#89bdf8] text-white w-[60px] h-[40px] rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
            <span>Back</span>
          </button>
        </Link>
      </div>
          <form onSubmit={handleSubmit(onSubmit)}className="w-full max-w-md p-8">
        <div className="mt-0  flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold mb-8">
              Sign up
            </h1>
          </div>

        <div>
            <input 
            type="text" 
            id ="name"
            placeholder="Enter your name"
             style={{
                WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
                WebkitTextFillColor: "#333",
              }}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
              
           {
                ...register('name', {
                    required:"The name is required", 
                    pattern:{
                        value:/^[A-Z]{3,}$/i, 
                        message:"Only letters (more than 3)"
                    }
                   
                })
            }
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div>
            <input 
            type="email"
            id="email"
            placeholder="Enter your email"
            style={{
                WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
                WebkitTextFillColor: "#333",
              }}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              
            {...register('email', {
                required:"Email is required", 
                pattern:{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message:"Incorrect email address"
                }
            })}
            ></input>
            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
            <input
            type="password" 
            id="passwordFirst"
            placeholder="Create a new password" 
            style={{
                WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
                WebkitTextFillColor: "#333",
              }}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              
            {...register('passwordFirst', {
                required: "Required",
                minLength:{
                     value: 6, 
                     message: "Minimum of 6 symbols" 
                }
            })} />
            {errors.passwordFirst && <p style={{ color: 'red' }}>{errors.passwordFirst.message}</p>}
        </div>
         <div>
          
            <input type="password" 
            id="passwordSecond"
            placeholder="Repeat the password" 
            style={{
                WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
                WebkitTextFillColor: "#333",
              }}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              
            {...register('passwordSecond', {
                required: "Required",
                minLength:{
                     value: 6, 
                     message: "Minimum of 6 symbols" 
                },
                validate: (val)=>{
                    if(watch('passwordFirst')!==val){
                        return "Your passwords do no match"
                    }
                }
            })} />
             {errors.passwordSecond && <p style={{ color: 'red' }}>{errors.passwordSecond.message}</p>}
        </div>
        <div>
            <button
            type="submit"
            className="mt-5 tracking-wide font-semibold bg-[#150082] text-gray-100 w-full py-4 rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            <span className="ml-3">Create</span>
          </button>
            <button type="button" onClick={handleClear} className="mt-5 tracking-wide font-semibold bg-[#89bdf8] text-gray-100 w-full py-4 rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                 <span className="ml-3">Clean</span>
            </button>
        </div>
    </form>
    
    </div>
    <div className="flex-1 bg-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
      </div>
    </div>)
}