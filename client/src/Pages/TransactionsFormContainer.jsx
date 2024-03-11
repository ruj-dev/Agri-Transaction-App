import React, { useState } from 'react'
import Transaction_form from '../Components/Transaction_form'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Reports from './Reports/Reports';
import backgroundImage from '../assets/agri.jpg'
function TransactionsFormContainer() {
  const [renderForm, setRenderForm] = useState(false);
  const handleFab = () => {
    setRenderForm(!renderForm)
  }
  const onClose = () => {
    setRenderForm(false);
  }
  const myStyle = {
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    marginTop: "-80px",
    fontSize: "50px",
    backgroundSize: "auto auto",
    repeat: "no-repeat",
    marginTop: 20,
    backgroundRepeat:"no-repeat",
    backgroundPosition:"center center",
      
    
};
  return (
    <div style={myStyle}>
      {renderForm ? <Transaction_form onClose={onClose} /> : ''}
   { !renderForm?  <Fab variant="extended" color="primary" onClick={handleFab} sx={{ marginTop: 5 }}>
        <AddIcon sx={{ mr: 1 }} />
        Add Transaction
      </Fab>:''}


    </div>
  )
}

export default TransactionsFormContainer