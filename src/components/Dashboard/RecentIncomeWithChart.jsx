import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875CF5","#FA2C37","#FF6900","#4f39f6"]

const RecentIncomeWithChart = ({data,totalIncome}) => {

    const [chartData,setChartData] = useState([])
    const [stats, setStats] = useState({ topSource: "" })

    const prepareChartData = () =>{
        if (!data || data.length === 0) return;

        // Aggregate by source
        const aggregated = data.reduce((acc, item) => {
            const source = item?.source || "Other";
            acc[source] = (acc[source] || 0) + item.amount;
            return acc;
        }, {});

        const dataArr = Object.keys(aggregated).map((key)=>({
            name: key,
            amount: aggregated[key]
        }));

        const top = dataArr.length > 0 ? [...dataArr].sort((a, b) => b.amount - a.amount)[0].name : "";

        setChartData(dataArr)
        setStats({ topSource: top })
    }

    useEffect(()=>{
        prepareChartData();

        return () => {}
    },[data]);
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2'>
            <div>
              <h5 className='text-lg font-bold text-slate-800'>Income Distribution</h5>
              <p className='text-xs text-slate-400 mt-0.5'>Last 60 days by source</p>
            </div>

            {chartData.length > 0 && (
                <div className='flex items-center gap-4'>
                    <div className='text-right'>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Total Income</p>
                        <p className='text-sm font-bold text-green-500'>₹{totalIncome.toLocaleString()}</p>
                    </div>
                    <div className='w-px h-8 bg-slate-100'></div>
                    <div className='text-right'>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Primary Source</p>
                        <p className='text-sm font-bold text-slate-800'>{stats.topSource}</p>
                    </div>
                </div>
            )}
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