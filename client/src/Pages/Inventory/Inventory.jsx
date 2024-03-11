import React, { useState } from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StockInForm from './StockInForm';
import StockOutForm from './StockOutForm';
import AddProduct from './AddProduct';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Inventory.css'
import Search from './Search';
import { motion } from "framer-motion";
function Inventory() {
    const [stockInForm, setStockInForm] = useState(false);
    const [stockOutForm, setStockOutForm] = useState(false);
    const [addProductForm, setAddProductForm] = useState(false);
    const [stockDetail, setStockDetail] = useState(null);
    const [search, setSearch] = useState('');
    const [fils,setfils]=useState();
    const fetchStocks = async () => {
        try {
            const response = await fetch('http://localhost:8082/getstockdetail');
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            const data = await response.json();
            setStockDetail(data);
        } catch (error) {
            console.error('Error fetching groups:', error.message);
            toast.error('Failed to fetch groups.');
        }
    };
    const handleStockIn = () => {
        setStockInForm(true);
    }

    const handleaddproduct = () => {
        setAddProductForm(true);
    }
    const handleStockOut = () => {
        console.log("Stockout");
        setStockOutForm(true);


    }
    const closeDialog = () => {
        setStockInForm(false);
        setAddProductForm(false);
        setStockOutForm(false);

    }
    const rerender = () => {
        console.log("rerendered");
        fetchStocks();
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log('handle',
        "Orrange".toLowerCase().includes(e.target.value.trim().toLowerCase()));
console.log( stockDetail?.map((stock)=>{
    return stock.product_name

}));

const fils=stockDetail.filter((stock)=>stock.product_name.toLowerCase().includes(e.target.value.trim().toLowerCase()))
console.log('fils',fils);
setfils(fils);


    }
    
    const filteredstock = stockDetail?.filter((stock) =>{
    stock.product_name.toLowerCase().includes(search?.trim().toLowerCase())
    }
    )
    useEffect(() => {
        fetchStocks();
    }, []);
    return (
        <div >
            <Search search={search} handleChange={handleSearch}  ></Search>
            <div>
            
                <Fab variant="extended" color="primary" onClick={handleaddproduct} sx={{ marginTop: 5 }}>
                    <AddIcon sx={{ mr: 1 }} />
                    Add Product
                </Fab>
            </div>
            <div>
                <motion.div className="inventory-container"

                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {search?fils.map((stock) =>(
                        <Link to={`/product/${stock?.product_id}`}>
                            <div className=
                                {stock.quantity > 0 ? "inventory-card" :
                                    "inventory-card red-card"}
                                key={stock.product_id} >

                                <h3>{stock.product_name.toUpperCase()}</h3>

                                {stock.quantity > 0 ?
                                    (<p className='green'>Quantity: {stock.quantity}</p>) : (
                                        <p className='red'>Quantity: {stock.quantity}</p>
                                    )}

                            </div>
                        </Link>
                    )):stockDetail?.map((stock) =>(
                        <Link to={`/product/${stock?.product_id}`}>
                            <div className=
                                {stock.quantity > 0 ? "inventory-card" :
                                    "inventory-card red-card"}
                                key={stock.product_id} >

                                <h3>{stock.product_name.toUpperCase()}</h3>

                                {stock.quantity > 0 ?
                                    (<p className='green'>Quantity: {stock.quantity}</p>) : (
                                        <p className='red'>Quantity: {stock.quantity}</p>
                                    )}

                            </div>
                        </Link>
                    ))}

                </motion.div>


            </div>
            <div className='fab-container'>
                <Fab className='stock-in-btn' variant="extended" onClick={handleStockIn} sx={{ marginTop: 5 }} style={{ backgroundColor: 'rgb(151, 244, 101)' }}>
                    <AddIcon sx={{ mr: 1 }} />
                    Stock In
                </Fab>
                <Fab className='stock-out-btn' variant="extended" onClick={handleStockOut} sx={{ marginTop: 5 }} style={{ backgroundColor: 'rgb(255, 85, 85)', marginLeft: '20px' }}>
                    <RemoveIcon sx={{ mr: 1 }} />

                    Stock out
                </Fab>
            </div>
            <div >
                <StockInForm open={stockInForm} handleClose={closeDialog} rerender={rerender} />
                <AddProduct open={addProductForm} handleClose={closeDialog} rerender={rerender} />
                <StockOutForm open={stockOutForm} handleClose={closeDialog} rerender={rerender} stocklist={stockDetail} />
            </div>
        </div>
    )
}

export default Inventory