import React, { useContext, useState } from 'react'
import { SIDE_MENU_DATA } from '../../Utils/data'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
import ProfileModal from './ProfileModal'

const SideMenu = ({activeMenu}) => {
    const {user , clearUser} = useContext(UserContext)
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

    const navigate = useNavigate()

    const handleClick = (route) =>{
        if (route === "logout"){
            handleLogout()
            return
        }
        navigate(route)
    }
    const handleLogout = ()=>{
        localStorage.clear()
        clearUser()
        navigate("/login")
    }
  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-slate-200 p-5 sticky top-[61px] z-20 flex flex-col'>
        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
            <div className='relative group cursor-pointer' onClick={() => setIsProfileModalOpen(true)}>
                <CharAvatar
                    fullName={user?.fullName}
                    image={user?.profileImageUrl}
                    width="w-20"
                    height="h-20"
                    style="text-xl border-2 border-primary/20 group-hover:border-primary/50 transition-all"
                />
                <div className='absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <span className='text-[10px] text-white font-bold'>EDIT</span>
                </div>
            </div>

            <h5 className='text-slate-900 font-bold leading-6'>
                {user?.fullName || ""}
            </h5>
        </div>

        <div className='flex-1'>
            {
                SIDE_MENU_DATA.map((item, index)=>(
                    <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] font-medium transition-all ${activeMenu == item.label ? "text-white bg-primary shadow-lg shadow-primary/20": "text-slate-600 hover:bg-slate-50"} py-3 px-6 rounded-lg mb-3 `}
                    onClick={()=> handleClick(item.path)}
                    >

                        <item.icon className='text-xl'/>
                        {item.label}

                    </button>
                ))
            }
        </div>

        <ProfileModal 
            isOpen={isProfileModalOpen} 
            onClose={() => setIsProfileModalOpen(false)} 
        />
    </div>
  )
}

export default SideMenu