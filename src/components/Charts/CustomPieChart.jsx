import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import CustomTooltips from './CustomTooltips'
import Legends from './Legends'


const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor}) => {
  return <ResponsiveContainer width="100%" height={380}>
    <PieChart>
    <Pie
    data={data}
    dataKey="amount"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={135}
    innerRadius={105}
    paddingAngle={2}
    cornerRadius={4}
    stroke="none"
    dataKey="amount"
    >
        {data.map((entry , index)=>(
            <Cell key={`cell-${index}`} fill={colors[index %  colors.length]}/>
        ))}

    </Pie>
    <Tooltip content={<CustomTooltips/>}/>
    <Legend content={(props) => (props.payload && props.payload.length > 0 ? <Legends payload={props.payload} /> : null)} />


    {showTextAnchor && (
        <>
        <text
        x="50%"
        y="50%"
        dy={-25}
        textAnchor='middle'
        fill='#94a3b8'
        fontSize="14px"
        fontWeight={500}
        fontFamily='sans-serif'
        >
        {label}
        </text>

        <text
        x="50%"
        y="50%"
        dy={10}
        textAnchor='middle'
        fill='#1e293b'
        fontSize="28px"
        fontWeight={700}
        fontFamily='sans-serif'
        >
            {totalAmount}   
        </text>

        
        </>

    )}
    </PieChart>
   </ResponsiveContainer>
  
};

export default CustomPieChart