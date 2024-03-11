import React, { useEffect, useState } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';
import { addTransaction } from '../../Services/addtransaction';
import './style.css'
import { updateTransaction } from '../../Services/updateTransaction';
import { toast } from 'react-toastify';
function UpdateDialog({ open, handleClose, id, transactionset,rerender }) {
  const [superState,setSuperState]=useState({
    name: '',
    description: '',
    type: '',
    amount:0,
    date: ''
  });
  const [sourceType, setSourceType] = useState(null);
  const [sources, setSources] = useState();
  const [transactionName, setTransactionName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState(null);
  const handleTransactionTypeChange = (event) => {
    setSourceType(event.target.value);
  }
  const fetchSources = () => {
    fetch('http://localhost:8082/getsources')
      .then(response => response.json())
      .then(data => {
        setSources(data);
      })
      .catch(error => {
        console.error('Error fetching sources:', error);
      });
  };
  const handleSubmit = async() => {

    console.log(sourceType, date, transactionName, description, amount);
    if (sourceType && date && transactionName && description && amount) {

      const transaction = {
        name: transactionName,
        description: description,
        type: sourceType,
        amount: amount,
        date: date

      }

      const res = await updateTransaction(id,transaction);
      console.log("response from update service",res);
      toast.success("Added successfully!");
      setSuperState({...superState,name:"rushabh"});
      setSuperState({...superState,age:5});
      setSuperState({...superState,date:"12"});
      setSuperState({...superState,name:"joshi"});
      console.log("superstate",superState);
      rerender();
      handleClose();

    }
    else {
      toast.error("Add all fields!");



    }
  };
  const getTransactions2 = async () => {
    const transaction = transactionset.find(transaction => transaction.id === id);
    if (transaction) {
      console.log(transaction);
      setSourceType(transaction.type);
      setTransactionName(transaction.name);
      setDescription(transaction.description);
      setAmount(transaction.amount);

      const setDatest = () => {
        const formattedDate = new Date(transaction.date).toISOString().split('T')[0];
        setDate(formattedDate);
      };
      setDatest();
    }
  }


  useEffect(() => {
    if (open) {

      getTransactions2(id);
      console.log('Date:', date, "alll the transactions", transactionset,"id of the dialog",id);


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
              id="transactionType"
              value={sourceType}
              onChange={handleTransactionTypeChange}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <label htmlFor="transactionName">Transaction Name:</label>
            <input
              type="text"
              id="transactionName"
              value={transactionName}
              onChange={(event) => setTransactionName(event.target.value)}
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(event) =>setDescription(event.target.value)}
            />
            <label htmlFor="source">Source:</label>
            <select id="source">
              {sourceType === "Income" && sources?.incomeSources && sources.incomeSources.map((source, index) => (
                <option key={index} value={source}>{source}</option>
              ))}
              {sourceType === "Expense" && sources?.expenseSources && sources.expenseSources.map((source, index) => (
                <option key={index} value={source}>{source}</option>
              ))}
              {!sources && <option value="">Loading...</option>}
              {(!sources?.incomeSources || !sources?.expenseSources) && <option value="">No sources available</option>}
            </select>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
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

export default UpdateDialog