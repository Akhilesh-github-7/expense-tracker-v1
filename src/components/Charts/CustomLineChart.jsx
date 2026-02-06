import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const CustomLineChart = ({ data }) => {

    const CustomTooltip = ({ active, payload})=>{
        if (active && payload && payload.length){
            return(
                <div className='bg-white shadow-xl shadow-slate-200/50 rounded-xl p-3 border border-slate-100/50 backdrop-blur-sm'>
                    <p className='text-xs font-semibold text-slate-500 mb-1'>Daily Expense</p>
                    <p className='text-base font-bold text-slate-900'>
                        ₹{payload[0].value.toLocaleString('en-IN')}
                    </p>
                    <p className='text-[10px] text-slate-400 mt-1'>{payload[0].payload.month}</p>
                </div>
            );
        }
        return null;
    };
  return (
    <div className='bg-white'>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
                <linearGradient id='incomeGradient' x1="0" y1="0" x2="0" y2="1">
                    <stop offset='5%' stopColor='#875cf5' stopOpacity={0.3}/>
                    <stop offset="95%" stopColor='#875cf5' stopOpacity={0} />
                    </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke='#e2e8f0' vertical={false}/>
            <XAxis 
                dataKey='month' 
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500}} 
                stroke='none'
                axisLine={false}
                tickLine={false}
                dy={10}
            />
            <YAxis 
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500}} 
                stroke='none'
                axisLine={false}
                tickLine={false}
            />
            <Tooltip content={<CustomTooltip/>}/>

            <Area 
                type="monotone" 
                dataKey="amount" 
                stroke='#875cf5' 
                fill='url(#incomeGradient)' 
                strokeWidth={3} 
                dot={{r:4, fill: "#875cf5", stroke: '#fff', strokeWidth: 2}} 
                activeDot={{ r: 6, fill: '#875cf5', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>

    </div>
  )
}

export default CustomLineChart