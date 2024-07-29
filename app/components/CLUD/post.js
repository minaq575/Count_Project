"use client";

async function postData(endpoint, data) {
    try {
        const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}

export default postData;