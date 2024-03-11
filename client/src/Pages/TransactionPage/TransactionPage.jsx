import React, { useEffect, useState } from 'react';
import './TransactionPage.css';
import UpdateDialogCopy from '../../Components/UpdateDialog - Copy';
import { toast } from 'react-toastify';
import Confirmation from './Confirmation';
import { motion } from "framer-motion";
import Search from '../Inventory/Search';
function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [renderDialog, setRenderDialog] = useState(false);
  const [dialogId, setDialogId] = useState(null);
  const [renderConfirmation,setrenderConfirmation]=useState(false);
  const [isConfirm,setisConfirm]=useState(false);
  const [search,setSearch]=useState('');
  const[id,setId]=useState();
  const [fils,setFils]=useState();
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8082/getalltransactions');
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
      toast.error('Failed to fetch groups.');
    }
  };
  const rerender = () => {
    fetchTransactions();
  }
  //combined  both delete and update function
  const handleDelandUpdate = async (id, targetid) => {
    if (targetid == 'delete-btn') {
      setId(id);
      setrenderConfirmation(true);
      if(isConfirm){
        console.log(`Delete transaction with ID: ${id, targetid}`);
        const response = await fetch(`http://localhost:8082/transactions/:${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        });
        rerender();
      }
     
    }
    else {
      setDialogId(id);
      console.log(`Update transaction with ID: ${id}`);
      setRenderDialog(true);

    }
  };
const confirmationClose=()=>{
  console.log("close intilized");
  setrenderConfirmation(false);
  rerender();
}

  const onDialogClose = () => {
    console.log('close initilized');
    setRenderDialog(false);
  }
  const handleSearch=(e)=>{
    setSearch(e.target.value);
const filss=transactions.filter((transaction)=>
transaction.name.toLowerCase().includes(e.target.value.toLowerCase())||
transaction.description.toLowerCase().includes(e.target.value.toLowerCase())

)
setFils(filss); 
  }

  return (
    <div>
      <Search search={search} handleChange={handleSearch} />
    <div className="transactions-container">
      {search?fils.map((transaction) => (
        <motion.div  className=
        {transaction.type=="Income"?"transaction-card":
        "transaction-card red-card"}
         key={transaction.id}
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.3 }}
         >
          <h3>{transaction.name.toUpperCase()}</h3>

          {transaction.type == 'Income' ? (<p className='green'>{transaction.type}</p>) : (
            <p className='red'>{transaction.type}</p>
          )}
          <p>{transaction.description}</p>
          {transaction.type == 'Income' ? (<p className='green'>Amount: ₹{transaction.amount}</p>) : (
            <p className='red'>Amount: ₹{transaction.amount}</p>
          )}

          <div className="button-container">
            <button id='delete-btn' onClick={(event) => handleDelandUpdate(transaction.id, event.target.id)}>Delete</button>
            <button id='update-btn' onClick={(event) => handleDelandUpdate(transaction.id, event.target.id)}>Update</button>
          </div>

        </motion.div>
      )): transactions.map((transaction) => (
        <motion.div  className=
        {transaction.type=="Income"?"transaction-card":
        "transaction-card red-card"}
         key={transaction.id}
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.3 }}
         >
          <h3>{transaction.name.toUpperCase()}</h3>

          {transaction.type == 'Income' ? (<p className='green'>{transaction.type}</p>) : (
            <p className='red'>{transaction.type}</p>
          )}
          <p>{transaction.description}</p>
          {transaction.type == 'Income' ? (<p className='green'>Amount: ₹{transaction.amount}</p>) : (
            <p className='red'>Amount: ₹{transaction.amount}</p>
          )}

          <div className="button-container">
            <button id='delete-btn' onClick={(event) => handleDelandUpdate(transaction.id, event.target.id)}>Delete</button>
            <button id='update-btn' onClick={(event) => handleDelandUpdate(transaction.id, event.target.id)}>Update</button>
          </div>

        </motion.div>
      ))}
      <UpdateDialogCopy open={renderDialog} handleClose={onDialogClose} id={dialogId} transactionset={transactions} rerender={rerender} />
   <Confirmation open={renderConfirmation} handleClose={confirmationClose}
    id={id}/>
    </div>
    </div>
  );
}

export default TransactionsPage;
