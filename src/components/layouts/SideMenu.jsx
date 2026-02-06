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
    <div className='flex flex-col h-full bg-white lg:border-r border-slate-200 p-5'>
        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-8 px-2'>
            <div className='relative group cursor-pointer' onClick={() => setIsProfileModalOpen(true)}>
                <CharAvatar
                    fullName={user?.fullName}
                    image={user?.profileImageUrl}
                    width="w-24"
                    height="h-24"
                    style="text-2xl border-4 border-slate-50 shadow-xl group-hover:border-primary/20 transition-all"
                />
                <div className='absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[1px]'>
                    <span className='text-xs text-white font-bold tracking-wider'>EDIT</span>
                </div>
            </div>

            <div className='text-center'>
                <h5 className='text-slate-900 font-bold leading-tight'>
                    {user?.fullName || ""}
                </h5>
                <p className='text-xs text-slate-400 font-medium mt-1'>{user?.email}</p>
            </div>
        </div>

        <div className='flex-1 space-y-1 overflow-y-auto px-2'>
            {
                SIDE_MENU_DATA.map((item, index)=>(
                    <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 py-3.5 px-5 rounded-2xl text-sm font-bold transition-all duration-200 ${activeMenu == item.label ? "text-white bg-primary shadow-xl shadow-primary/25 translate-x-1": "text-slate-500 hover:text-primary hover:bg-primary/5"}`}
                    onClick={()=> handleClick(item.path)}
                    >
                        <item.icon className='text-xl'/>
                        {item.label}
                    </button>
                ))
            }
        </div>

        <div className='mt-auto pt-6 px-2'>
             <div className='p-4 bg-slate-50 rounded-2xl border border-slate-100'>
                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center'>Expensy v1.0</p>
             </div>
        </div>

        <ProfileModal 
            isOpen={isProfileModalOpen} 
            onClose={() => setIsProfileModalOpen(false)} 
        />
    </div>
  )
}

export default SideMenu