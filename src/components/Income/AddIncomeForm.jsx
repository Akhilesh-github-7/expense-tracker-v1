import React, { useState } from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    })

    const handleChange = (key, value) => setIncome({...income, [key]:value })
  return (
    <div className='space-y-4'>
        <EmojiPickerPopup
            icon={income.icon}
            onSelect={(selectedIcon)=> handleChange("icon", selectedIcon)}
        />
        
        <Input
            value={income.source}
            onChange={({ target })=> handleChange("source", target.value)}
            label="Income Source"
            placeholder="Freelance, Salary, etc"
            type="text"
        />

        <div className='grid grid-cols-2 gap-4'>
            <Input
                value={income.amount}
                onChange={({ target })=> handleChange("amount", target.value)}
                label="Amount"
                placeholder="0.00"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target })=> handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />
        </div>

        <div className='pt-4'>
            <button
                type='button'
                className='w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all'
                onClick={()=>onAddIncome(income)}
            >
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm