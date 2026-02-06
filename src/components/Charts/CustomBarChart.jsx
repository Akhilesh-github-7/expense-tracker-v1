import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'



const CustomBarChart = ({data, xAxisKey = "month", dataKey = "amount"}) => {

    // function to alternate colors
    const getBarColor = (index)=>{
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };
    
    const CustomTooltip = ({ active, payload })=>{
     if (active && payload && payload.length){
        return (
            <div className='bg-white shadow-xl shadow-slate-200/50 rounded-xl p-3 border border-slate-100/50 backdrop-blur-sm'>
                <p className='text-xs font-semibold text-slate-500 mb-1 '>
                    {payload[0].payload[xAxisKey]}
                </p>
                <p className='text-base font-bold text-slate-900'>
                     ₹{payload[0].value.toLocaleString('en-IN')}
                </p>

            </div>
        );
     }
     return null;
    };

  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke='#e2e8f0' vertical={false}/>
                <XAxis 
                    dataKey={xAxisKey} 
                    tick={{ fontSize:12, fill:"#64748b", fontWeight: 500 }} 
                    stroke='none'
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                />
                <YAxis 
                    tick={{fontSize:12, fill:"#64748b", fontWeight: 500 }} 
                    stroke='none'
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip content={CustomTooltip} cursor={{ fill: '#f8fafc' }}/>

                <Bar 
                    dataKey={dataKey}
                    fill='#FF8042'
                    radius={[6, 6 , 0, 0]}
                    barSize={32}
                >
                    {data.map((entry, index)=>(
                        <Cell key={index} fill={getBarColor(index)}/>
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>

    </div>
  )
}

export default CustomBarChart