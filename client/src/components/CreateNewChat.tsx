import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
type createChatProps={
    changeButtonNewChatStatus:(newStatus:boolean)=>void
    submitCodeValue:(newChat:string, newIMG:string|undefined)=>void
}
export type FormCreateChatType={
  name:string, 
  img?:string, 
  code:string, 
}

export const CreateNewChat=(props:createChatProps)=>{
  const search =useParams()

  const {
    register, 
    handleSubmit, 
    formState:{errors}, 
  }=useForm<FormCreateChatType>()
  
  const onSubmit=async(data:FormCreateChatType)=>{
    try{
      console.log(search.id , " ", search.chatRoom)
      const formDate = new FormData()
      formDate.append("name", data.name)
      formDate.append('code', data.code)
      const imgFile=(document.getElementById('img') as HTMLInputElement)?.files?.[0]
      if(imgFile)
        formDate.append('img', imgFile)
      
      const response = await axios.post(`http://localhost:5000/chat/${search.id}/${search.chatRoom}`, formDate, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }})
      if(response.status===201){
        props.submitCodeValue(response.data.name, response.data.img)
        alert('Create successful!')
      }
    }
    catch(err){
      console.error('Create room error', err)
    }
  }
  const changeButtonAddStatus=()=>{
    props.changeButtonNewChatStatus(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[500px] = bg-[#e4f6fa] rounded-lg p-4">
        <h2 className="text-xl font-bold text-center mb-1  text-[#150082]">Create new chat</h2>
        <div className="flex gap-2"> 
            <form onSubmit={handleSubmit(onSubmit)}className="w-full max-w-md p-8">
            <div className="mb-3">
          <input
            type="text"
            id="name"
            placeholder="Enter room's name"
            style={{
              WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
              WebkitTextFillColor: "#333",
            }}
            className="flex-grow px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
         {...register('name', {
          required:"The name is required",
           pattern:{
                        value:/^[A-Z]{3,}$/i, 
                        message:"Only letters (more than 3)"
                    }
         })} />
         {errors.name&&<p style={{ color: 'red' }}>{errors.name.message}</p>}
         </div>
         <div className="mb-3">
         <input 
         type='text'
         id='code'
         placeholder="Create unique code"
          style={{
              WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
              WebkitTextFillColor: "#333",
            }}
            className="flex-grow px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
         {...register('code', {
          required: "Required",
                minLength:{
                     value: 6, 
                     message: "Minimum of 6 symbols" 
                }
         })}
         ></input>
           {errors.code && <p style={{ color: 'red' }}>{errors.code.message}</p>}
         </div>
         <div className="mb-3">
         <input type="file"
         id='img'
         placeholder='Add photo'
         style={{
              WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
              WebkitTextFillColor: "#333",
            }}
            className="flex-grow px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
         {...register('img')}
         ></input>
         </div>
             <div className="flex gap-3 justify-center">
          <button
            type="submit"
            className="flex-shrink-0 tracking-wide font-semibold bg-[#150082] text-gray-100 w-[60px] h-[40px] rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"

          >
            Create
          </button>
          <button 
          type='button'
          className="flex-shrink-0 tracking-wide font-semibold bg-[#820027] text-gray-100 w-[60px] h-[40px] rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            onClick={changeButtonAddStatus}
            >Exit</button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}
