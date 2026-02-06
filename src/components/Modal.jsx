import React from 'react'
import { LuX } from 'react-icons/lu'

const Modal = ({children,isOpen,onClose,title}) => {

   if(!isOpen) return null
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-slate-900/40 backdrop-blur-sm p-4'>
        <div className='relative w-full max-w-lg animate-in fade-in zoom-in duration-200'>
            {/* Modal Content */}
            <div className='relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100'>
                {/* Modal Header */}
                <div className='flex items-center justify-between p-6 border-b border-slate-100'>
                    <h3 className='text-xl font-bold text-slate-900'>
                        {title}
                    </h3>
                    <button 
                        type='button' 
                        className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer' 
                        onClick={onClose}
                    >
                      <LuX size={20}/>
                    </button>
                </div>

                {/* Modal Body */}
                <div className='p-6'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal