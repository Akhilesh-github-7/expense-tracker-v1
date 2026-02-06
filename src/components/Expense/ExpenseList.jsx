import React from 'react'
import { LuDownload, LuInbox } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({transactions,onDelete,onDownload}) => {
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex items-center justify-between mb-6'>
            <h5 className='text-lg font-semibold text-slate-800'>Expense History</h5>

            <button className='flex items-center gap-2 text-sm text-slate-600 hover:text-primary bg-slate-50 hover:bg-primary/5 px-3 py-2 rounded-lg border border-slate-200 transition-all' onClick={onDownload}>
                <LuDownload size={16} /> Download
            </button>

        </div>

        {transactions?.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {transactions?.map((expense) => (
                    <TransactionInfoCard
                    key={expense._id}
                    title={expense.category}
                    icon={expense.icon}
                    date={moment(expense.date).format("Do MMM YYYY")}
                    amount={expense.amount}
                    type="expense"
                    onDelete={()=> onDelete(expense._id)}/>
                ))}

            </div>
        ) : (
            <div className='flex flex-col items-center justify-center py-10 text-slate-400'>
                <LuInbox size={40} className='mb-2 opacity-50'/>
                <p>No expense records found.</p>
            </div>
        )}

    </div>
  )
}

export default ExpenseList