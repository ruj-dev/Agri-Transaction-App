import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Typography, AppBar, Toolbar, Button } from '@mui/material';
import Header from './Components/Header';
import Add_sources from './Components/Add_Sources';
import TransactionsFormContainer from './Pages/TransactionsFormContainer';
import TransactionsPage from './Pages/TransactionPage/TransactionPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reports from './Pages/Reports/Reports';
import IncomeHead from './Pages/IncomeHead/IncomeHead';
import ExpenseHead from './Pages/ExpenseHead/ExpenseHead';
import Inventory from './Pages/Inventory/Inventory';
import Report2 from './Pages/Reports/Report2';
import ProductPage from './Pages/ProductPage/ProductPage';
function App() {


  return (
    <>



      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<TransactionsFormContainer />} />

          <Route path="/transaction" element={<TransactionsPage />} />
          <Route path="/reports" element={<Report2 />} />
          <Route path="/incomeHead" element={<IncomeHead />} />
          <Route path="/expenseHead" element={<ExpenseHead />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/product/:id" element={<ProductPage/>} />



        </Routes>
      </Router>
    </>
  )
}

export default App
