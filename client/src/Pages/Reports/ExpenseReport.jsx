import React, { useEffect, useState } from 'react'
import './Reports.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


function ExpenseReport() {
    const [incomedata,setIncomedata]=useState(null);
    const [label,setLabel]=useState(null);
    const [amt,setAmt]=useState(null);
    const fetchdata=async()=>{
        try {
            const response = await fetch('http://localhost:8082/expenseReport');
            if (!response.ok) {
              throw new Error('Failed to fetch groups');
            }
            const incomeapidata = await response.json();
            console.log("incomedata",incomeapidata);
            const newsourceArray= incomeapidata.map(element => element.source);
            console.log(newsourceArray);
            setLabel(newsourceArray);
            const newamtArray= incomeapidata.map(element => element.total_amount);
            console.log(newamtArray);
            setAmt(newamtArray);
            setIncomedata(incomeapidata);
          
          } catch (error) {
            console.error('Error fetching groups:', error.message);
            toast.error('Failed to fetch groups.');
          }
    }
   
    const data ={
        labels:label,
        datasets:[{
            labels:'Sales',
            data:amt,
            bordorColor:'black',
            backgroundColor:['red','purple','aqua','green','grey']
        }]
    };

    const options={};
    useEffect(() => {
        fetchdata();
        console.log(incomedata?.array.forEach(element => {
            
        }));
      }, []);
    
  return (
    <div className='reports-container'>
<Bar options={options} data={data} />;

    </div>
  )
}

export default ExpenseReport