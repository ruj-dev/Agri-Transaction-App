import React, { useEffect, useState } from 'react'

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Add_sources from '../../Components/Add_Sources';
import './IncomeHead.css'

function IncomeHead() {

    const [renderAddIncomeDialog, setRenderAddIncomeDialog] = useState(false);
    const [sources, setSources] = useState(null);
    const openAddIncomeDialog = () => {
        setRenderAddIncomeDialog(true);
    }
    const closeAddIncomeDia = () => {

        fetchIncomeSource();
        setRenderAddIncomeDialog(false)

    }


    const fetchIncomeSource = async () => {
        try {
            const response = await fetch('http://localhost:8082/getsources');
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            const data = await response.json();
            setSources(data);
            
        } catch (error) {
            console.error('Error fetching groups:', error.message);
            toast.error('Failed to fetch groups.');
        }

    }
    const rerender = () => {
        fetchIncomeSource();
    }
    useEffect(() => {
        fetchIncomeSource();

    }, [])
    return (<>
        <div style={{ marginTop: 20 }}>

            <Fab variant="extended" color="primary" onClick={openAddIncomeDialog} sx={{ marginTop: 5 }}>
                <AddIcon sx={{ mr: 1 }} />
                Add Income Head
            </Fab>
            <Add_sources open={renderAddIncomeDialog} handleClose={closeAddIncomeDia} />


        </div>
        <div className='tiles-container'>
            {sources?.incomeSources?.map((ele) => (<div className='tiles'>{ele}</div>))}
        </div>

    </>

    )
}

export default IncomeHead