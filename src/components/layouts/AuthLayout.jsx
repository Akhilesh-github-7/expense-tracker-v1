import React from 'react'
import { LuTrendingUpDown } from "react-icons/lu"
import card1 from "../../assets/images/card1.gif"

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-slate-50 items-center justify-center p-6'>
        <div className='w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-12 flex flex-col'>
            <div className='flex items-center justify-center gap-2 mb-10'>
              <div className='bg-primary w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20'>
                <LuTrendingUpDown size={24} />
              </div>
              <h2 className='text-2xl font-bold text-slate-900 tracking-tight'>Expensy</h2>
            </div>
            
            <div className='flex-1 flex flex-col justify-center w-full'>
              {children}
            </div>

            <p className='text-slate-400 text-xs mt-10 text-center'>
              &copy; {new Date().getFullYear()} Expensy. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default AuthLayout
