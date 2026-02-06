import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'


const Input = ({value,onChange,placeholder,label,type}) => { 
    const [showPassword,setShowPassword] = useState(false)
    const toogleShowPassword = () =>{
        setShowPassword(!showPassword)
    }
  return (
    <div className='w-full'>
        <label className='text-xs font-medium text-slate-600 ml-1 mb-1 block'>{label}</label>
        <div className='flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 transition-all duration-200 focus-within:bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10'>
           <input 
            type={type == 'password' ? showPassword ? 'text': 'password' : type}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 font-medium" 
            value={value} 
            onChange={(e)=>onChange(e)}
           />
            {
                type === 'password' && (
                    <div className='ml-3 flex items-center'>
                        {showPassword ? (
                            <FaRegEye size={18} className='text-primary cursor-pointer hover:text-primary/80 transition-colors' onClick={()=>toogleShowPassword()}/>
                        ) : (
                            <FaRegEyeSlash size={18} className='text-slate-400 cursor-pointer hover:text-slate-600 transition-colors' onClick={()=> toogleShowPassword()}/>
                        ) }
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default Input