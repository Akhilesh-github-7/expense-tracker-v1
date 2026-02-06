import React from 'react'

const CustomTooltips = ({ active, payload }) => {
    if (active && payload && payload.length){
        return(
            <div className='bg-white shadow-xl shadow-slate-200/50 rounded-xl p-3 border border-slate-100/50 backdrop-blur-sm'>
                <p className='text-xs font-semibold text-slate-500 mb-1'>{payload[0].name}</p>
                <p className='text-base font-bold text-slate-900'>
                    ₹{payload[0].value.toLocaleString('en-IN')}
                </p>
            </div>
        );
    }
    return null;
}

export default CustomTooltips