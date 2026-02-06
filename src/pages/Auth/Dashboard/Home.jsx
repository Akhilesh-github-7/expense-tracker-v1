import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../Utils/axiosInstance'
import { API_PATHS } from '../../../Utils/apiPaths'
import { IoMdCard } from 'react-icons/io'
import InfoCard from '../../../components/Cards/InfoCard'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
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
  

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-slate-800'>Hello, {user?.fullName?.split(" ")[0] || "User"}! 👋</h2>
          <p className='text-sm text-slate-500'>Here's an overview of your finances today.</p>
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

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={()=>navigate("/expense")}
          />

          <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
          transactions={dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore={()=> navigate("/expense")}/>

          <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
          data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
          totalIncome={dashboardData?.totalIncome || 0}
          />


          <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={()=> navigate("/income")}
          />


        </div>
      </div>

    </DashboardLayout>
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