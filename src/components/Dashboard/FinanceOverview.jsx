import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
const COLORS = ["#875CF5","#FA2C37","#FF6900"]
const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {
  

    const balanceData = [
        { name: "Total Balance", amount: totalBalance},
        { name: "Total Expense", amount: totalExpense},
        { name: "Total Income", amount: totalIncome},
    ];

    
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50'>
        <div className='flex items-center justify-between mb-2'>
            <div>
              <h5 className='text-lg font-bold text-slate-800'>Financial Overview</h5>
              <p className='text-xs text-slate-400 mt-0.5'>Overall balance distribution</p>
            </div>
        </div>
       
       <CustomPieChart
       data={balanceData}
       label="Total Balance"
       totalAmount={`₹${totalBalance}`}
       colors={COLORS}
       showTextAnchor
       />
    </div>
  )
}

export default FinanceOverview