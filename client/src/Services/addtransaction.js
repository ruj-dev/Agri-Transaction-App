export async function addTransaction(transaction)  {
    console.log(JSON.stringify(transaction));
    try{
        const response = await fetch('http://localhost:8082/addtransactions', {
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