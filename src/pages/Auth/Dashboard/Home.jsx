import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../Utils/axiosInstance'
import { API_PATHS } from '../../../Utils/apiPaths'
import { IoMdCard } from 'react-icons/io'
import InfoCard from '../../../components/Cards/InfoCard'
import { LuHandCoins, LuLayoutDashboard, LuPlus, LuRefreshCcw, LuWalletMinimal } from 'react-icons/lu'
import { addThousandsSeparator } from '../../../Utils/helper'
import RecentTransactions from '../../../components/Dashboard/RecentTransactions'
import FinanceOverview from '../../../components/Dashboard/FinanceOverview'
import ExpenseTransactions from '../../../components/Dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../../components/Dashboard/Last30DaysExpenses'
import RecentIncomeWithChart from '../../../components/Dashboard/RecentIncomeWithChart'
import RecentIncome from '../../../components/Dashboard/RecentIncome'
import { UserContext } from '../../../context/UserContext'

const Home = () => {
  useUserAuth()

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [dashboardData, setDashboardData] = useState(null)
  const [loading,setLoading] = useState(false)

  const fetchDashboardData = async()=>{
    if(loading) return;
    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if(response.data){
        setDashboardData(response.data)
      }
    }catch(error){
      
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchDashboardData();
  
    return () => {};
  },[]);

  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
         <DashboardSkeleton />
      </DashboardLayout>
    )
  }

  const hasData = dashboardData?.totalIncome > 0 || dashboardData?.totalExpense > 0;
  

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto max-w-7xl px-4'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
          <div>
            <h2 className='text-3xl font-bold text-slate-900'>Welcome, {user?.fullName?.split(" ")[0] || "User"}! 👋</h2>
            <p className='text-slate-500 mt-1'>Here's what's happening with your money today.</p>
          </div>
          
          <button 
            onClick={fetchDashboardData}
            className='flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-primary hover:border-primary/30 transition-all shadow-sm'
          >
            <LuRefreshCcw size={18} className={`${loading ? 'animate-spin' : ''}`} />
            <span className='text-sm font-semibold'>Refresh Data</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
          <button 
            onClick={() => navigate("/income")}
            className='flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl hover:bg-primary/10 transition-all group text-left'
          >
            <div className='w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20'>
              <LuPlus size={20} />
            </div>
            <div>
              <p className='text-xs font-bold text-primary uppercase tracking-wider'>Add</p>
              <p className='text-sm font-bold text-slate-800'>Income</p>
            </div>
          </button>

          <button 
            onClick={() => navigate("/expense")}
            className='flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl hover:bg-red-100/50 transition-all group text-left'
          >
            <div className='w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-200'>
              <LuPlus size={20} />
            </div>
            <div>
              <p className='text-xs font-bold text-red-500 uppercase tracking-wider'>Add</p>
              <p className='text-sm font-bold text-slate-800'>Expense</p>
            </div>
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
          icon={<IoMdCard/>}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color="bg-primary"/>

         <InfoCard
          icon={<LuWalletMinimal/>}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color="bg-orange-500"/>

         <InfoCard
          icon={<LuHandCoins/>}
          label="Total Expense"
          value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
          color="bg-red-500"/>
        </div>

        {hasData ? (
          <div className='mt-10'>
            <h3 className='text-xl font-bold text-slate-800 mb-6 flex items-center gap-2'>
              <div className='w-2 h-6 bg-primary rounded-full'></div>
              Financial Analytics
            </h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpense || 0}
              />

              <Last30DaysExpenses
                data={dashboardData?.last30DaysExpenses?.transactions || []}
              />

                          <RecentIncomeWithChart
                            data={dashboardData?.last60DaysIncome?.transactions || []}
                            totalIncome={dashboardData?.totalIncome || 0}
                          />
              <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={()=>navigate("/expense")}
              />

              <ExpenseTransactions
                transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                onSeeMore={()=> navigate("/expense")}
              />

              <RecentIncome
                transactions={dashboardData?.last60DaysIncome?.transactions || []}
                onSeeMore={()=> navigate("/income")}
              />
            </div>
          </div>
        ) : (
          <NoDataView />
        )}
      </div>

    </DashboardLayout>
  )
}

export default Home

const NoDataView = () => {
  const navigate = useNavigate();
  return (
    <div className='mt-12 flex flex-col items-center justify-center py-20 px-6 bg-white rounded-3xl border border-slate-100 shadow-sm'>
       <div className='w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6'>
          <LuLayoutDashboard size={40} />
       </div>
       <h3 className='text-2xl font-bold text-slate-800 text-center'>Ready to take control of your finances?</h3>
       <p className='text-slate-500 text-center mt-2 max-w-md'>
          Your dashboard is currently empty. Start by adding your first income or expense to see detailed analytics and trends.
       </p>
       
       <div className='flex flex-wrap items-center justify-center gap-4 mt-10'>
          <button 
            onClick={() => navigate('/income')}
            className='flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all'
          >
            <LuPlus size={20} /> Add Your First Income
          </button>
          
          <button 
            onClick={() => navigate('/expense')}
            className='flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all'
          >
            <LuPlus size={20} /> Add Your First Expense
          </button>
       </div>
    </div>
  )
}

const DashboardSkeleton = () => {
  return (
    <div className='my-5 mx-auto'>
      <div className='mb-6'>
         <div className='h-8 w-48 bg-slate-200 rounded animate-pulse mb-2'></div>
         <div className='h-4 w-64 bg-slate-100 rounded animate-pulse'></div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
         {[1,2,3].map(i => (
            <div key={i} className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 flex items-center gap-6'>
               <div className='w-14 h-14 bg-slate-200 rounded-full animate-pulse'></div>
               <div>
                 <div className='h-4 w-24 bg-slate-200 rounded animate-pulse mb-2'></div>
                 <div className='h-8 w-32 bg-slate-200 rounded animate-pulse'></div>
               </div>
            </div>
         ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
         {[1,2,3,4,5,6].map(i => (
             <div key={i} className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 h-64 animate-pulse'></div>
         ))}
      </div>
    </div>
  )
}

export default Home

const DashboardSkeleton = () => {
  return (
    <div className='my-5 mx-auto'>
      <div className='mb-6'>
         <div className='h-8 w-48 bg-slate-200 rounded animate-pulse mb-2'></div>
         <div className='h-4 w-64 bg-slate-100 rounded animate-pulse'></div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
         {[1,2,3].map(i => (
            <div key={i} className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 flex items-center gap-6'>
               <div className='w-14 h-14 bg-slate-200 rounded-full animate-pulse'></div>
               <div>
                 <div className='h-4 w-24 bg-slate-200 rounded animate-pulse mb-2'></div>
                 <div className='h-8 w-32 bg-slate-200 rounded animate-pulse'></div>
               </div>
            </div>
         ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
         {[1,2,3,4,5,6].map(i => (
             <div key={i} className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 h-64 animate-pulse'></div>
         ))}
      </div>
    </div>
  )
}