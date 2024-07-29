'use client';

async function deleteData(idfaculty) {
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idfaculty })
    };

    try {
        const response = await fetch(`http://localhost:3000/api/faculty`, deleteOptions);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to delete faculty:", errorData.error);
            return; // Exit if the response is not OK
        }

        // If successful, update the state accordingly
        const data = await response.json();
        return data; // Return the response data if needed
    } catch (error) {
        console.error("Error deleting faculty:", error);
    }
}

export default deleteData;
