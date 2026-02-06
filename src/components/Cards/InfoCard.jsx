import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex items-center gap-4 md:gap-6 bg-white p-5 md:p-6 rounded-3xl shadow-sm hover:shadow-md border border-slate-100/50 transition-all duration-300 hover:-translate-y-1 cursor-default'>
        <div className={`w-12 h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center text-2xl md:text-[26px] text-white ${color} rounded-2xl md:rounded-full drop-shadow-md`}>
            {icon}
        </div>
        <div className='min-w-0'>
            <h6 className='text-xs md:text-sm text-slate-500 mb-0.5 md:mb-1 font-bold uppercase tracking-wider'>{label}</h6>
            <span className='text-xl md:text-2xl font-black text-slate-800 block truncate'>₹{value}</span>
        </div>
    </div>
  )
}

export default InfoCard