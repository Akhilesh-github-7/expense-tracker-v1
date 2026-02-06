import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import { LuImage, LuX } from 'react-icons/lu'

const EmojiPickerPopup = ({icon,onSelect}) => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col items-start mb-6'>
        <div 
          className='flex items-center gap-4 cursor-pointer p-2 hover:bg-slate-50 rounded-2xl transition-all' 
          onClick={()=> setIsOpen(true)}
        >
            <div className='w-14 h-14 flex items-center justify-center text-2xl bg-primary/5 text-primary rounded-2xl border-2 border-dashed border-primary/20 overflow-hidden'>
                {icon ? (
                    <img src={icon} alt="Icon" className='w-full h-full object-contain p-2' />
                ) : (
                    <LuImage size={24} className='opacity-40' />
                )}
            </div>

            <div>
              <p className='text-sm font-semibold text-slate-700'>{icon ? "Change Icon" : "Pick an Icon"}</p>
              <p className='text-xs text-slate-400'>Select an emoji for this record</p>
            </div>
        </div>

        {isOpen && (
            <div className='absolute z-50 mt-2 top-24 left-6 shadow-2xl rounded-2xl overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200'>
                <div className='bg-white p-2 border-b border-slate-100 flex justify-between items-center'>
                    <span className='text-xs font-bold text-slate-500 ml-2'>Select Emoji</span>
                    <button
                        className='p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-all cursor-pointer'
                        onClick={()=> setIsOpen(false)}
                    >
                        <LuX size={16}/>
                    </button>
                </div>
                <EmojiPicker
                    onEmojiClick={(emoji)=> {
                        onSelect(emoji?.imageUrl || "");
                        setIsOpen(false);
                    }}
                />
            </div>
        )}
    </div>
  )
}

export default EmojiPickerPopup