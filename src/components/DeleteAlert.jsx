import React from 'react'

const DeleteAlert = ({content,onDelete, onClose}) => {
  return (
    <div>
        <p className='text-slate-600 text-sm leading-relaxed'>{content}</p>

        <div className='flex justify-end gap-3 mt-8'>
            <button
                type='button'
                className='px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-all'
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type='button'
                className='px-4 py-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg shadow-red-200 transition-all'
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert