import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875CF5","#FA2C37","#FF6900","#4f39f6"]

const RecentIncomeWithChart = ({data,totalIncome}) => {

    const [chartData,setChartData] = useState([])

    const prepareChartData = () =>{
        const dataArr = data?.map((item)=>({
            name: item?.source,
            amount: item?.amount
        }))

        setChartData(dataArr)
    }

    useEffect(()=>{
        prepareChartData();

        return () => {}
    },[data]);
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex items-center justify-between mb-2'>
            <div>
              <h5 className='text-lg font-bold text-slate-800'>Income Sources</h5>
              <p className='text-xs text-slate-400 mt-0.5'>Last 60 days distribution</p>
            </div>
        </div>
    
        <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor
        colors={COLORS}/>
    </div>
  )
}

export default RecentIncomeWithChart

export default RecentIncomeWithChart