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
      <div className='flex-1 flex items-center justify-between min-w-0'>
        <div className='min-w-0 pr-2'>
            <p className='text-sm text-slate-800 font-semibold truncate'>{title}</p>
            <p className='text-[11px] text-slate-400 mt-0.5'>{date}</p>
        </div>
        <div className='flex items-center gap-2 flex-shrink-0'>
            {!hideDeleteBtn && (
                <button className='p-2.5 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50 sm:opacity-0 group-hover:opacity-100 transition-all cursor-pointer'
                onClick={onDelete}>
                    <LuTrash2 size={16}/>
                </button>
            )}

            <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl ${getAmountStyles()}`}>
                <h6 className='text-xs font-bold whitespace-nowrap'>
                {type === "income" ? "+" : "-"} ₹{amount}</h6>
                {type === "income" ? <LuTrendingUp size={14} className='hidden xs:block'/> : <LuTrendingDown size={14} className='hidden xs:block'/>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard