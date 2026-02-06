import React from 'react'
import { LuTrendingUpDown } from "react-icons/lu"
import card1 from "../../assets/images/card1.gif"

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-white'>
        <div className='w-full md:w-[60vw] px-8 md:px-16 lg:px-24 py-12 flex flex-col'>
            <div className='flex items-center gap-2 mb-10'>
              <div className='bg-primary w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20'>
                <LuTrendingUpDown size={24} />
              </div>
              <h2 className='text-2xl font-bold text-slate-900 tracking-tight'>Expensy</h2>
            </div>
            
            <div className='flex-1 flex flex-col justify-center max-w-md mx-auto w-full'>
              {children}
            </div>

            <p className='text-slate-400 text-xs mt-10'>
              &copy; {new Date().getFullYear()} Expensy. All rights reserved.
            </p>
        </div>

        <div className='hidden md:flex w-[40vw] bg-slate-50 border-l border-slate-100 p-12 relative overflow-hidden flex-col justify-between'>
            <div className='relative z-10'>
                <StatsInfoCard
                  icon={<LuTrendingUpDown/>}
                  label="Track Your Income & Expenses"
                  value="4,30,000"
                  color="bg-primary"
                />
            </div>

            <div className='relative mt-auto'>
              <div className='absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl' />
              <div className='absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl' />
              
              <img 
                className='relative w-full rounded-2xl shadow-2xl shadow-slate-200 border border-white' 
                src={card1} 
                alt="Dashboard Preview" 
              />
            </div>
        </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({icon, label , value ,color})=>{
    return (
      <div className='flex items-center gap-4 bg-white p-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 w-fit'>
        <div className={`w-12 h-12 flex items-center justify-center text-2xl text-white ${color} rounded-xl shadow-lg shadow-primary/30`}>
          {icon}
        </div>
        <div>
          <h6 className='text-xs font-medium text-slate-500 mb-0.5'>{label}</h6>
          <span className='text-xl font-bold text-slate-900'>₹{value}</span>
        </div>
      </div>
    )
}
