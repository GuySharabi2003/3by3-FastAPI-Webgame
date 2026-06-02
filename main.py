from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from GameLogic import gameFunctions
import GameLogic.gameHub as gameHub
import GameLogic.player as player


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

existingLobbyIDs = set()
existingGameHubs = {}


@app.post("/add_player/{player_name}")
def add_player(player_name: str, lobby_id: int):
    new_player = player.Player(player_name)
    existingGameHubs[lobby_id].addPlayer(new_player)

@app.post("/start_game/{player_name}")
def start_game(player_name: str):
   lobbyID = gameFunctions.generateLobbyID()

   while lobbyID in existingLobbyIDs: # Make sure ID is unique
       lobbyID = gameFunctions.generateLobbyID()

   currentGameHub = gameHub.gameHub(players=[player.Player(player_name)], category="", lobbyID=lobbyID)
   existingLobbyIDs.add(lobbyID)
   existingGameHubs[lobbyID] = currentGameHub
   return {"lobbyURL": f"/lobby/{lobbyID}"}

@app.get("/lobby/{lobby_id}")
def get_lobby(lobby_id: int):
    return FileResponse("frontend/index.html")

@app.get("/getPlayers/{lobby_id}")
def get_players(lobby_id: int):
    return {"players": existingGameHubs[lobby_id].getPlayerNames()}

app.mount("/", StaticFiles(directory="frontend", html=True), name="static")