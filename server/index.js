var mySql = require("mysql2");
var connection = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "agri_expense"
});
connection.connect(function (error) {
    if (error) throw error;
    console.log("connect");
    connection.query("SELECT * FROM agri_expense.income_sources", function (error, result) {
        if (error) throw error;
        console.log(result);
    })

})
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.listen(8082, () => {
    console.log("listening");
})
app.post("/addIncomeSource", (req, res) => {
    console.log('serverlog', req.body);
    const query = "insert into agri_expense.income_sources(source_name) values(?)";
    const values = req.body.source_name;
    connection.query(query, values, (error, data) => {
        if (error)
            return res.json(error);
        else res.json("post success");
    })
})
app.post("/addExpenseSource", (req, res) => {
    console.log('serverlog', req.body);
    const query = "insert into agri_expense.expense_sources(source_name) values(?)";
    const values = req.body.source_name;
    connection.query(query, values, (error, data) => {
        if (error)
            return res.json(error);
        else res.json("post success");
    })
})

app.post('/addtransactions', (req, res) => {
    const { transaction_name, description, type, source, amount, date } = req.body;
    console.log('body1', req.body);
    const sql = 'INSERT INTO Transactions (name, description, type,source, amount, date) VALUES (?, ?, ?, ?, ?,?)';
    const values = [transaction_name, description, type, source, amount, date];
    console.log('values', values);
    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error inserting transaction:', error);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Transaction added successfully' });
        }
    });
});
app.get('/getalltransactions', (req, res) => {
    const sql = 'SELECT * FROM Transactions'
    connection.query(sql, (error, transactions) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.json(transactions);
    })
})
app.get('/gettransaction/:id', (req, res) => {
    const id = req.params.id.slice(1);
    console.log(id);
    const sql = 'SELECT * FROM transactions WHERE id=?';
    connection.query(sql, [id], (error, transactions) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (transactions.length > 0) {
                res.status(200).json(transactions[0]);
            } else {
                res.status(400).json({ message: 'Transaction not found' });
            }
        }
    });
});


app.get('/incomeReport', (req, res) => {
    const sql = 'SELECT source, SUM(amount) AS total_amount FROM Transactions WHERE type = "income" GROUP BY source';
    connection.query(sql, (error, report) => {
        if (error) {
            console.error('Error generating income report:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(report);
        }
    });
});

app.get('/expenseReport', (req, res) => {
    const sql = 'SELECT source, SUM(amount) AS total_amount FROM Transactions WHERE type = "expense" GROUP BY source'; // Fetching expense transactions grouped by source
    connection.query(sql, (error, report) => {
        if (error) {
            console.error('Error generating expense report:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(report);
        }
    });
});


app.post('/transactions/:id', (req, res) => {
    const Id = req.params.id.slice(1);
    console.log(Id);
    const { name, description, type, amount, date } = req.body;
    const sql = 'UPDATE Transactions SET name = ?, description = ?, type = ?, amount = ?, date = ? WHERE id = ?';
    const values = [name, description, type, amount, date, Id];
    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error updating transaction:', error);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (results.affectedRows > 0) {
                res.status(200).json({ message: 'Transaction updated successfully' });
            } else {
                res.status(404).json({ message: 'Transaction not found' });
            }
        }
    });
});
app.post('/products', (req, res) => {

    console.log(req.body);
    const { product_name } = req.body.slice(1);
    const sql = 'insert into products_list(product_name) values(?)';
    const values = [product_name];
    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error adding stock:', error);
            res.status(500).json({ message: 'Internal server error' });
        } else {

            res.status(200).json({ message: 'stock addition successfully' });

        }
    });
});
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products_list WHERE product_id = ?';

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting product: ', err);
            res.status(500).json({ error: 'Error deleting product' });
            return;
        }
        console.log('Product deleted successfully');
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});
app.post('/addproducts', (req, res) => {

    console.log(req.body);
    const { product_name } = req.body;
    const sql = 'INSERT INTO inventory_list (product_name, quantity) VALUES (?, ?)';

    const values = [product_name, 0];
    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error adding stock:', error);
            res.status(500).json({ message: 'Internal server error' });
        } else {

            res.status(200).json({ message: 'stock addition successfully' });

        }
    });
});

//stockin and stock out


app.post('/stockin', (req, res) => {
    const { product_id, product_name, quantity, datetime} = req.body;
console.log("stockin",);
    const sqlUpdateQuantity = 'UPDATE inventory_list SET quantity = quantity + ? WHERE product_id = ?';

    const historySql = 'INSERT INTO inventory_history (product_id, quantity, movement_type, entrydate) VALUES (?, ?, ?, ?)'
    console.log("stockin", product_id, product_name, quantity, datetime);
    connection.query(sqlUpdateQuantity, [quantity, product_id], (err, result) => {
        if (err) {
            console.error('Error adding stock in entry: ', err);
            connection.rollback(() => {
                res.status(500).json({ error: 'Error adding stock in entry' });
            });
            return;
        }

        connection.query(historySql, [product_id, quantity, 'in', datetime], (err, result) => {
            if (err) {
                console.error('Error adding stock in entry to history: ', err);
                connection.rollback(() => {
                    res.status(500).json({ error: 'Error adding stock in entry to history' });
                });
                return;
            }


        });
    });
}

)


app.post('/stockout', (req, res) => {
    {
        const { product_id, product_name, quantity, date } = req.body;


        const sqlUpdateQuantity = 'UPDATE inventory_list SET quantity = quantity - ? WHERE product_id = ?';

        const historySql = 'INSERT INTO inventory_history (product_id, quantity, movement_type, entrydate) VALUES (?, ?, ?, ?)'
        console.log("stockout", product_id, product_name, quantity, date);
        connection.query(sqlUpdateQuantity, [quantity, product_id], (err, result) => {
            if (err) {
                console.error('Error adding stock in entry: ', err);
                connection.rollback(() => {
                    res.status(500).json({ error: 'Error adding stock in entry' });
                });
                return;
            }

            connection.query(historySql, [product_id, -quantity, 'out', date], (err, result) => {
                if (err) {
                    console.error('Error adding stock ou entry to history: ', err);
                    connection.rollback(() => {
                        res.status(500).json({ error: 'Error adding stock out entry to history' });
                    });
                    return;
                }


            });
        });
    }


});
app.get('/getproductsinfo', (req, res) => {
    const sql = 'SELECT product_id,product_name FROM inventory_list';
    connection.query(sql, (error, report) => {
        if (error) {
            console.error('Error generating income report:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(report);
        }
    });
});
app.get('/getproducthistory/:id', (req, res) => {
    const id=req.params.id.slice(1);
    console.log(id);
    let info={};
    let history=[];
    const productinfo = 'SELECT product_id,product_name,quantity FROM inventory_list where product_id=?';
    const producthistory='select entry_id,quantity,movement_type,entrydate from inventory_history where product_id=?';
    connection.query(productinfo,[id], (error, report) => {
        if (error) {
            console.error('Error generating producthistory from  inventory list:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log("info",report);
            info=report;
            connection.query(producthistory,[id], (error, report) => {
                if (error) {
                    console.error('Error generating producthistory from  inventory list:', error);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    console.log(report);
                    history=report;
                    const result={info,
                        history
                    }
                    res.json(result);
                }
            });
        }
    });
   



    
});
app.get('/getstockdetail', (req, res) => {
    const sql = 'SELECT product_id,product_name,quantity FROM inventory_list';
    connection.query(sql, (error, report) => {
        if (error) {
            console.error('Error generating income report:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(report);
        }
    });
});


















app.get("/getsources", (req, res) => {
    const sqlIncome = 'SELECT source_name FROM income_sources';
    const sqlExpense = 'SELECT source_name FROM expense_sources';

    let incomeSources = [];
    let expenseSources = [];


    connection.query(sqlIncome, (error, results, fields) => {
        if (error) {
            console.error('Error fetching income sources:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            incomeSources = results.map(row => row.source_name);

            connection.query(sqlExpense, (error, results, fields) => {
                if (error) {
                    console.error('Error fetching expense sources:', error);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    expenseSources = results.map(row => row.source_name);


                    res.status(200).json({ incomeSources, expenseSources });
                }
            });
        }
    });
});



app.delete('/transactions/:id', (req, res) => {

    const transactionId = req.params.id.slice(1);
    const sql = 'DELETE FROM Transactions WHERE id = ?';
    connection.query(sql, [transactionId], (error, results, fields) => {
        if (error) {
            console.error('Error deleting transaction:', error);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (results.affectedRows > 0) {
                res.status(200).json({ message: 'Transaction deleted successfully' });
            } else {
                res.status(404).json({ message: 'Transaction not found' });
            }
        }
    });
});


app.get("/getsources", (req, res) => {

})