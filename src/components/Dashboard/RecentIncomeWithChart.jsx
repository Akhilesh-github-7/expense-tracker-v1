import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875CF5","#FA2C37","#FF6900","#4f39f6"]

import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
import { LuInbox } from 'react-icons/lu'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6", "#10b981", "#f59e0b", "#3b82f6"]

const RecentIncomeWithChart = ({data,totalIncome}) => {

    const [chartData,setChartData] = useState([])
    const [stats, setStats] = useState({ topSource: "", topPercentage: 0, sourceCount: 0 })

    const prepareChartData = () =>{
        if (!data || data.length === 0) {
            setChartData([]);
            return;
        }

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

        // Sort to find the top source
        const sorted = [...dataArr].sort((a, b) => b.amount - a.amount);
        const top = sorted[0];
        const percentage = totalIncome > 0 ? Math.round((top.amount / totalIncome) * 100) : 0;

        setChartData(dataArr)
        setStats({ 
            topSource: top.name, 
            topPercentage: percentage,
            sourceCount: dataArr.length
        })
    }

    useEffect(()=>{
        prepareChartData();

        return () => {}
    },[data, totalIncome]);

  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
            <div>
              <h5 className='text-lg font-bold text-slate-800'>Income Distribution</h5>
              <p className='text-xs text-slate-400 mt-0.5'>Last 60 days by source</p>
            </div>

            {chartData.length > 0 ? (
                <div className='flex items-center gap-4'>
                    <div className='text-right'>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Sources</p>
                        <p className='text-sm font-bold text-slate-800'>{stats.sourceCount}</p>
                    </div>
                    <div className='w-px h-8 bg-slate-100'></div>
                    <div className='text-right'>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Top Source</p>
                        <p className='text-sm font-bold text-slate-800'>{stats.topSource} <span className='text-[10px] text-green-500 ml-0.5'>({stats.topPercentage}%)</span></p>
                    </div>
                </div>
            ) : null}
        </div>
    
        {chartData.length > 0 ? (
            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`₹${totalIncome.toLocaleString()}`}
                showTextAnchor
                colors={COLORS}
            />
        ) : (
            <div className='flex flex-col items-center justify-center py-12 text-slate-400'>
                <LuInbox size={40} className='mb-3 opacity-20'/>
                <p className='text-sm font-medium'>No income data available</p>
            </div>
        )}
    </div>
  )
}

export default RecentIncomeWithChart