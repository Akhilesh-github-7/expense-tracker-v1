import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100/50 transition-all duration-300 hover:-translate-y-1 cursor-default'>
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-md`}>
            {icon}
        </div>
        <div>
            <h6 className='text-sm text-slate-500 mb-1 font-medium'>{label}</h6>
            <span className='text-2xl font-bold text-slate-800'>₹{value}</span>
        </div>
    </div>
  )
}

export default InfoCard