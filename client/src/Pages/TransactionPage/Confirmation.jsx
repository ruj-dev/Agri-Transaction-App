import React, { useEffect, useState } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Add_sources from '../../Components/Add_Sources';


function Confirmation({open,handleClose,id}) {

const handleCancel=()=>{

handleClose();
}
const handleDelete=async()=>{
    
    console.log(`Delete transaction with ID: ${id}`);
    const response = await fetch(`http://localhost:8082/transactions/:${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
   

    handleClose();

}

  
    return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Do you want to Delete ? </DialogTitle>
       
        <DialogActions sx={{ marginLeft: "10px" }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>

        </DialogActions>
      </Dialog>  


    </>

    )
}

export default Confirmation