import React, { useState } from 'react'
import { Typography,AppBar, Toolbar, Button } from '@mui/material';
import './style.css'
import Add_sources from '../Add_Sources';
import { Link, useLocation } from 'react-router-dom';
function Header() {

    const [renderAddIncomeDialog, setRenderAddIncomeDialog]=useState(false);
    const openAddIncomeDialog=()=>{
        setRenderAddIncomeDialog(true);
    }
    const closeAddIncomeDia=()=>{
        setRenderAddIncomeDialog(false)
    } 
  return (
   <>
   <div className="header-container">
      <AppBar position="static" className="header-container">
  <Toolbar >
  <Link to='/' id='link' style={{ flexGrow: 0.8 }}>
    <Typography variant="h6" >
    Agri Transactions App 
    </Typography></Link>
    <div id='link-container'>
      <Link to='/transaction' id='link'>Transactions</Link>
    <Link to='/reports' id='link'>Reports</Link>
    <Link to='/incomeHead' id='link'>Income Head</Link>
    <Link to='/expensehead' id='link'>Expense Head</Link>
    <Link to='/inventory' id='link'>Inventory</Link>
    
    </div>
    
    
    
    <Add_sources open={renderAddIncomeDialog} handleClose={closeAddIncomeDia}/>
    </Toolbar>
    </AppBar>
    </div>
   </>
  )
}

export default Header