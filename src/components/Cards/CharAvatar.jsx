import React from 'react'
import { getInitials, getProfileImageUrl } from '../../Utils/helper'

const CharAvatar = ({ fullName, image, width, height, style }) => {
  const profileImg = getProfileImageUrl(image);
  
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full overflow-hidden text-gray-900 font-medium bg-gray-100 border border-slate-200`}>
        {profileImg ? (
             <img src={profileImg} alt={fullName} className='w-full h-full object-cover' />
        ) : (
            <span className='text-primary font-semibold text-lg'>
                {getInitials(fullName || "")}
            </span>
        )}
    </div>
  )
}

export default CharAvatar