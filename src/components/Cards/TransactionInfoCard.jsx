import React from 'react'
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu'
import { getProfileImageUrl } from '../../Utils/helper'

const TransactionInfoCard = ({title, icon, date, amount, type, hideDeleteBtn, onDelete}) => {

    const getAmountStyles = ()=> 
        type === "income" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
    
  return (
    <div className='group relative flex items-center gap-4 mt-3 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-300'>
        <div className='w-12 h-12 flex items-center justify-center text-xl text-slate-600 bg-slate-100 rounded-xl'>
            {icon ? (
                <img src={getProfileImageUrl(icon)} alt={title} className='w-6 h-6' />
            ) : (
                <LuUtensils/>
            )
            }

        </div>
      <div className='flex-1 flex items-center justify-between'>
        <div>
            <p className='text-sm text-slate-800 font-semibold'>{title}</p>
            <p className='text-xs text-slate-400 mt-0.5'>{date}</p>
        </div>
        <div className='flex items-center gap-2'>
            {!hideDeleteBtn && (
                <button className='p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer'
                onClick={onDelete}>
                    <LuTrash2 size={16}/>
                </button>
            )}

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getAmountStyles()}`}>
                <h6 className='text-xs font-bold'>
                {type === "income" ? "+" : "-"} ₹{amount}</h6>
                {type === "income" ? <LuTrendingUp size={14}/> : <LuTrendingDown size={14}/>}

            </div>

        </div>
        </div>
    </div>
  )
}

export default TransactionInfoCard