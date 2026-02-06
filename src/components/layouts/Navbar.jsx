import React, { useState, useContext } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'
import { UserContext } from '../../context/UserContext'
import { LuTrendingUpDown } from 'react-icons/lu'
import CharAvatar from '../Cards/CharAvatar'

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)
    const { user } = useContext(UserContext)

  return (
    <div className='flex justify-between items-center bg-white border-b border-slate-200 h-16 px-4 md:px-8 lg:px-10 sticky top-0 z-40 shadow-sm'>
        <div className='flex items-center gap-3'>
            <button 
                className='lg:hidden p-2 -ml-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-all' 
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? <HiOutlineX size={24}/> : <HiOutlineMenu size={24}/>}
            </button>

            <div className='flex items-center gap-2.5'>
                 <div className='bg-primary w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20'>
                    <LuTrendingUpDown size={22} />
                  </div>
                <h2 className='text-xl font-bold text-slate-900 tracking-tight'>Expensy</h2>
            </div>
        </div>

        {/* User Profile Info */}
        <div className='flex items-center gap-3 pl-4 border-l border-slate-100 lg:border-none'>
            <div className='text-right hidden sm:block'>
                <p className='text-sm font-bold text-slate-800 leading-none mb-1'>{user?.fullName?.split(" ")[0] || 'User'}</p>
                <p className='text-[11px] font-medium text-slate-400 leading-none'>{user?.email || 'user@example.com'}</p>
            </div>
            
            <CharAvatar 
              fullName={user?.fullName} 
              image={user?.profileImageUrl} 
              width="w-10" 
              height="h-10"
              style="ring-2 ring-slate-100 ring-offset-2 cursor-pointer hover:ring-primary/20 transition-all" 
            />
        </div>

        {/* Mobile Side Menu */}
        {openSideMenu && (
            <>
                <div 
                    className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden' 
                    onClick={() => setOpenSideMenu(false)}
                ></div>
                <div className='fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50 lg:hidden animate-in slide-in-from-left duration-300'>
                    <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <div className='bg-primary w-8 h-8 rounded-lg flex items-center justify-center text-white'>
                                <LuTrendingUpDown size={18} />
                            </div>
                            <h2 className='text-lg font-bold text-slate-900'>Expensy</h2>
                        </div>
                        <button onClick={() => setOpenSideMenu(false)} className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg'>
                            <HiOutlineX size={20}/>
                        </button>
                    </div>
                    <SideMenu activeMenu={activeMenu}/>
                </div>
            </>
        )}

    </div>
  )
}

export default Navbar