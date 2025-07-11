import { Link, useNavigate } from "react-router-dom";
import { useForm, FieldError } from "react-hook-form";
import bgImage from '../styles/h12IFrREDMQ.jpg';
import axios from 'axios'
type ExitFormData={
  email:string, 
  password:string, 
}
export const Main = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExitFormData>();

  const onSubmit = async (data: ExitFormData ) => {
    try{
        const res =await axios.post('http://localhost:5000/', {
          email:data.email, 
          password:data.password, 
  })

    navigate(`/chat/${res.data._id}/un`)

   
  
  
   
    }
    catch(err){
      console.error('Ошибка входа:', err);
      alert('Неверный email или пароль');
}
  };


  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-[#edfdff]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8">
          <div className="mt-0  flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold mb-8">
              Sign in
            </h1>
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Введите email"
              style={{
                WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
                WebkitTextFillColor: "#333",
              }}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
              {...register("email", {
                required: " Email обязателен",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Некорректный email",
                },
              })}
            />
            {errors.email && (
 <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              style={{
                WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
                WebkitTextFillColor: "#333",
              }}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 6,
                  message: "Минимум 6 символов",
                },
              })}
            />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="mt-5 tracking-wide font-semibold bg-[#150082] text-gray-100 w-full py-4 rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            <span className="ml-3">Next</span>
          </button>
          <Link to="/register">
            <button
              type="button"
              className="mt-5 tracking-wide font-semibold bg-[#89bdf8] text-gray-100 w-full py-4 rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                 strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">Sign Up</span>
            </button>
          </Link>
          <p className="mt-6 text-xs text-gray-600 text-center">
            I agree to abide by templatana's&nbsp;
            <a href="#" className="border-b border-gray-500 border-dotted">
              Terms of Service&nbsp;
            </a>
            and its&nbsp;
            <a href="#" className="border-b border-gray-500 border-dotted">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
      <div className="flex-1 bg-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
      </div>
    </div>
  );
};
