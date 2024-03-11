import React, { useEffect, useState } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';
import { addTransaction } from '../../Services/addtransaction';
import './style.css'
import { updateTransaction } from '../../Services/updateTransaction';
import { toast } from 'react-toastify';
function UpdateDialogCopy({ open, handleClose, id, transactionset, rerender }) {
  const [superState, setSuperState] = useState({
    name: "ok",
    description: '',
    type: '',
    source:'',
    amount: 0,
    date: ''
  });
 

const handleAllInputChange=(event)=>{
  const {name , value}=event.target;
  console.log("...input type",name ,':',value);
  setSuperState({...superState,[name]:event.target.value});
  console.log("superstate",superState);




}  

  const [sources, setSources] = useState();


  const fetchSources = () => {
    fetch('http://localhost:8082/getsources')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSources(() => data);
      })
      .catch(error => {
        console.error('Error fetching sources:', error);
      });
  };
  const handleSubmit = async () => {


    if (superState.type && superState.date && superState.name && superState.description && superState.amount) {

  
      const exporttransaction = superState;

     

      const res = await updateTransaction(id, exporttransaction);
      console.log("response from update service", res);
      toast.success("Added successfully!");

      rerender();
      handleClose();

    }
    else {

      console.log("superstate", superState, superState.description);
      toast.error("Add all fields!");



    }
  };
  const getTransactions2 = () => {
    const transaction = transactionset.find(transaction => transaction.id === id);
    if (transaction) {
      const setDatest = () => {
        const formattedDate = new Date(transaction.date).toISOString().split('T')[0];

        return formattedDate;
      };
     // setSuperState2(()=>({...superState2,type:"sachin"}) )
      const newdate = setDatest();
      console.log("inside setting trans", transaction);
      setSuperState(() => ({
        name: transaction.name,
        description: transaction.description,
        type: transaction.type,
        source:transaction.source,
        amount: transaction.amount,
        date: newdate
      }))
      /* setSourceType(transaction.type);
      setSuperState(() => ({...superState,name:"hellojiii"}));
    setSuperState({...superState,description:transaction.description});
      setSuperState({...superState,amount:transaction.amount}); */
      console.log("inside", superState, transaction.amount);
      //console.log("superstate222", superState2);

    }
  }


  useEffect(() => {
    if (open) {

      getTransactions2(id);
      fetchSources();
      console.log('Date:', "alll the transactions", transactionset, "id of the dialog", id);
      console.log('superset outside', superState);


    }
  }, [id, open]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Transaction </DialogTitle>
        <DialogContent>
          <div className="update-dialog">
            <label htmlFor="transactionType">Transaction Type:</label>
            <select
              name='type'
              id="transactionType"
              value={superState.type}
              onChange={handleAllInputChange}


            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <label htmlFor="transactionName">Transaction Name:</label>
            <input
            name ='name'
              type="text"
              id="transactionName"
              value={superState.name}
              onChange={handleAllInputChange}            />
            <label htmlFor="description">Description:</label>
            <input
            name ="description"
              type="text"
              id="description"
              value={superState.description}
              onChange={(event) => setSuperState({ ...superState, description: event.target.value })}
            />
            <label htmlFor="source">Source:</label>
            <select id="source" name ="source" 
            onChange={handleAllInputChange}
            >
              {superState.type === "Income" && sources?.incomeSources && sources.incomeSources.map((source, index) => (
                <option key={index} value={source}>{source}</option>
              ))}
              {superState.type === "Expense" && sources?.expenseSources && sources.expenseSources.map((source, index) => (
                <option key={index} value={source}>{source}</option>
              ))}
              {!sources && <option value="">Loading...</option>}
              {(!sources?.incomeSources || !sources?.expenseSources) && <option value="">No sources available</option>}
            </select>
            <label htmlFor="amount">Amount:</label>
            <input
            name ="amount"
              type="number"
              id="amount"
              value={superState.amount}
              onChange={handleAllInputChange}
            />
            <label htmlFor="date">Date:</label>
            <input
            name ="date"
              type="date"
              id="date"
              value={superState.date}
              onChange={handleAllInputChange}
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ marginLeft: "10px" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateDialogCopy