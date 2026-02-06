import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../Utils/helper'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({transactions,onExpenseIncome}) => {

    const [chartData, setChartData]= useState([])

    useEffect(()=>{
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return()=>{};
    },[transactions])
  return <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex items-center justify-between mb-6'>
            <div className=''>
                <h5 className='text-lg font-semibold text-slate-800'>Expense Overview</h5>
                <p className='text-xs text-slate-500 mt-1'>Track your spending trends over time.</p>

            </div>

            <button className='flex items-center gap-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg shadow-md shadow-primary/20 transition-all' onClick={onExpenseIncome}>
                <LuPlus size={18}/>
                Add Expense
            </button>

        </div>
        <div className='mt-4'>
            <CustomLineChart data={chartData}/>

        </div>

    </div>
  
}

export default ExpenseOverview