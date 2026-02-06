import React, { useState, useContext } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'
import { UserContext } from '../../context/UserContext'
import { LuTrendingUpDown } from 'react-icons/lu'

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)
    const { user } = useContext(UserContext)

  return (
    <div className='flex justify-between items-center bg-white border-b border-slate-200 py-4 px-6 md:px-10 sticky top-0 z-30 shadow-sm'>
        <div className='flex items-center gap-4'>
            <button className='block lg:hidden text-slate-700 hover:text-primary transition-colors' onClick={()=>{
                setOpenSideMenu(!openSideMenu)
            }}>
                {
                    openSideMenu ? (
                        <HiOutlineX className='text-2xl'/>
                    ):(
                        <HiOutlineMenu className='text-2xl'/>
                    )
                }

            </button>

            <div className='flex items-center gap-2'>
                 <div className='bg-primary w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md shadow-primary/20'>
                    <LuTrendingUpDown size={20} />
                  </div>
                <h2 className='text-2xl font-bold text-slate-900 tracking-tight hidden md:block'>Expensy</h2>
            </div>
        </div>

        {/* User Profile Info */}
        <div className='flex items-center gap-3'>
            <div className='text-right hidden md:block'>
                <p className='text-sm font-semibold text-slate-800'>{user?.fullName || 'User'}</p>
                <p className='text-xs text-slate-500'>{user?.email || 'user@example.com'}</p>
            </div>
            <div className='w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-primary font-bold'>
                 {user?.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt="Profile" className='w-full h-full object-cover' />
                 ) : (
                    user?.fullName ? user.fullName[0] : 'U'
                 )}
            </div>
        </div>

        {openSideMenu && (
            <div className='fixed top-[61px] left-0 w-64 h-screen bg-white shadow-xl border-r border-slate-200 z-50 lg:hidden'>
                <SideMenu activeMenu={activeMenu}/>
            </div>
        )}
        
        {/* Overlay for mobile menu */}
         {openSideMenu && (
            <div 
                className='fixed inset-0 bg-black/20 z-40 lg:hidden' 
                onClick={() => setOpenSideMenu(false)}
            ></div>
         )}

    </div>
  )
}

export default Navbar