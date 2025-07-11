import {useState} from 'react'
import React from 'react';
type AddChatProps={
  changeButtonAddChatStatus:(newStatus:boolean)=>void
  submitCodeValue:(codeValue:string, newIMG:string|undefined)=>void
}
export const AddChat = (props:AddChatProps) => {
     const [codeValue, setCodeValue]=useState("")
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setCodeValue(e.target.value)
    }

    const changeButtonAddStatus=()=>{
        props.changeButtonAddChatStatus(false)
    }
   
    const submitCodeValue=()=>{
      props.submitCodeValue(codeValue, undefined)
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[500px] = bg-[#e4f6fa] rounded-lg p-4">
        <div className="flex gap-2"> 
          <input
            type="text"
            id="name"
            placeholder="Enter room's code"
            value={codeValue}
            onChange={handleChange}
            style={{
              WebkitBoxShadow: "0 0 0 1000px #f3f4f6 inset",
              WebkitTextFillColor: "#333",
            }}
            className="flex-grow px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          />
          <button
            type="button"
            className="flex-shrink-0 tracking-wide font-semibold bg-[#150082] text-gray-100 w-[60px] h-[40px] rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            onClick={submitCodeValue}
          >
            Join
          </button>
          <button 
          type='button'
          className="flex-shrink-0 tracking-wide font-semibold bg-[#820027] text-gray-100 w-[60px] h-[40px] rounded-lg hover:bg-[#3a23ad] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            onClick={changeButtonAddStatus}>Exit</button>
        </div>
      </div>
    </div>
  );
};