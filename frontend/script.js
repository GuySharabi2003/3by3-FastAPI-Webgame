

const startBtn = document.getElementById('startBtn');
const responseText = document.getElementById('responseText');
const playerNameInput = document.getElementById('playernameInput');


const BACKEND_URL = "http://127.0.0.1:8000";


// Click event listener for start button
startBtn.addEventListener('click', async () => {
    try {
        const playerName = (playerNameInput.value).trim();
        if (!playerName) { // Check if player name is empty
            responseText.innerText = "Please enter a player name.";
            return;
        }
        
        const response = await fetch(`${BACKEND_URL}/start_game/${encodeURIComponent(playerName)}`, {
            method: "POST"
        });
        const data = await response.json();
        

        responseText.innerText = data.message;
    } catch (error) {
        responseText.innerText = "Error connecting to backend.";
        console.error(error);
    }
});