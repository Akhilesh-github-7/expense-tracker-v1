import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../Utils/helper'

const IncomeOverview = ({transactions,onAddIncome}) => {

    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const result = prepareIncomeBarChartData(transactions)
        setChartData(result);

        return()=>{}
    },[transactions])
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex items-center justify-between mb-6'>
            <div className=''>
                <h5 className='text-lg font-semibold text-slate-800'>Income Overview</h5>
                <p className='text-xs text-slate-500 mt-1'>Track your earnings over time.</p>
            </div>
             
             <button className='flex items-center gap-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg shadow-md shadow-primary/20 transition-all' onClick={onAddIncome}>
                <LuPlus size={18}/> Add Income
             </button>
        </div>
      <div className='mt-4'>
       <CustomBarChart data={chartData}/>
      </div>
    </div>
  )
}

export default IncomeOverview