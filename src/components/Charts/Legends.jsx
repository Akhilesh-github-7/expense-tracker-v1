import React from 'react'

const Legends = ({payload = []}) => {


  if (!payload || payload.length === 0) return null;
  
  return (
    <div className='flex flex-wrap justify-center gap-4 mt-6'>

        {payload.map((entry, index) => (
            <div key={`legend-${index}`} className='flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-100/50 bg-slate-50/50 hover:bg-slate-100 transition-colors'>
                <div className='w-3 h-3 rounded-full shadow-sm'
                style={{backgroundColor: entry.color}}></div>

                <span className='text-xs font-semibold text-slate-600'>
                    {entry.value}

                </span>

            </div>
        ))}

    </div>
  )
}

export default Legends