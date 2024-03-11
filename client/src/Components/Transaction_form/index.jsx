import React, { useEffect, useState } from 'react';
import './style.css';
import { FormControl, FormLabel, TextField, Button, Select, MenuItem } from '@mui/material';
import { addTransaction } from '../../Services/addtransaction';
import { toast } from 'react-toastify';
function Transaction_form({ onClose }) {
  const [sourceType, setSourceType] = useState(null);
  const [sources, setSources] = useState([]);
  const [transactionName, setTransactionName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState(null);
  const[source,setSource]=useState(null);


  useEffect(() => {
    fetchSources();
    return () => {
      setSourceType(null);
      setSources(null);
      setTransactionName(null);
      setAmount(null);
      setDate(null);
      setDescription(null);
      setSource(null);
    }
  }, []);

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

  const handleTransactionTypeChange = (event) => {
    setSourceType(event.target.value);
  };

  const handleSubmit = () => {

    console.log(sourceType, date, transactionName, description, amount);
    if (sourceType && date && transactionName && description && amount) {

      const transaction = {
        transaction_name: transactionName,
        description: description,
        type: sourceType,
        source:source,
        amount: amount,
        date: date

      }

      addTransaction(transaction);
      toast.success("Added successfully!");
      onClose();
    }
    else {
      toast.error("Add all fields!");



    }
  };

  return (
    <div className='form-card'>
      <FormControl>
        <FormLabel>Transaction detail</FormLabel>
        <Select
          fullWidth
          margin='dense'
          label='Transaction Type'
          value={sourceType}
          onChange={handleTransactionTypeChange}
        >
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
        <TextField
          fullWidth
          margin='dense'
          label='Transaction Name'
          value={transactionName}
          onChange={(event) => setTransactionName(event.target.value)}
        />
        <TextField
          fullWidth
          margin='dense'
          label='Transaction description'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Select
          fullWidth
          margin='dense'
          label='Source'
          value={source}
          onChange={(event)=>setSource(event.target.value)}
        >
          {sourceType === "Income" && sources?.incomeSources ? (
            sources.incomeSources.map((source, index) => (
              <MenuItem key={index} value={source}>{source}</MenuItem>
            ))
          ) : sourceType === "Expense" && sources?.expenseSources ? (
            sources.expenseSources.map((source, index) => (
              <MenuItem key={index} value={source}>{source}</MenuItem>
            ))
          ) : (
            <MenuItem value="">No sources available</MenuItem>
          )}
        </Select>

        <TextField
          type="number"
          fullWidth
          margin='dense'
          label='Amount'
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <Button
          id='form-button'
          className='form-button'
          fullWidth
          margin='dense'
          label='Source type'
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          id='form-button-cancel'
          className='form-button'
          fullWidth
          margin='dense'
          label='Source type'
          onClick={onClose}
        >
          Cancel
        </Button>
      </FormControl>
    </div>
  );
}

export default Transaction_form;
