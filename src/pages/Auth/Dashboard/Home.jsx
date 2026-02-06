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
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 mt-2'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold text-slate-900'>Welcome, {user?.fullName?.split(" ")[0] || "User"}! 👋</h2>
            <p className='text-sm md:text-base text-slate-500 mt-1'>Here's what's happening with your money today.</p>
          </div>
          
          <button 
            onClick={fetchDashboardData}
            className='flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-primary hover:border-primary/30 transition-all shadow-sm active:scale-95'
          >
            <LuRefreshCcw size={18} className={`${loading ? 'animate-spin' : ''}`} />
            <span className='text-sm font-bold'>Refresh</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10'>
          <button 
            onClick={() => navigate("/income")}
            className='flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl hover:border-primary/20 hover:bg-primary/5 transition-all group text-left shadow-sm'
          >
            <div className='w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all'>
              <LuPlus size={24} />
            </div>
            <div>
              <p className='text-[10px] font-black text-primary uppercase tracking-widest mb-0.5'>Add New</p>
              <p className='text-base font-bold text-slate-800'>Income</p>
            </div>
          </button>

          <button 
            onClick={() => navigate("/expense")}
            className='flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl hover:border-red-500/20 hover:bg-red-50 transition-all group text-left shadow-sm'
          >
            <div className='w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all'>
              <LuPlus size={24} />
            </div>
            <div>
              <p className='text-[10px] font-black text-red-500 uppercase tracking-widest mb-0.5'>Add New</p>
              <p className='text-base font-bold text-slate-800'>Expense</p>
            </div>
          </button>
        </div>

        {/* Key Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          <InfoCard
            icon={<IoMdCard/>}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal/>}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins/>}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        {hasData ? (
          <div className='mt-12'>
            <div className='flex items-center gap-3 mb-8'>
              <div className='w-1.5 h-8 bg-primary rounded-full'></div>
              <h3 className='text-xl md:text-2xl font-bold text-slate-900'>Financial Analytics</h3>
            </div>
            
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <div className='space-y-8'>
                <FinanceOverview
                  totalBalance={dashboardData?.totalBalance || 0}
                  totalIncome={dashboardData?.totalIncome || 0}
                  totalExpense={dashboardData?.totalExpense || 0}
                />
                <RecentTransactions
                  transactions={dashboardData?.recentTransactions}
                  onSeeMore={()=>navigate("/expense")}
                />
              </div>

              <div className='space-y-8'>
                <Last30DaysExpenses
                  data={dashboardData?.last30DaysExpenses?.transactions || []}
                />
                <RecentIncomeWithChart
                  data={dashboardData?.last60DaysIncome?.transactions || []}
                  totalIncome={dashboardData?.totalIncome || 0}
                />
              </div>

              <div className='lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
          </div>
        ) : (
          <NoDataView />
        )}
      </div>
    </DashboardLayout>
  )
}

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