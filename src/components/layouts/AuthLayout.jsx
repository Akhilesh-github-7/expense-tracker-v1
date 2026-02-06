import React from 'react'
import { LuTrendingUpDown } from "react-icons/lu"

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 items-center justify-center p-6'>
        <div className='w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 p-8 md:p-12 flex flex-col transform transition-all duration-500 hover:scale-[1.01]'>
            <div className='flex items-center justify-center gap-3 mb-8'>
              <div className='bg-gradient-to-br from-primary to-violet-600 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 ring-4 ring-primary/5'>
                <LuTrendingUpDown size={26} />
              </div>
              <h2 className='text-3xl font-bold text-slate-900 tracking-tight font-display'>Expensy</h2>
            </div>
            
            <div className='flex-1 flex flex-col justify-center w-full'>
              {children}
            </div>

            <p className='text-slate-400 text-xs mt-8 text-center'>
              &copy; {new Date().getFullYear()} Expensy. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default AuthLayout
