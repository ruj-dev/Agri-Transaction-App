export async function  addExpenseSource(sourceName){
    
    try {
        const body={
            source_name:sourceName
        };
        console.log("services",body);
        const response = await fetch('http://localhost:8082/addExpenseSource',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( body)
    }
        );
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to add group');
          }

        

    } catch (error) {
        
    }

}