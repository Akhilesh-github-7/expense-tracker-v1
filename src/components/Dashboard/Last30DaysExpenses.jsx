import React, { useEffect, useState } from 'react'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareExpenseBarChartData } from '../../Utils/helper'

const Last30DaysExpenses = ({ data }) => {
  
    const [chartData, setChartData] = useState([])
    const [stats, setStats] = useState({ total: 0, topCategory: "" })

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        // Calculate stats
        const total = result.reduce((acc, curr) => acc + curr.amount, 0);
        const top = result.length > 0 ? [...result].sort((a, b) => b.amount - a.amount)[0].category : "";
        
        setStats({ total, topCategory: top });

        return () =>{};
    },[data]);

  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
            <div>
              <h5 className='text-lg font-bold text-slate-800'>Expense breakdown</h5>
              <p className='text-xs text-slate-400 mt-0.5'>Last 30 days by category</p>
            </div>

            {chartData.length > 0 && (
                <div className='flex items-center gap-4'>
                    <div className='text-right'>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Total Spent</p>
                        <p className='text-sm font-bold text-red-500'>₹{stats.total.toLocaleString()}</p>
                    </div>
                    <div className='w-px h-8 bg-slate-100'></div>
                    <div className='text-right'>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Top Category</p>
                        <p className='text-sm font-bold text-slate-800'>{stats.topCategory}</p>
                    </div>
                </div>
            )}
        </div>

       <CustomBarChart data={chartData} xAxisKey='category'/>
    </div>
  )
}

export default Last30DaysExpenses