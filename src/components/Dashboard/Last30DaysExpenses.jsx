import React, { useEffect, useState } from 'react'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareExpenseBarChartData } from '../../Utils/helper'

const Last30DaysExpenses = ({ data }) => {
  
const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () =>{};
    },[data]);
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex items-center justify-between mb-4'>
            <div>
              <h5 className='text-lg font-bold text-slate-800'>Expense Trends</h5>
              <p className='text-xs text-slate-400 mt-0.5'>Last 30 days breakdown</p>
            </div>
        </div>

       <CustomBarChart data={chartData} xAxisKey='category'/>
    </div>
  )
}

export default Last30DaysExpenses

export default Last30DaysExpenses