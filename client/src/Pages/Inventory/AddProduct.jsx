import React, { useEffect, useState } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { addProduct } from '../../Services/addProduct';
function AddProduct({ open, handleClose, rerender }) {
  const [superState, setSuperState] = useState({
  product_name:""
  });
 

const handleAllInputChange=(event)=>{
  const {name , value}=event.target;
  console.log("...input type",name ,':',value);
  setSuperState({...superState,[name]:event.target.value});
  console.log("superstate",superState);

}  

  const handleSubmit = async () => {


    if ( superState.product_name ) {
      const product = superState;  
      addProduct(product);
     rerender();
      dialogClose();


    }
    else {

      console.log("superstate", superState, superState.description);
      toast.error("Add all fields!");



    }
  };
const dialogClose=()=>{
    setSuperState({...superState,product_name:""});
    handleClose();
}

  useEffect(() => {
    if (open) {
     

    }
  }, [open]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add product </DialogTitle>
        <DialogContent>
          <div className="update-dialog">
          <label htmlFor="name">Product Name</label>
            <input
            name ="product_name"
              type="text"
              id="name"
              value={superState.product_name}
              onChange={handleAllInputChange}
            />
        
        
       
          </div>
        </DialogContent>
        <DialogActions sx={{ marginLeft: "10px" }}>
          <Button onClick={dialogClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddProduct