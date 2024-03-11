import React, { useEffect, useState } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';
import { addTransaction } from '../../Services/addtransaction';
import { updateTransaction } from '../../Services/updateTransaction';
import { toast } from 'react-toastify';
import { stockin } from '../../Services/stockin';
import { stockout } from '../../Services/stockout';

function StockInForm({ open, handleClose, rerender }) {
  const getCurrentDateTime = () => {
   
      const now = new Date();
      const year = now.getFullYear();
      const month = `${now.getMonth() + 1}`.padStart(2, '0'); // Add leading zero if needed
      const day = `${now.getDate()}`.padStart(2, '0'); // Add leading zero if needed
      const hours = `${now.getHours()}`.padStart(2, '0'); // Add leading zero if needed
      const minutes = `${now.getMinutes()}`.padStart(2, '0'); // Add leading zero if needed
    console.log(`${year}-${month}-${day}T${hours}:${minutes}`);
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    
    
  };

  const [superState, setSuperState] = useState({
    product_id: 1,
    quantity: 0,
    datetime: getCurrentDateTime() // Initialize with current date and time
  });

  const handleAllInputChange = (event) => {
    const { name, value } = event.target;
    console.log("...input type", name, ':', value);
    setSuperState({ ...superState, [name]: value });
    console.log("superstate", superState);
  };

  const [productinfo, setProductinfo] = useState(null);

  const fetchProductinfo = () => {
    fetch('http://localhost:8082/getproductsinfo')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProductinfo(data);
      })
      .catch(error => {
        console.error('Error fetching sources:', error);
      });
  };

  const handleSubmit = async () => {
    if (superState.datetime && superState.product_id && superState.quantity) {
      const product = superState;
      stockin(product);
      rerender();
      handleClose();
    } else {
      console.log("superstate", superState, superState.description);
      toast.error("Add all fields!");
    }
  };

  useEffect(() => {
    if (open) {
      fetchProductinfo();
    }
  }, [open]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Stock In </DialogTitle>
        <DialogContent>
          <div className="update-dialog">
            <label htmlFor="source">Name:</label>
            <select
              id="source"
              name="product_id"
              onChange={handleAllInputChange}
            >
              {productinfo && productinfo.map((product) => (
                <option key={product.product_id} value={product.product_id}>{product?.product_name}</option>
              ))}
              {!productinfo && <option value="">Loading...</option>}
            </select>
            <label htmlFor="amount">Amount:</label>
            <input
              name="quantity"
              type="number"
              id="amount"
              value={superState.quantity}
              onChange={handleAllInputChange}
            />
            <label htmlFor="datetime">Date and Time:</label>
            <input
              name="datetime"
              type="datetime-local"
              id="datetime"
              value={superState.datetime}
              onChange={handleAllInputChange}
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ marginLeft: "10px" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Stock In</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StockInForm;
