
const lobbyCreationScreen = document.getElementById('lobbyCreationScreen');
const lobbyScreen = document.getElementById('lobbyScreen');
const startBtn = document.getElementById('startBtn');
const responseText = document.getElementById('responseText');
const playerNameInput = document.getElementById('playerNameInput');
const playerList = document.getElementById('playerList');
const categorySelect = document.getElementById('categorySelect');
const otherCategoryInputBox = document.getElementById('otherCategoryInputBox');
const joinGameBtn = document.getElementById('joinGameBtn');
const newPlayerNameInput = document.getElementById('newPlayerNameInput');
const lobbyJoinScreen = document.getElementById('lobbyJoinScreen');
const joinResponseText = document.getElementById('joinResponseText');
const copyInviteBtn = document.getElementById('copyInviteBtn');
const startGameBtn = document.getElementById('startGameBtn');
const CategorySelectLabel = document.getElementById('categorySelectLabel');


const isHost = false;

const BACKEND_URL = "http://127.0.0.1:8000";


// Click event listener for start button
startBtn.addEventListener('click', async () => {
    try {
        // Check if player name is empty
        const playerName = (playerNameInput.value).trim();
        if (!playerName) { 
            responseText.innerText = "Please enter a player name.";
            return;
        }

        localStorage.setItem("isHost", true); // set user as lobby host

        
        // Post request to backend to create lobby and gamehub
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

        // New Player joining existing lobby
        if (currentURL.startsWith("/join_lobby/")) {
           initializeLobbyJoinScreen();
           return;
        }

        if (!currentURL.startsWith("/lobby/")) {
            return;
        }

        const lobby_id = currentURL.split("/").pop();

        //Switch to lobby screen upon successful lobby creation
        lobbyCreationScreen.classList.add('inactive');
        lobbyScreen.classList.remove('inactive');
        console.log("Lobby initialized successfully. Current URL:", currentURL);

        if (localStorage.getItem("isHost") === "false") { // disable start button and category selection for non-host
            startGameBtn.classList.add('inactive');
            categorySelect.classList.add('inactive');
            CategorySelectLabel.classList.add('inactive');
        }


        
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

function initializeLobbyJoinScreen() {
        
    lobbyCreationScreen.classList.add('inactive');
    lobbyJoinScreen.classList.remove('inactive');

}

joinGameBtn.addEventListener('click', async () => {

    const playerName = (newPlayerNameInput.value).trim();
    if (!playerName) { 
        joinResponseText.innerText = "Please enter a player name.";
        return;
    }

    localStorage.setItem("isHost", false); // set user as non-host player

    const currentURL = window.location.pathname;
    const lobby_id = currentURL.split("/").pop();
    const response = await fetch(`${BACKEND_URL}/add_player/${encodeURIComponent(lobby_id)}/${encodeURIComponent(playerName)}`, {
        method: "POST"
    });
    const data = await response.json();
    window.location.href = data.lobbyURL;

});



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


copyInviteBtn.addEventListener('click', () => { // Copy lobby invite link to clipboard
    const currentURL = window.location.pathname;
    const lobby_id = currentURL.split("/").pop();

    navigator.clipboard.writeText(BACKEND_URL + "/join_lobby/" + lobby_id);
});



initializeLobby();