export async function stockin(product)  {
    console.log(JSON.stringify(product));
    try{
        const response = await fetch('http://localhost:8082/stockin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
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