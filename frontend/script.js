
const LobbyCreationScreen = document.getElementById('LobbyCreationScreen');
const LobbyScreen = document.getElementById('LobbyScreen');
const startBtn = document.getElementById('startBtn');
const responseText = document.getElementById('responseText');
const playerNameInput = document.getElementById('playernameInput');
const playerList = document.getElementById('playerList');
const categorySelect = document.getElementById('categorySelect');
const otherCategoryInputBox = document.getElementById('otherCategoryInputBox');

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
        window.location.href = data.lobbyURL;

    } catch (error) {
        responseText.innerText = "Error connecting to backend.";
        console.error(error);
    }
});


async function initializeLobby() {

        const currentURL = window.location.pathname;

        if (!currentURL.startsWith("/lobby/")) {
            console.error("Not in a private lobby. Current URL:", currentURL);
            return;
        }

       
        const lobby_id = currentURL.split("/").pop();

        //Switch to lobby screen upon successful lobby creation
        LobbyCreationScreen.classList.add('inactive');
        LobbyScreen.classList.remove('inactive');
        console.log("Lobby initialized successfully. Current URL:", currentURL);

        
        const playersResponse = await fetch(`${BACKEND_URL}/getPlayers/${encodeURIComponent(lobby_id)}`, {
            method: "GET"
        });
        const playersData = await playersResponse.json();
        const players = playersData.players;

        for (const player of players) {
            const playerNameElement = document.createElement('li');
            playerNameElement.innerText = player;
            playerList.appendChild(playerNameElement);
        }
}


// Event listener for category selection
categorySelect.addEventListener('change', () => {

    if (categorySelect.value === "Other") {
        otherCategoryInputBox.classList.remove('inactive');
        otherCategoryInputBox.classList.add('vbox');}
    else {
        otherCategoryInputBox.classList.remove('vbox');
        otherCategoryInputBox.classList.add('inactive');
    }
});


initializeLobby();