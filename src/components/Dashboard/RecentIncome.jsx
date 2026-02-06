import React from 'react'
import { LuArrowRight, LuInbox } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const RecentIncome = ({transactions,onSeeMore}) => {
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex items-center justify-between mb-6'>
            <div>
              <h5 className='text-lg font-bold text-slate-800'>Recent Income</h5>
              <p className='text-xs text-slate-400 mt-0.5'>Your latest earnings</p>
            </div>

            <button className='flex items-center gap-2 text-sm font-semibold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all' onClick={onSeeMore}>
              See All <LuArrowRight size={16} />
            </button>
        </div>

        <div className='space-y-1'>
            {transactions?.length > 0 ? (
              transactions?.slice(0,5)?.map((item)=>(
                  <TransactionInfoCard
                  key={item._id}
                  title={item.source}
                  icon={item.icon}
                  date={moment(item.date).format("Do MMM YYYY")}
                  amount={item.amount}
                  type="income"
                  hideDeleteBtn/>
              ))
            ) : (
              <div className='flex flex-col items-center justify-center py-8 text-slate-400'>
                <LuInbox size={32} className='mb-2 opacity-50'/>
                <p className='text-sm'>No income recorded yet.</p>
              </div>
            )}
        </div>
    </div>
  )
}

export default RecentIncome

export default RecentIncome