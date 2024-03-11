import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import History from './History';
import './ProductPage.css'
function ProductPage() {
    const {id}=useParams();
    const [productHistory,setProductHistory]=useState();
    const fetchProductHistory=async()=>{
        try {
            const response = await fetch(`http://localhost:8082/getproducthistory/:${id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch groups');
            }
            const data = await response.json();
            console.log("inside job",data.history[0].entry_id);
            setProductHistory(data);
            console.log(data.info[0].product_id);
          } catch (error) {
            console.error('Error fetching groups:', error.message);
            toast.error('Failed to fetch groups.');
          }

    }
    useEffect(()=>{
        fetchProductHistory(id);
        console.log('datatata',productHistory);
    },[])
  return (

    <div>

       <div className='product-div'>
      {productHistory &&
       <div className='name-container'>  
       <h1> {productHistory.info[0].product_name.toUpperCase()}</h1>
       </div> 
       }
      {productHistory && 
      <div className='quantity-container'>
        <h2>Quantity</h2>
         <h3> {productHistory.info[0].quantity}</h3>
      </div> }


      </div>
        
   
   {productHistory && <History Phistory={productHistory}/>} 

    </div>
  )
}

export default ProductPage