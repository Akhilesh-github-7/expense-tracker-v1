import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import IncomeOverview from '../../../components/Income/IncomeOverview'
import axiosInstance from '../../../Utils/axiosInstance';
import { API_PATHS } from '../../../Utils/apiPaths';
import Modal from '../../../components/Modal';
import AddIncomeForm from '../../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../../components/Income/IncomeList';
import DeleteAlert from '../../../components/DeleteAlert';
import { useUserAuth } from '../../../hooks/useUserAuth';

const Income = () => {
  useUserAuth()

  const [incomeData, setIncomeData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // get all income details

  const fetchIncomeDetails = async () =>{
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

      if(response.data){
        setIncomeData(response.data);

      }
    }catch(error){
      
    }finally{
      setLoading(false);
    }
  };

  // Handle add income

  const handleAddIncome = async (income) =>{
    const { source, amount, date, icon} = income;

    // validation check
    if (!source.trim()){
      toast.error("Source is required")
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than 0.")
      return;
    }

    if(!date){
      toast.error("Date is required")
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    }catch(error){
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete income

  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({ show: false, data:null});
      toast.success("Income details deleted successfully")
      fetchIncomeDetails();
    }catch(error){
      console.error(
        "Error deleting income",
        error.response?.data?.message || error.message
      )
    }
  };

  // handle download income details
  const handleDownloadIncomeDetails = async () => {

    try{
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType:"blob",
        }
      );
      // create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx")
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.error("Error downloading income details:",error);
      toast.error("Failed to download income details.Please try again")
    }
  };

  useEffect(()=>{
    fetchIncomeDetails()

    return ()=>{}
  },[])

  if (loading) {
    return (
      <DashboardLayout activeMenu="Income">
         <IncomeSkeleton />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout activeMenu="Income">
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8 mt-2'>
          <h2 className='text-2xl md:text-3xl font-bold text-slate-900'>Income Analytics</h2>
          <p className='text-sm md:text-base text-slate-500 mt-1'>Manage and track your revenue streams.</p>
        </div>

        <div className='grid grid-cols-1 gap-8'>
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />

          <IncomeList
           transactions={incomeData}
           onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id});
           }}
           onDownload={handleDownloadIncomeDetails}
           />
        </div>

        <Modal 
          isOpen={openAddIncomeModal}
          onClose={()=> setOpenAddIncomeModal(false)}
          title="Add Income"
        >
         <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={()=> setOpenDeleteAlert({show: false,data: null})}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income record? This action cannot be undone."
            onDelete={()=> deleteIncome(openDeleteAlert.data)}
            onClose={()=> setOpenDeleteAlert({show: false,data: null})}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income

const IncomeSkeleton = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='mb-8 mt-2'>
         <div className='h-10 w-64 bg-slate-200 rounded-2xl animate-pulse mb-2'></div>
         <div className='h-4 w-48 bg-slate-100 rounded-lg animate-pulse'></div>
      </div>
      <div className='grid grid-cols-1 gap-8'>
         <div className='bg-white p-6 rounded-3xl shadow-sm border border-slate-100/50 h-[400px] animate-pulse'></div>
         <div className='bg-white p-6 rounded-3xl shadow-sm border border-slate-100/50 h-[500px] animate-pulse'></div>
      </div>
    </div>
  )
}