import React, { useState } from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setExpense({...expense, [key]:value });
  return (
    <div className='space-y-4'>
        <EmojiPickerPopup
            icon={expense.icon}
            onSelect={(selectedIcon)=> handleChange("icon", selectedIcon)}
        />

        <Input
            value={expense.category}
            onChange={({ target }) => handleChange("category",target.value)}
            label="Category"
            placeholder="Rent, Groceries, etc"
            type="text"
        />

        <div className='grid grid-cols-2 gap-4'>
            <Input
                value={expense.amount}
                onChange={({ target })=> handleChange("amount",target.value)}
                label="Amount"
                placeholder="0.00"
                type="number"
            />

            <Input 
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />
        </div>

        <div className='pt-4'>
            <button
                type='button'
                className='w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all'
                onClick={()=>onAddExpense(expense)}
            >
                Add Expense
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm