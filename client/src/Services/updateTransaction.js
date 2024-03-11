export async function updateTransaction(id,transaction)  {
    console.log('update transaction',`http://localhost:8082/transactions/:${id}`,JSON.stringify(transaction));
    try{
        const response = await fetch(`http://localhost:8082/transactions/:${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });

        if (!response.ok) {
            throw new Error('Failed to add expense');
        }

        const data = await response.json();
        return data;

    }catch(error){
        console.log(error);

    }

}