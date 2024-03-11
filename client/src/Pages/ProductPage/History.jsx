import React from 'react'
import { useEffect } from 'react'
import './History.css'
import { motion } from "framer-motion";
function History({ Phistory }) {
    useEffect(() => {
        console.log("historypage", Phistory.history[0].quantity);
    }, [])
    return (
        <div className='history-container'>
            <table className='historyTable'>
                <tbody>
                <tr className='rowHeading row'>
                                <td>Entry Id</td>
                                <td>Quantity</td>
                                <td>Movement type</td>
                                <td>Date</td>

                            </tr>
                    {Phistory.history.map((item,i) => (
                        <>
                           <motion.tr
                             className="row"
                                initial={{ opacity: 0, y: -50 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4*i }}
                                        >

                           
                                <td id='td-id' className='td-id'>{item.entry_id}</td>
                                <td className='quantity'>{item.quantity}</td>

                                <td className='movement'>{item.movement_type.toUpperCase()}</td>
                                <td className='date'>{new Date( item.entrydate).toDateString()}</td>

                                </motion.tr>



                        </>

                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default History