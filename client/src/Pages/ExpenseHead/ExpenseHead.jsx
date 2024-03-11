import React, { useEffect, useState } from 'react'

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Add_sources from '../../Components/Add_Sources';

function ExpenseHead() {
    const [renderAddIncomeDialog, setRenderAddIncomeDialog]=useState(false);
    const [sources,setSources]=useState(null);
    const openAddIncomeDialog=()=>{
        setRenderAddIncomeDialog(true);
    }
    const closeAddIncomeDia=()=>{
        
        fetchSource();
        setRenderAddIncomeDialog(false)
       
    } 
   
  
    const fetchSource=async()=>{
        try {
            const response = await fetch('http://localhost:8082/getsources');
            if (!response.ok) {
              throw new Error('Failed to fetch groups');
            }
            const data = await response.json();
            setSources(()=>data);
          } catch (error) {
            console.error('Error fetching groups:', error.message);
            toast.error('Failed to fetch groups.');
          }

    }
    const rerender = () => {
        fetchSource();
      }
    useEffect(()=>{
        fetchSource();

    },[])
  return (
    <>
  <div style={{ marginTop: 20 }}>
  
  <Fab variant="extended" color="primary" onClick={openAddIncomeDialog} sx={{ marginTop: 5 }}>
      <AddIcon sx={{ mr: 1 }} />
      Add Expense Head
    </Fab>
    <Add_sources open={renderAddIncomeDialog} handleClose={closeAddIncomeDia}/>
    


  </div>
  <div className='tiles-container'>
    {sources?.expenseSources?.map((ele)=>(<div className='tiles'>{ele}</div>))}
  </div>
  
  </>
  )
}

export default ExpenseHead