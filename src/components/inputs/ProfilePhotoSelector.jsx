import React, { useRef, useState, useEffect } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu'


const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null)
    const [previewUrl,setPreviewUrl]= useState(null)

    const handleImageChange = (event) =>{
        const file = event.target.files[0]
        if(file){
            // update the image state
            setImage(file)
            // Generate preview URL from the file
            const preview = URL.createObjectURL(file)
            setPreviewUrl(preview)
        }
    }
    const handleRemoveImage = ()=>{
        setImage(null)
        setPreviewUrl(null)
    }

    const onChooseFile = ()=>{
        inputRef.current.click()
    }

    // Determine what to show as the image source
    const displayImage = previewUrl || (typeof image === 'string' ? image : null)

  return (
    <div className='flex justify-center mb-6'>
        <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
        />
        {!displayImage ? (
            <div className='w-24 h-24 flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-full relative hover:border-primary/50 transition-colors cursor-pointer' onClick={onChooseFile}>
                <LuUser className='text-4xl text-slate-400'/>
                <button type='button'
                className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 shadow-md shadow-primary/30'
                onClick={(e) => {
                    e.stopPropagation();
                    onChooseFile();
                }}
                >
                <LuUpload size={16}/>

                </button>

            </div>
        ) : (
            <div className='relative'>
                <img src={displayImage}
                alt='profile Photo'
                className='w-24 h-24 rounded-full object-cover border-2 border-white shadow-lg'/>
                <button type='button'
                className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 shadow-md hover:bg-red-600 transition-colors'
                onClick={handleRemoveImage}>
                    <LuTrash size={16}/>

                </button>
            </div>


        )}
    </div>
  )
  
}

export default ProfilePhotoSelector