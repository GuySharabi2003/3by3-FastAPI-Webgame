

const pingBtn = document.getElementById('pingBtn');
const responseText = document.getElementById('responseText');


const BACKEND_URL = "http://127.0.0.1:8000";


// Click event listener
pingBtn.addEventListener('click', async () => {
    responseText.innerText = "Loading...";
    try {
        
        const response = await fetch(`${BACKEND_URL}/`);
        const data = await response.json();
        

        responseText.innerText = data.message;
    } catch (error) {
        responseText.innerText = "Error connecting to backend.";
        console.error(error);
    }
});