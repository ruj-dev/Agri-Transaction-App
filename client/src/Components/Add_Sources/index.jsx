import React, { useEffect, useState } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';
import { addIncomeSource } from '../../Services/addIncomeSource';
import { addExpenseSource } from '../../Services/addExpenceSource';
import { toast } from 'react-toastify';

function Add_sources({open,handleClose}) {
    const [sourceType,setSourceType]=useState(null);
    const [sourceName,setSourceName]=useState(null);
    const [sources, setSources] = useState([]);
    const handleSourceChange=(event)=>{
        console.log("sourcetype",event.target.value);
        setSourceType(event.target.value);
    }
    const handleSourceNameChange=(event)=>{
        setSourceName(event.target.value);
    }
    const addSource=()=>{
     if(sourceName && sourceType) {
        console.log("sources at addsource",sources.incomeSources,);
        const isDuplicate =  sources.incomeSources.some(source => source
             === sourceName) || sources.expenseSources.some(source => source
                === sourceName);
        if (isDuplicate) {
          alert('Source name already exists. Please enter a different name.');
          return;
        }
    
       
        if (sourceType === 'Income') {
          addIncomeSource(sourceName);
        } else if (sourceType === 'Expense') {
          addExpenseSource(sourceName);
        }
        toast.success('Added Successfully');
    
        handleClose();
      }
      else{
        toast.error("Add all the Fields")
      }
    }
    const fetchSources = () => {
  
        fetch('http://localhost:8082/getsources')
          .then(response => response.json())
          .then(data => {
            setSources(data);
            console.log('sources',data);
          })
          .catch(error => {
            console.error('Error fetching sources:', error);
          });
      };
      useEffect(() => {
        if (open) {
          fetchSources();
          return()=>{
            setSourceName(null);
            setSourceType(null);
          
        }
        }
      }, [open]);
  return (
    <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Sources </DialogTitle>
            <DialogContent>
                <Select
                   fullWidth
                   margin='dense'
                   label='Source type'
                   value={sourceType?sourceType:""}
                   onChange={handleSourceChange}
                >
                    <MenuItem value="Income" >Income</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                </Select>
                <TextField 
                  autoFocus
                  margin="dense"
                  id="source-name"
                  label="Source Name"
                  type="text"
                  fullWidth
                  value={sourceName}
                  onChange={handleSourceNameChange}
                  />
            </DialogContent>
            <DialogActions sx={{marginLeft:"10px"}}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addSource}>Add</Button>
                
            </DialogActions>
        </Dialog>
    </>
  )
}

export default Add_sources