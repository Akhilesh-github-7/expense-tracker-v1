import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

const DashboardLayout = ({ children , activeMenu }) => {
    const { user } = useContext(UserContext)
  return (
    <div className='min-h-screen bg-slate-50'>
        <Navbar activeMenu={activeMenu}/>

        {user && (
            <div className='flex max-w-[1600px] mx-auto'>
                <div className='hidden lg:block w-64 flex-shrink-0'>
                    <SideMenu activeMenu={activeMenu}/>
                </div>
                
                <main className='flex-1 w-full min-w-0 py-4 px-4 md:px-6 lg:px-8 overflow-hidden'>
                    {children}
                </main>
            </div>
        )}
    </div>
  )
}

export default DashboardLayout