import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../../hooks/useUserAuth'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { API_PATHS } from '../../../Utils/apiPaths'
import toast from 'react-hot-toast'
import axiosInstance from '../../../Utils/axiosInstance'
import ExpenseOverview from '../../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../../components/Expense/AddExpenseForm'
import Modal from '../../../components/Modal'
import ExpenseList from '../../../components/Expense/ExpenseList'
import DeleteAlert from '../../../components/DeleteAlert'

const Expense = () => {
  useUserAuth();


   const [expenseData, setExpenseData] = useState([]);
  
    const [loading, setLoading] = useState(false);
  
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
  
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)


    
  // get all expense details

  const fetchExpenseDetails = async () =>{
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);

      if(response.data){

        
        setExpenseData(response.data);

      }
    }catch(error){
      
    }finally{
      setLoading(false);
    }
  };

  // Handle add expense

  const handleAddExpense = async (expense) =>{
    const { category, amount, date, icon} = expense;

    // validation check
    if (!category.trim()){
      toast.error("Category is required");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    }catch(error){
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  
  // Delete expense

  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data:null});
      toast.success("Expense details deleted successfully")
      fetchExpenseDetails();
    }catch(error){
      console.error(
        "Error deleting expense",
        error.response?.data?.message || error.message
      )
    }
  };

  // handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType:"blob",
        }
      );
      // create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx")
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.error("Error downloading expense details:",error);
      toast.error("Failed to download expense details.Please try again")
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  
    return () => {};
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout activeMenu="Expense">
         <ExpenseSkeleton />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8 mt-2'>
          <h2 className='text-2xl md:text-3xl font-bold text-slate-900'>Expense Analytics</h2>
          <p className='text-sm md:text-base text-slate-500 mt-1'>Monitor and optimize your spending habits.</p>
        </div>

        <div className='grid grid-cols-1 gap-8'>
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={()=>setOpenAddExpenseModal(true)}
          />

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={()=> setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={()=> setOpenDeleteAlert({show: false,data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense record? This action cannot be undone."
            onDelete={()=> deleteExpense(openDeleteAlert.data)}
            onClose={()=> setOpenDeleteAlert({show: false,data: null})}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense

const ExpenseSkeleton = () => {
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